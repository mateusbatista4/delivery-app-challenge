from pydantic import BaseModel,  confloat
from enum import Enum


class ConsultRequest(BaseModel):
    source_address: str
    destination_address: str
    
class ConsultResponse(BaseModel):
    distance: float
    origin_address: str
    destination_address: str