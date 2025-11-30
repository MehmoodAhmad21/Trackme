from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate, EventResponse


router = APIRouter()


@router.get("", response_model=List[EventResponse])
def get_events(
    from_date: Optional[str] = Query(None, alias="from", description="Start date (ISO format)"),
    to_date: Optional[str] = Query(None, alias="to", description="End date (ISO format)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get events for the current user."""
    query = db.query(Event).filter(Event.user_id == current_user.id)
    
    if from_date:
        try:
            start = datetime.fromisoformat(from_date)
            query = query.filter(Event.start_datetime >= start)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from date format")
    
    if to_date:
        try:
            end = datetime.fromisoformat(to_date)
            query = query.filter(Event.end_datetime <= end)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid to date format")
    
    events = query.order_by(Event.start_datetime.asc()).all()
    return events


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event_data: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new event."""
    # Validate start < end
    if event_data.start_datetime >= event_data.end_datetime:
        raise HTTPException(
            status_code=400,
            detail="Start datetime must be before end datetime"
        )
    
    event = Event(**event_data.model_dump(), user_id=current_user.id)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific event."""
    event = db.query(Event).filter(
        Event.id == event_id,
        Event.user_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return event


@router.patch("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    event_data: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an event."""
    event = db.query(Event).filter(
        Event.id == event_id,
        Event.user_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Update fields
    update_data = event_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(event, field, value)
    
    # Validate start < end after update
    if event.start_datetime >= event.end_datetime:
        raise HTTPException(
            status_code=400,
            detail="Start datetime must be before end datetime"
        )
    
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an event."""
    event = db.query(Event).filter(
        Event.id == event_id,
        Event.user_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(event)
    db.commit()
    return None

