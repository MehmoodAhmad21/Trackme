import pytest
from datetime import datetime, date


@pytest.mark.asyncio
async def test_create_meal_with_food_name(client, auth_headers):
    """Test creating a meal with food name (uses Nutrition API)."""
    response = client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Breakfast",
            "meal_type": "breakfast",
            "datetime": datetime.now().isoformat(),
            "food_name": "chicken salad",
            "quantity": "200g"
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Breakfast"
    assert data["calories"] > 0  # Should have nutrition data


def test_create_meal_manual(client, auth_headers):
    """Test creating a meal with manual nutrition data."""
    response = client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Lunch",
            "meal_type": "lunch",
            "datetime": datetime.now().isoformat(),
            "calories": 500,
            "carbs": 60,
            "protein": 30,
            "fat": 15
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["calories"] == 500
    assert data["protein"] == 30


def test_get_meals(client, auth_headers):
    """Test getting meals."""
    # Create a meal
    client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Snack",
            "meal_type": "snack",
            "datetime": datetime.now().isoformat(),
            "calories": 150
        },
        headers=auth_headers
    )
    
    # Get meals
    response = client.get("/api/v1/diet/meals", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


def test_get_diet_summary(client, auth_headers):
    """Test getting diet summary."""
    # Create a few meals
    today = datetime.now().isoformat()
    client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Breakfast",
            "meal_type": "breakfast",
            "datetime": today,
            "calories": 300,
            "carbs": 40,
            "protein": 15,
            "fat": 10
        },
        headers=auth_headers
    )
    client.post(
        "/api/v1/diet/meals",
        json={
            "name": "Lunch",
            "meal_type": "lunch",
            "datetime": today,
            "calories": 500,
            "carbs": 60,
            "protein": 30,
            "fat": 15
        },
        headers=auth_headers
    )
    
    # Get summary
    response = client.get("/api/v1/diet/summary", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    
    # Check today's data
    today_date = date.today().isoformat()
    today_summary = next((d for d in data if d["date"] == today_date), None)
    assert today_summary is not None
    assert today_summary["total_calories"] == 800

