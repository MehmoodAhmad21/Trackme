from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.sql import func
import enum
from app.db.base import Base


class InsightCategory(str, enum.Enum):
    MOVEMENT = "movement"
    DIET = "diet"
    SLEEP = "sleep"
    OUTDOOR = "outdoor"
    GENERAL = "general"


class Insight(Base):
    __tablename__ = "insights"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category = Column(Enum(InsightCategory), nullable=False)
    message = Column(Text, nullable=False)
    is_dismissed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)

