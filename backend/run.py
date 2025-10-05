from app import create_app, db
from flask_migrate import Migrate, upgrade
import os

app = create_app('default')
migrate = Migrate(app, db)
    
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
    
    @app.route('/api/health')
def health_check():
    return {'status': 'healthy', 'backend': 'running'}

@app.route('/')
def home():
    return {'message': 'Athlete Injury Prediction API', 'status': 'active'}

@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)