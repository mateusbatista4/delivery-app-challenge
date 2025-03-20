import requests

from resources.constants import NOMINATIM_SERVICE_URL


class NominatimService:
    def __init__(self):
        pass
    
    
    def get_addres_info(self,address: str):
        headers = {
            "User-Agent": "Delivery Service - Mateus"  
        }
        response = requests.get(
            NOMINATIM_SERVICE_URL,
            params={"q": address, "format": "json", "limit": 1},
            headers=headers, 
        )
        
        if response.status_code == 200:
            results = response.json()
            if results:
                return {
                    "latitude": float(results[0]["lat"]),
                    "longitude": float(results[0]["lon"]),
                    "display_name": results[0]["display_name"]
                }
        
        return None    
    
    
if __name__ == "__main__":
    service = NominatimService()
    
    print(service.get_addres_info("Rua Cristiano Viana 455 - São Paulo")) 