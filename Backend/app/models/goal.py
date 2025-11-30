from sqlalchemy import Column, Integer, ForeignKey, Float, Boolean
from sqlalchemy.sql import func
from app.db.base import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    
    # Goals
    daily_step_goal = Column(Integer, default=10000)
    daily_calorie_goal = Column(Float, default=2000)
    daily_protein_goal = Column(Float, default=50)  # grams
    daily_carbs_goal = Column(Float, default=250)  # grams
    daily_fat_goal = Column(Float, default=70)  # grams
    sleep_hours_goal = Column(Float, default=8)
    
    # Connected services (flags)
    apple_health_connected = Column(Boolean, default=False)
    nutrition_api_connected = Column(Boolean, default=True)

