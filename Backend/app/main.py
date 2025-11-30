from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.api.routes import auth, tasks, events, diet, health, insights, profile

# Create tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if not settings.DEBUG else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(events.router, prefix="/api/v1/events", tags=["events"])
app.include_router(diet.router, prefix="/api/v1/diet", tags=["diet"])
app.include_router(health.router, prefix="/api/v1/health", tags=["health"])
app.include_router(insights.router, prefix="/api/v1/insights", tags=["insights"])
app.include_router(profile.router, prefix="/api/v1/profile", tags=["profile"])


@app.get("/")
def root():
    """Root endpoint."""
    return {
        "message": "Trackme API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

