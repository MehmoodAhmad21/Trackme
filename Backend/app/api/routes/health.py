from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, date, timedelta

from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.step_summary import StepSummary
from app.models.vital import Vital
from app.models.activity import Activity
from app.schemas.step_summary import StepSummaryCreate, StepSummaryResponse
from app.schemas.vital import VitalCreate, VitalResponse
from app.schemas.activity import ActivityCreate, ActivityResponse, ActivityUpdate


router = APIRouter()


# Step endpoints
@router.post("/steps", response_model=StepSummaryResponse, status_code=status.HTTP_201_CREATED)
def create_or_update_steps(
    step_data: StepSummaryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or update step summary for a date."""
    # Check if entry already exists for this date
    existing = db.query(StepSummary).filter(
        StepSummary.user_id == current_user.id,
        StepSummary.date == step_data.date
    ).first()
    
    if existing:
        # Update existing
        existing.step_count = step_data.step_count
        existing.source = step_data.source
        db.commit()
        db.refresh(existing)
        return existing
    else:
        # Create new
        step_summary = StepSummary(
            **step_data.model_dump(),
            user_id=current_user.id
        )
        db.add(step_summary)
        db.commit()
        db.refresh(step_summary)
        return step_summary


@router.get("/steps/summary", response_model=List[StepSummaryResponse])
def get_step_summary(
    from_date: Optional[str] = Query(None, alias="from", description="Start date (YYYY-MM-DD)"),
    to_date: Optional[str] = Query(None, alias="to", description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get step summary over a date range."""
    query = db.query(StepSummary).filter(StepSummary.user_id == current_user.id)
    
    if from_date:
        try:
            start = datetime.fromisoformat(from_date).date()
            query = query.filter(StepSummary.date >= start)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from date format")
    
    if to_date:
        try:
            end = datetime.fromisoformat(to_date).date()
            query = query.filter(StepSummary.date <= end)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid to date format")
    
    steps = query.order_by(StepSummary.date.asc()).all()
    return steps


# Vitals endpoints
@router.post("/vitals", response_model=VitalResponse, status_code=status.HTTP_201_CREATED)
def create_vital(
    vital_data: VitalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new vital record."""
    vital = Vital(**vital_data.model_dump(), user_id=current_user.id)
    db.add(vital)
    db.commit()
    db.refresh(vital)
    return vital


@router.get("/vitals/{vital_type}", response_model=List[VitalResponse])
def get_vitals_by_type(
    vital_type: str,
    from_date: Optional[str] = Query(None, alias="from", description="Start date (ISO format)"),
    to_date: Optional[str] = Query(None, alias="to", description="End date (ISO format)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get vitals of a specific type over a date range."""
    query = db.query(Vital).filter(
        Vital.user_id == current_user.id,
        Vital.type == vital_type
    )
    
    if from_date:
        try:
            start = datetime.fromisoformat(from_date)
            query = query.filter(Vital.recorded_at >= start)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from date format")
    
    if to_date:
        try:
            end = datetime.fromisoformat(to_date)
            query = query.filter(Vital.recorded_at <= end)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid to date format")
    
    vitals = query.order_by(Vital.recorded_at.asc()).all()
    return vitals


# Activity endpoints
@router.post("/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def create_activity(
    activity_data: ActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new activity record."""
    activity = Activity(**activity_data.model_dump(), user_id=current_user.id)
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity


@router.get("/activities", response_model=List[ActivityResponse])
def get_activities(
    from_date: Optional[str] = Query(None, alias="from", description="Start date (ISO format)"),
    to_date: Optional[str] = Query(None, alias="to", description="End date (ISO format)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get activities over a date range."""
    query = db.query(Activity).filter(Activity.user_id == current_user.id)
    
    if from_date:
        try:
            start = datetime.fromisoformat(from_date)
            query = query.filter(Activity.datetime >= start)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from date format")
    
    if to_date:
        try:
            end = datetime.fromisoformat(to_date)
            query = query.filter(Activity.datetime <= end)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid to date format")
    
    activities = query.order_by(Activity.datetime.desc()).all()
    return activities


@router.patch("/activities/{activity_id}", response_model=ActivityResponse)
def update_activity(
    activity_id: int,
    activity_data: ActivityUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an activity."""
    activity = db.query(Activity).filter(
        Activity.id == activity_id,
        Activity.user_id == current_user.id
    ).first()
    
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    # Update fields
    update_data = activity_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(activity, field, value)
    
    db.commit()
    db.refresh(activity)
    return activity


@router.delete("/activities/{activity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an activity."""
    activity = db.query(Activity).filter(
        Activity.id == activity_id,
        Activity.user_id == current_user.id
    ).first()
    
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    db.delete(activity)
    db.commit()
    return None

