from pydantic import BaseModel, ConfigDict
from typing import Optional


class GoalBase(BaseModel):
    daily_step_goal: int = 10000
    daily_calorie_goal: float = 2000
    daily_protein_goal: float = 50
    daily_carbs_goal: float = 250
    daily_fat_goal: float = 70
    sleep_hours_goal: float = 8


class GoalUpdate(BaseModel):
    daily_step_goal: Optional[int] = None
    daily_calorie_goal: Optional[float] = None
    daily_protein_goal: Optional[float] = None
    daily_carbs_goal: Optional[float] = None
    daily_fat_goal: Optional[float] = None
    sleep_hours_goal: Optional[float] = None


class GoalResponse(GoalBase):
    id: int
    user_id: int
    apple_health_connected: bool
    nutrition_api_connected: bool
    
    model_config = ConfigDict(from_attributes=True)


class ConnectionUpdate(BaseModel):
    apple_health_connected: Optional[bool] = None
    nutrition_api_connected: Optional[bool] = None


class ConnectionResponse(BaseModel):
    apple_health_connected: bool
    nutrition_api_connected: bool

