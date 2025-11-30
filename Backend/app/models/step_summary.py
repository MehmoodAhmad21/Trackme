from sqlalchemy import Column, Integer, Date, ForeignKey, String
from sqlalchemy.sql import func
from app.db.base import Base


class StepSummary(Base):
    __tablename__ = "step_summaries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    step_count = Column(Integer, nullable=False, default=0)
    source = Column(String, default="manual")  # e.g., "apple_healthkit", "manual"
    
    __table_args__ = (
        # Ensure one entry per user per day
        {"sqlite_autoincrement": True},
    )

