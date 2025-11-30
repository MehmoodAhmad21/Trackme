from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class VitalBase(BaseModel):
    type: str
    value: float
    unit: str
    recorded_at: datetime


class VitalCreate(VitalBase):
    pass


class VitalUpdate(BaseModel):
    value: Optional[float] = None
    unit: Optional[str] = None
    recorded_at: Optional[datetime] = None


class VitalResponse(VitalBase):
    id: int
    user_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

