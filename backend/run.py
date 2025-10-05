from app import create_app, db
from flask_migrate import Migrate
from flask_cors import CORS  # ADD THIS IMPORT
import os

app = create_app('default')

# ADD THIS CORS CONFIGURATION RIGHT HERE
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://athlete-injury-prediction.onrender.com",  # Your frontend URL
            "http://localhost:3000",                           # Local development
            "https://athlete-injury-prediction-system-1.onrender.com"  # Your actual frontend
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"]
    }
})

migrate = Migrate(app, db)

if __name__ == '__main__':
    # ... rest of your code
    print("=" * 50)
    print("Starting Athlete Injury Prediction System")
    print("=" * 50)
    print(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    print(f"Running on: http://0.0.0.0:5000")
    print("=" * 50)
    
    # Use environment variable for debug mode
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)