from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any
from app.models.meal import MealType


class MealBase(BaseModel):
    name: str
    meal_type: MealType
    datetime: datetime
    calories: float = 0
    carbs: float = 0
    protein: float = 0
    fat: float = 0


class MealCreate(BaseModel):
    name: str
    meal_type: MealType
    datetime: datetime
    # Either provide food_name for API lookup, or provide manual nutrition data
    food_name: Optional[str] = None
    quantity: Optional[str] = None
    # Or manual nutrition data
    calories: Optional[float] = None
    carbs: Optional[float] = None
    protein: Optional[float] = None
    fat: Optional[float] = None


class MealUpdate(BaseModel):
    name: Optional[str] = None
    meal_type: Optional[MealType] = None
    datetime: Optional[datetime] = None
    calories: Optional[float] = None
    carbs: Optional[float] = None
    protein: Optional[float] = None
    fat: Optional[float] = None


class MealResponse(MealBase):
    id: int
    user_id: int
    raw_nutrition_data: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class DailySummary(BaseModel):
    date: str
    total_calories: float
    total_carbs: float
    total_protein: float
    total_fat: float
    meals: list[MealResponse]

