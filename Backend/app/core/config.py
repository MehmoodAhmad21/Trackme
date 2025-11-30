from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "Trackme"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite:///./trackme.db"
    
    # JWT
    JWT_SECRET: str = "change-this-secret-key-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # Nutrition API
    NUTRITION_API_KEY: str = ""
    NUTRITION_API_URL: str = "https://api.nutritionix.com/v1_1"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:8081",
        "http://localhost:19006",
        "exp://192.168.1.1:8081"
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

