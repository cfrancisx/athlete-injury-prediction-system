from app import create_app, db
from flask_migrate import Migrate
from flask_cors import CORS
import os

app = create_app('default')

# COMPREHENSIVE CORS CONFIGURATION
CORS(app, 
     resources={
         r"/*": {
             "origins": [
                 "https://athlete-injury-prediction-system-1.onrender.com",  # Your exact frontend
                 "http://localhost:3000",
                 "http://localhost:5000"
             ],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
             "allow_headers": [
                 "Content-Type", 
                 "Authorization", 
                 "Access-Control-Allow-Credentials",
                 "Access-Control-Allow-Origin",
                 "X-Requested-With"
             ],
             "expose_headers": [
                 "Content-Type",
                 "Authorization",
                 "Access-Control-Allow-Origin"
             ],
             "supports_credentials": True,
             "max_age": 3600
         }
     })

# Optional: Also add after_request handler for extra CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://athlete-injury-prediction-system-1.onrender.com')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

migrate = Migrate(app, db)

if __name__ == '__main__':
    print("=" * 50)
    print("Starting Athlete Injury Prediction System")
    print("=" * 50)
    print(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    print(f"Running on: http://0.0.0.0:5000")
    print("=" * 50)
    
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)