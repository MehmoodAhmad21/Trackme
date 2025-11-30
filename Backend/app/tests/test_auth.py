def test_register(client):
    """Test user registration."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": "New User",
            "email": "newuser@example.com",
            "password": "password123"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["name"] == "New User"
    assert "id" in data


def test_register_duplicate_email(client, test_user):
    """Test registration with duplicate email."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": "Another User",
            "email": test_user["email"],
            "password": "password123"
        }
    )
    assert response.status_code == 400


def test_login(client, test_user):
    """Test user login."""
    response = client.post(
        "/api/v1/auth/login",
        params={"email": test_user["email"], "password": test_user["password"]}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(client, test_user):
    """Test login with invalid credentials."""
    response = client.post(
        "/api/v1/auth/login",
        params={"email": test_user["email"], "password": "wrongpassword"}
    )
    assert response.status_code == 401


def test_get_current_user(client, auth_headers):
    """Test getting current user profile."""
    response = client.get("/api/v1/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"


def test_get_current_user_unauthorized(client):
    """Test getting current user without authentication."""
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 403

