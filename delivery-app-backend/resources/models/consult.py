from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class Consult(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    source_address: str
    destination_address: str

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}