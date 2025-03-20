from email.mime import application
from flask import Flask
from pymongo import MongoClient
from flask_restful import Api
from flask_cors import CORS 
from resources.api.consult import ConsultResource
from resources.constants import MONGO_DB_URL
import certifi
ca = certifi.where()

application = Flask(__name__)
CORS(application)
api = Api(application)

mongo_client = MongoClient(MONGO_DB_URL,
                           tlsCAFile=ca,
)
application.config["MONGO_DB"] = mongo_client["delivery_app"]

api.add_resource(ConsultResource, "/consult/")

if __name__ == "__main__":
    application.run(port=5535)#, debug=True)