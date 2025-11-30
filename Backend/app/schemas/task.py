from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from app.models.task import TaskStatus, TaskTag


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    tag: TaskTag = TaskTag.OTHER
    due_datetime: Optional[datetime] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    tag: Optional[TaskTag] = None
    due_datetime: Optional[datetime] = None


class TaskResponse(TaskBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

