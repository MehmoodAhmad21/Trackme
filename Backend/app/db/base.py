from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Import all models here for Alembic to detect them
from app.models.user import User
from app.models.task import Task
from app.models.event import Event
from app.models.meal import Meal
from app.models.activity import Activity
from app.models.step_summary import StepSummary
from app.models.vital import Vital
from app.models.insight import Insight
from app.models.goal import Goal

