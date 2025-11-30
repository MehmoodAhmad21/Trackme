from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, date, timedelta
from collections import defaultdict

from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.meal import Meal
from app.schemas.meal import MealCreate, MealUpdate, MealResponse, DailySummary
from app.services.nutrition_api import nutrition_client


router = APIRouter()


@router.get("/meals", response_model=List[MealResponse])
def get_meals(
    date: Optional[str] = Query(None, description="Filter by date (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get meals for the current user."""
    query = db.query(Meal).filter(Meal.user_id == current_user.id)
    
    if date:
        try:
            filter_date = datetime.fromisoformat(date).date()
            next_day = filter_date + timedelta(days=1)
            query = query.filter(
                Meal.datetime >= filter_date,
                Meal.datetime < next_day
            )
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format")
    
    meals = query.order_by(Meal.datetime.desc()).all()
    return meals


@router.post("/meals", response_model=MealResponse, status_code=status.HTTP_201_CREATED)
async def create_meal(
    meal_data: MealCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new meal entry."""
    # If food_name is provided, fetch nutrition data from API
    if meal_data.food_name:
        nutrition_data = await nutrition_client.get_nutrition_data(
            meal_data.food_name,
            meal_data.quantity
        )
        
        meal = Meal(
            user_id=current_user.id,
            name=meal_data.name,
            meal_type=meal_data.meal_type,
            datetime=meal_data.datetime,
            calories=nutrition_data["calories"],
            carbs=nutrition_data["carbs"],
            protein=nutrition_data["protein"],
            fat=nutrition_data["fat"],
            raw_nutrition_data=nutrition_data.get("raw_data")
        )
    else:
        # Manual entry
        meal = Meal(
            user_id=current_user.id,
            name=meal_data.name,
            meal_type=meal_data.meal_type,
            datetime=meal_data.datetime,
            calories=meal_data.calories or 0,
            carbs=meal_data.carbs or 0,
            protein=meal_data.protein or 0,
            fat=meal_data.fat or 0
        )
    
    db.add(meal)
    db.commit()
    db.refresh(meal)
    return meal


@router.get("/meals/{meal_id}", response_model=MealResponse)
def get_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific meal."""
    meal = db.query(Meal).filter(
        Meal.id == meal_id,
        Meal.user_id == current_user.id
    ).first()
    
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    return meal


@router.patch("/meals/{meal_id}", response_model=MealResponse)
def update_meal(
    meal_id: int,
    meal_data: MealUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a meal."""
    meal = db.query(Meal).filter(
        Meal.id == meal_id,
        Meal.user_id == current_user.id
    ).first()
    
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    # Update fields
    update_data = meal_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(meal, field, value)
    
    db.commit()
    db.refresh(meal)
    return meal


@router.delete("/meals/{meal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a meal."""
    meal = db.query(Meal).filter(
        Meal.id == meal_id,
        Meal.user_id == current_user.id
    ).first()
    
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    db.delete(meal)
    db.commit()
    return None


@router.get("/summary", response_model=List[DailySummary])
def get_diet_summary(
    from_date: Optional[str] = Query(None, alias="from", description="Start date (YYYY-MM-DD)"),
    to_date: Optional[str] = Query(None, alias="to", description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get daily nutrition summary."""
    # Default to last 7 days
    if not from_date:
        start = date.today() - timedelta(days=7)
    else:
        try:
            start = datetime.fromisoformat(from_date).date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid from date format")
    
    if not to_date:
        end = date.today()
    else:
        try:
            end = datetime.fromisoformat(to_date).date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid to date format")
    
    # Query meals in date range
    meals = db.query(Meal).filter(
        Meal.user_id == current_user.id,
        func.date(Meal.datetime) >= start,
        func.date(Meal.datetime) <= end
    ).order_by(Meal.datetime.asc()).all()
    
    # Group by date
    daily_data = defaultdict(lambda: {
        "total_calories": 0,
        "total_carbs": 0,
        "total_protein": 0,
        "total_fat": 0,
        "meals": []
    })
    
    for meal in meals:
        meal_date = meal.datetime.date().isoformat()
        daily_data[meal_date]["total_calories"] += meal.calories
        daily_data[meal_date]["total_carbs"] += meal.carbs
        daily_data[meal_date]["total_protein"] += meal.protein
        daily_data[meal_date]["total_fat"] += meal.fat
        daily_data[meal_date]["meals"].append(meal)
    
    # Convert to response format
    summaries = []
    current_date = start
    while current_date <= end:
        date_str = current_date.isoformat()
        data = daily_data.get(date_str, {
            "total_calories": 0,
            "total_carbs": 0,
            "total_protein": 0,
            "total_fat": 0,
            "meals": []
        })
        summaries.append(DailySummary(date=date_str, **data))
        current_date += timedelta(days=1)
    
    return summaries

