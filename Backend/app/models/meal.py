from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Enum, JSON
from sqlalchemy.sql import func
import enum
from app.db.base import Base


class MealType(str, enum.Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    SNACK = "snack"


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    meal_type = Column(Enum(MealType), nullable=False)
    datetime = Column(DateTime(timezone=True), nullable=False, index=True)
    calories = Column(Float, default=0)
    carbs = Column(Float, default=0)  # grams
    protein = Column(Float, default=0)  # grams
    fat = Column(Float, default=0)  # grams
    raw_nutrition_data = Column(JSON)  # Store raw API response
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

