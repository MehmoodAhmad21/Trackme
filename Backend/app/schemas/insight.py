from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.models.insight import InsightCategory


class InsightBase(BaseModel):
    category: InsightCategory
    message: str


class InsightCreate(InsightBase):
    pass


class InsightResponse(InsightBase):
    id: int
    user_id: int
    is_dismissed: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

