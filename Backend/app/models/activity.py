from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Enum
from sqlalchemy.sql import func
import enum
from app.db.base import Base


class ActivityType(str, enum.Enum):
    RUN = "run"
    WALK = "walk"
    CYCLE = "cycle"
    GYM = "gym"
    SWIM = "swim"
    YOGA = "yoga"
    OTHER = "other"


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(Enum(ActivityType), nullable=False)
    duration_minutes = Column(Float, nullable=False)
    distance_km = Column(Float)
    calories_burned = Column(Float)
    datetime = Column(DateTime(timezone=True), nullable=False, index=True)
    notes = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

