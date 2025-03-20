


import math


class RouteService:
    def __init__(self):
        self.radius = 6371.0
        pass
    
    
    def get_distance_between_points(self, source_address: dict, destination_address):
        lat1, lon1 = source_address["latitude"], source_address["longitude"]
        lat2, lon2 = destination_address["latitude"], destination_address["longitude"]
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1 
        dlon = lon2 - lon1 
        a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(self.radius * c, 2)