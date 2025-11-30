from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from app.models.activity import ActivityType


class ActivityBase(BaseModel):
    type: ActivityType
    duration_minutes: float
    distance_km: Optional[float] = None
    calories_burned: Optional[float] = None
    datetime: datetime
    notes: Optional[str] = None


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(BaseModel):
    type: Optional[ActivityType] = None
    duration_minutes: Optional[float] = None
    distance_km: Optional[float] = None
    calories_burned: Optional[float] = None
    datetime: Optional[datetime] = None
    notes: Optional[str] = None


class ActivityResponse(ActivityBase):
    id: int
    user_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

