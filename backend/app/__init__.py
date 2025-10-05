import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_migrate import Migrate
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
mongo = None

def create_app(config_name='default'):
    app = Flask(__name__)
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "https://athlete-injury-prediction.onrender.com",
                "http://localhost:3000"
            ]
        }
    })
    
    # Import and apply configuration
    from config import config
    app.config.from_object(config[config_name])
    
    # Initialize core Flask extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    migrate.init_app(app, db)
    
    # Initialize MongoDB (optional)
    initialize_mongodb(app)
    
    # Register API routes
    register_blueprints(app)
    
    return app

def initialize_mongodb(app):
    global mongo
    try:
        mongo_uri = os.environ.get('MONGODB_URI') or app.config.get('MONGODB_URI')
        if mongo_uri:
            mongo = PyMongo(app, uri=mongo_uri)
            print("✅ MongoDB connected")
    except Exception as e:
        print(f"⚠️  MongoDB not available: {e}")

def register_blueprints(app):
    from app.routes.auth import auth_bp
    from app.routes.athletes import athletes_bp
    from app.routes.predictions import predictions_bp
    from app.routes.monitoring import monitoring_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(athletes_bp, url_prefix='/api/athletes')
    app.register_blueprint(predictions_bp, url_prefix='/api/predictions')
    app.register_blueprint(monitoring_bp, url_prefix='/api/monitoring')