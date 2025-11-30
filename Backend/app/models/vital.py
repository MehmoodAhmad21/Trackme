from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from app.db.base import Base


class Vital(Base):
    __tablename__ = "vitals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(String, nullable=False, index=True)  # e.g., "heart_rate", "blood_glucose", "sleep_duration"
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=False)  # e.g., "bpm", "mg/dL", "hours"
    recorded_at = Column(DateTime(timezone=True), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

