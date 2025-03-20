

from resources.models.consult import Consult


class ConsultRepository:
    def __init__(self, db):
        self.collection = db["consult"]

    def save_consult(self, consult):
               
            self.collection.insert_one(consult)
            
            del consult["_id"]
            
    def get_all_consults(self):
        """Retrieve all consult records from MongoDB."""
        # consults = self.collection.find()  # Get all documents
        # return [
        #     {**doc, "id": str(doc.pop("_id"))} for doc in consults
        # ]
        
        documents = list(self.collection.find())  # Fetch documents from MongoDB
        for doc in documents:
            del doc['_id']
            
        return documents
        
        