import datetime
from flask import abort, current_app, jsonify
from flask_restful import Resource, reqparse
from resources.repositories.consult_repository import ConsultRepository
from resources.services.nominatim_service import NominatimService
from resources.services.route_service import RouteService


consult_args = reqparse.RequestParser()
consult_args.add_argument("source_address", type=str, help="Source address is required", required=True)
consult_args.add_argument("destination_address", type=str, help="Destination address is required", required=True)

def get_user_repository():
    db = current_app.config["MONGO_DB"]  
    return ConsultRepository(db)

class ConsultResource(Resource):
    def post(self):   
        nominatim_service = NominatimService()
        route_service = RouteService()        
        consult_repo = get_user_repository()
        
        args = consult_args.parse_args()            
        source_address = args["source_address"]
        destination_address = args["destination_address"]

        source_location = nominatim_service.get_addres_info(source_address)
        if not source_location:
            abort(404, description="source_location not found") 

        destination_location = nominatim_service.get_addres_info(destination_address)
        if not destination_location:
            abort(404, description="destination_location not found") 
            
        distance = route_service.get_distance_between_points(
            source_address=source_location,
            destination_address=destination_location,
        )
        
        created_at = str(datetime.datetime.utcnow())
        
        result = {
            "distance": distance,
            "source": source_location,
            "destination": destination_location,
            "created_at": created_at,
        }
        
        
        consult_repo.save_consult(result)

        return result
    
    def get(self):
        consult_repo = get_user_repository()
        return jsonify(consult_repo.get_all_consults() )

    