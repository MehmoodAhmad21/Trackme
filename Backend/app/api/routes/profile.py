from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.goal import Goal
from app.schemas.user import UserResponse, UserUpdate
from app.schemas.goal import GoalResponse, GoalUpdate, ConnectionUpdate, ConnectionResponse


router = APIRouter()


@router.get("", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    """Get user profile."""
    return current_user


@router.patch("", response_model=UserResponse)
def update_profile(
    profile_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user profile."""
    # Check if email is being changed and if it's already taken
    if profile_data.email and profile_data.email != current_user.email:
        existing = db.query(User).filter(User.email == profile_data.email).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already in use"
            )
    
    # Update fields
    update_data = profile_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/goals", response_model=GoalResponse)
def get_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user goals."""
    goal = db.query(Goal).filter(Goal.user_id == current_user.id).first()
    
    if not goal:
        # Create default goals
        goal = Goal(user_id=current_user.id)
        db.add(goal)
        db.commit()
        db.refresh(goal)
    
    return goal


@router.patch("/goals", response_model=GoalResponse)
def update_goals(
    goal_data: GoalUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user goals."""
    goal = db.query(Goal).filter(Goal.user_id == current_user.id).first()
    
    if not goal:
        # Create goals if they don't exist
        goal = Goal(user_id=current_user.id)
        db.add(goal)
    
    # Update fields
    update_data = goal_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(goal, field, value)
    
    db.commit()
    db.refresh(goal)
    return goal


@router.get("/connections", response_model=ConnectionResponse)
def get_connections(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get connection status for integrated services."""
    goal = db.query(Goal).filter(Goal.user_id == current_user.id).first()
    
    if not goal:
        # Create default goals
        goal = Goal(user_id=current_user.id)
        db.add(goal)
        db.commit()
        db.refresh(goal)
    
    return ConnectionResponse(
        apple_health_connected=goal.apple_health_connected,
        nutrition_api_connected=goal.nutrition_api_connected
    )


@router.patch("/connections", response_model=ConnectionResponse)
def update_connections(
    connection_data: ConnectionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update connection status for integrated services."""
    goal = db.query(Goal).filter(Goal.user_id == current_user.id).first()
    
    if not goal:
        goal = Goal(user_id=current_user.id)
        db.add(goal)
    
    # Update connection flags
    if connection_data.apple_health_connected is not None:
        goal.apple_health_connected = connection_data.apple_health_connected
    if connection_data.nutrition_api_connected is not None:
        goal.nutrition_api_connected = connection_data.nutrition_api_connected
    
    db.commit()
    db.refresh(goal)
    
    return ConnectionResponse(
        apple_health_connected=goal.apple_health_connected,
        nutrition_api_connected=goal.nutrition_api_connected
    )

