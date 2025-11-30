from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional


class StepSummaryBase(BaseModel):
    date: date
    step_count: int
    source: str = "manual"


class StepSummaryCreate(StepSummaryBase):
    pass


class StepSummaryUpdate(BaseModel):
    step_count: Optional[int] = None
    source: Optional[str] = None


class StepSummaryResponse(StepSummaryBase):
    id: int
    user_id: int
    
    model_config = ConfigDict(from_attributes=True)

