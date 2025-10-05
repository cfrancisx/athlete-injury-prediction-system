from app import create_app, db
from flask_migrate import Migrate
import os

app = create_app('default')
migrate = Migrate(app, db)

if __name__ == '__main__':
    print("=" * 50)
    print("Starting Athlete Injury Prediction System")
    print("=" * 50)
    print(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    print(f"Running on: http://0.0.0.0:5000")
    print("=" * 50)
    
    # Use environment variable for debug mode
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)