import pytest
from datetime import datetime, date


@pytest.mark.asyncio
async def test_get_insights(client, auth_headers):
    """Test getting insights."""
    # Create some health data first
    today = date.today().isoformat()
    
    # Add step data
    client.post(
        "/api/v1/health/steps",
        json={"date": today, "step_count": 3000, "source": "manual"},
        headers=auth_headers
    )
    
    # Add meal data
    client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Big lunch",
            "meal_type": "lunch",
            "datetime": datetime.now().isoformat(),
            "calories": 800,
            "carbs": 100,
            "protein": 20,
            "fat": 30
        },
        headers=auth_headers
    )
    
    # Get insights
    response = client.get("/api/v1/insights/today", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    # Should have generated some insights based on the data
    assert isinstance(data, list)


@pytest.mark.asyncio
async def test_dismiss_insight(client, auth_headers):
    """Test dismissing an insight."""
    # Get insights first
    response = client.get("/api/v1/insights/today", headers=auth_headers)
    insights = response.json()
    
    if len(insights) > 0:
        insight_id = insights[0]["id"]
        
        # Dismiss insight
        dismiss_response = client.post(
            f"/api/v1/insights/{insight_id}/dismiss",
            headers=auth_headers
        )
        assert dismiss_response.status_code == 204
        
        # Verify it's dismissed (shouldn't appear in active insights)
        get_response = client.get("/api/v1/insights/today", headers=auth_headers)
        active_insights = get_response.json()
        assert all(i["id"] != insight_id or i["is_dismissed"] for i in active_insights)

