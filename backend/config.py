import os
from datetime import timedelta

class Config:
    # Load environment variables
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-this'
    
    # Database configuration - SQLite will work perfectly
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///athlete_safety.db'
    
    # MongoDB configuration
    MONGODB_URI = os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017/athlete_sensor_data'
    
    # SQLAlchemy configuration
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT configurations
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    # ML Model paths
    MODEL_PATH = os.path.join(os.path.dirname(__file__), '../ml_models/saved_models/')
    
    # Ensure the model directory exists
    os.makedirs(MODEL_PATH, exist_ok=True)

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}