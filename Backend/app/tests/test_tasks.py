from datetime import datetime, timedelta


def test_create_task(client, auth_headers):
    """Test creating a task."""
    response = client.post(
        "/api/v1/tasks",
        json={
            "title": "Test Task",
            "description": "Test description",
            "status": "todo",
            "tag": "work",
            "due_datetime": (datetime.now() + timedelta(days=1)).isoformat()
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["status"] == "todo"


def test_get_tasks(client, auth_headers):
    """Test getting tasks."""
    # Create a task first
    client.post(
        "/api/v1/tasks",
        json={"title": "Task 1", "status": "todo"},
        headers=auth_headers
    )
    
    # Get tasks
    response = client.get("/api/v1/tasks", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


def test_update_task(client, auth_headers):
    """Test updating a task."""
    # Create a task
    create_response = client.post(
        "/api/v1/tasks",
        json={"title": "Task to Update", "status": "todo"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]
    
    # Update task
    response = client.patch(
        f"/api/v1/tasks/{task_id}",
        json={"status": "done"},
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "done"


def test_delete_task(client, auth_headers):
    """Test deleting a task."""
    # Create a task
    create_response = client.post(
        "/api/v1/tasks",
        json={"title": "Task to Delete", "status": "todo"},
        headers=auth_headers
    )
    task_id = create_response.json()["id"]
    
    # Delete task
    response = client.delete(f"/api/v1/tasks/{task_id}", headers=auth_headers)
    assert response.status_code == 204
    
    # Verify deletion
    get_response = client.get(f"/api/v1/tasks/{task_id}", headers=auth_headers)
    assert get_response.status_code == 404

