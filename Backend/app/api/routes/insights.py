from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.insight import InsightResponse
from app.services.insights import InsightsEngine


router = APIRouter()


@router.get("/today", response_model=List[InsightResponse])
async def get_today_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current insights/suggestions for the user."""
    engine = InsightsEngine(db, current_user)
    
    # Generate new insights
    await engine.generate_insights()
    
    # Get current undismissed insights
    insights = engine.get_current_insights()
    
    return insights


@router.post("/{insight_id}/dismiss", status_code=status.HTTP_204_NO_CONTENT)
def dismiss_insight(
    insight_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Dismiss an insight."""
    engine = InsightsEngine(db, current_user)
    
    success = engine.dismiss_insight(insight_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Insight not found")
    
    return None

