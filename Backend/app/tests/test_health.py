from datetime import date, datetime


def test_create_step_summary(client, auth_headers):
    """Test creating/updating step summary."""
    today = date.today().isoformat()
    response = client.post(
        "/api/v1/health/steps",
        json={
            "date": today,
            "step_count": 8000,
            "source": "apple_healthkit"
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["step_count"] == 8000
    assert data["source"] == "apple_healthkit"


def test_get_step_summary(client, auth_headers):
    """Test getting step summary."""
    today = date.today().isoformat()
    
    # Create step data
    client.post(
        "/api/v1/health/steps",
        json={
            "date": today,
            "step_count": 10000,
            "source": "apple_healthkit"
        },
        headers=auth_headers
    )
    
    # Get summary
    response = client.get("/api/v1/health/steps/summary", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


def test_create_vital(client, auth_headers):
    """Test creating a vital record."""
    response = client.post(
        "/api/v1/health/vitals",
        json={
            "type": "heart_rate",
            "value": 72,
            "unit": "bpm",
            "recorded_at": datetime.now().isoformat()
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["type"] == "heart_rate"
    assert data["value"] == 72


def test_get_vitals_by_type(client, auth_headers):
    """Test getting vitals by type."""
    # Create vital records
    now = datetime.now()
    client.post(
        "/api/v1/health/vitals",
        json={
            "type": "blood_glucose",
            "value": 95,
            "unit": "mg/dL",
            "recorded_at": now.isoformat()
        },
        headers=auth_headers
    )
    
    # Get vitals
    response = client.get("/api/v1/health/vitals/blood_glucose", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["type"] == "blood_glucose"


def test_create_activity(client, auth_headers):
    """Test creating an activity."""
    response = client.post(
        "/api/v1/health/activities",
        json={
            "type": "run",
            "duration_minutes": 30,
            "distance_km": 5.0,
            "calories_burned": 300,
            "datetime": datetime.now().isoformat(),
            "notes": "Morning run"
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["type"] == "run"
    assert data["duration_minutes"] == 30
    assert data["distance_km"] == 5.0

