from datetime import datetime, timedelta, date
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import func, and_

from app.models.user import User
from app.models.step_summary import StepSummary
from app.models.activity import Activity
from app.models.meal import Meal
from app.models.vital import Vital
from app.models.insight import Insight, InsightCategory
from app.models.goal import Goal


class InsightsEngine:
    """
    Rule-based insights and suggestions engine.
    Analyzes user's health data and generates personalized insights.
    """
    
    def __init__(self, db: Session, user: User):
        self.db = db
        self.user = user
        self.days_lookback = 7
        
    async def generate_insights(self) -> List[Insight]:
        """Generate new insights for the user based on recent activity."""
        insights = []
        
        # Get user goals
        goal = self.db.query(Goal).filter(Goal.user_id == self.user.id).first()
        if not goal:
            # Create default goals if none exist
            goal = Goal(user_id=self.user.id)
            self.db.add(goal)
            self.db.commit()
        
        # Clear old undismissed insights (older than 24 hours)
        yesterday = datetime.utcnow() - timedelta(days=1)
        self.db.query(Insight).filter(
            and_(
                Insight.user_id == self.user.id,
                Insight.is_dismissed == False,
                Insight.created_at < yesterday
            )
        ).delete()
        
        # Generate insights
        insights.extend(await self._analyze_steps(goal))
        insights.extend(await self._analyze_diet(goal))
        insights.extend(await self._analyze_activity(goal))
        insights.extend(await self._analyze_vitals(goal))
        
        # Save new insights
        for insight in insights:
            self.db.add(insight)
        
        self.db.commit()
        
        return insights
    
    async def _analyze_steps(self, goal: Goal) -> List[Insight]:
        """Analyze step data and generate movement insights."""
        insights = []
        
        # Get last 7 days of steps
        end_date = date.today()
        start_date = end_date - timedelta(days=self.days_lookback)
        
        steps = self.db.query(StepSummary).filter(
            and_(
                StepSummary.user_id == self.user.id,
                StepSummary.date >= start_date,
                StepSummary.date <= end_date
            )
        ).all()
        
        if not steps:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.MOVEMENT,
                message="Start tracking your daily steps to get personalized movement insights!"
            ))
            return insights
        
        # Calculate average steps
        avg_steps = sum(s.step_count for s in steps) / len(steps)
        
        # Check if below goal
        if avg_steps < goal.daily_step_goal * 0.8:
            shortfall = goal.daily_step_goal - int(avg_steps)
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.MOVEMENT,
                message=f"You're averaging {int(avg_steps)} steps/day, {shortfall} below your goal. Try a 10-minute walk!"
            ))
        elif avg_steps >= goal.daily_step_goal * 0.9:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.MOVEMENT,
                message=f"Great job! You're close to your step goal with {int(avg_steps)} steps/day. Keep it up! 🎉"
            ))
        
        # Check for inactivity
        recent_steps = [s for s in steps if s.date >= end_date - timedelta(days=3)]
        if recent_steps and all(s.step_count < 5000 for s in recent_steps):
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.OUTDOOR,
                message="You've been less active the past 3 days. Consider going outside for a walk!"
            ))
        
        return insights
    
    async def _analyze_diet(self, goal: Goal) -> List[Insight]:
        """Analyze dietary data and generate nutrition insights."""
        insights = []
        
        # Get last 7 days of meals
        start_date = datetime.utcnow() - timedelta(days=self.days_lookback)
        
        meals = self.db.query(Meal).filter(
            and_(
                Meal.user_id == self.user.id,
                Meal.datetime >= start_date
            )
        ).all()
        
        if not meals:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.DIET,
                message="Start logging your meals to get personalized nutrition insights!"
            ))
            return insights
        
        # Calculate daily averages
        days_with_data = len(set(m.datetime.date() for m in meals))
        if days_with_data == 0:
            return insights
        
        avg_calories = sum(m.calories for m in meals) / days_with_data
        avg_carbs = sum(m.carbs for m in meals) / days_with_data
        avg_protein = sum(m.protein for m in meals) / days_with_data
        
        # Calorie insights
        if avg_calories > goal.daily_calorie_goal * 1.15:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.DIET,
                message=f"You're averaging {int(avg_calories)} calories/day, above your {int(goal.daily_calorie_goal)} goal. Consider lighter meals."
            ))
        
        # Carbs insights
        if avg_carbs > goal.daily_carbs_goal * 1.2:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.DIET,
                message="Your carb intake has been high lately. Try adding more protein and vegetables."
            ))
        
        # Protein insights
        if avg_protein < goal.daily_protein_goal * 0.7:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.DIET,
                message=f"You're low on protein (avg {int(avg_protein)}g/day). Consider adding lean meats, fish, or legumes."
            ))
        
        return insights
    
    async def _analyze_activity(self, goal: Goal) -> List[Insight]:
        """Analyze exercise activity and generate insights."""
        insights = []
        
        # Get last 7 days of activities
        start_date = datetime.utcnow() - timedelta(days=self.days_lookback)
        
        activities = self.db.query(Activity).filter(
            and_(
                Activity.user_id == self.user.id,
                Activity.datetime >= start_date
            )
        ).all()
        
        if not activities:
            # Check if they have step data but no logged activities
            step_data = self.db.query(StepSummary).filter(
                StepSummary.user_id == self.user.id
            ).first()
            
            if step_data:
                insights.append(Insight(
                    user_id=self.user.id,
                    category=InsightCategory.MOVEMENT,
                    message="Log your workouts to get better activity insights and track your fitness progress!"
                ))
            
            return insights
        
        # Check workout frequency
        if len(activities) < 3:
            insights.append(Insight(
                user_id=self.user.id,
                category=InsightCategory.MOVEMENT,
                message="You've only logged a few workouts this week. Aim for at least 3-4 sessions for better health!"
            ))
        
        return insights
    
    async def _analyze_vitals(self, goal: Goal) -> List[Insight]:
        """Analyze health vitals and generate insights."""
        insights = []
        
        # Get last 7 days of sleep data
        start_date = datetime.utcnow() - timedelta(days=self.days_lookback)
        
        sleep_vitals = self.db.query(Vital).filter(
            and_(
                Vital.user_id == self.user.id,
                Vital.type == "sleep_duration",
                Vital.recorded_at >= start_date
            )
        ).all()
        
        if sleep_vitals:
            avg_sleep = sum(v.value for v in sleep_vitals) / len(sleep_vitals)
            
            if avg_sleep < goal.sleep_hours_goal * 0.85:
                insights.append(Insight(
                    user_id=self.user.id,
                    category=InsightCategory.SLEEP,
                    message=f"You're averaging {avg_sleep:.1f} hours of sleep. Try to get at least {goal.sleep_hours_goal} hours for optimal health."
                ))
        
        # Check heart rate (if available)
        hr_vitals = self.db.query(Vital).filter(
            and_(
                Vital.user_id == self.user.id,
                Vital.type == "heart_rate",
                Vital.recorded_at >= start_date
            )
        ).all()
        
        if hr_vitals:
            avg_hr = sum(v.value for v in hr_vitals) / len(hr_vitals)
            
            # Resting heart rate insights (very basic)
            if avg_hr > 80:
                insights.append(Insight(
                    user_id=self.user.id,
                    category=InsightCategory.GENERAL,
                    message="Your average heart rate is a bit elevated. Consider stress management and regular exercise."
                ))
        
        return insights
    
    def get_current_insights(self) -> List[Insight]:
        """Get current undismissed insights for the user."""
        return self.db.query(Insight).filter(
            and_(
                Insight.user_id == self.user.id,
                Insight.is_dismissed == False
            )
        ).order_by(Insight.created_at.desc()).all()
    
    def dismiss_insight(self, insight_id: int) -> bool:
        """Mark an insight as dismissed."""
        insight = self.db.query(Insight).filter(
            and_(
                Insight.id == insight_id,
                Insight.user_id == self.user.id
            )
        ).first()
        
        if insight:
            insight.is_dismissed = True
            self.db.commit()
            return True
        
        return False

