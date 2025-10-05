import os
import sys
from app import create_app, db

print("🚀 Starting backend application...")
print(f"Python version: {sys.version}")
print(f"Current directory: {os.getcwd()}")
print(f"Files in current directory: {os.listdir('.')}")

try:
    app = create_app('default')
    print("✅ Flask app created successfully")
    
    # Add test routes
    @app.route('/')
    def home():
        return {'message': 'Backend is running!'}
    
    @app.route('/api/health')
    def health():
        return {'status': 'healthy', 'service': 'backend'}
    
    @app.route('/api/test')
    def test():
        return {'message': 'Test endpoint working'}
    
    # Print all registered routes
    print("📋 Registered routes:")
    with app.app_context():
        for rule in app.url_map.iter_rules():
            print(f"  {rule}")
    
    print("✅ Backend started successfully!")
    
except Exception as e:
    print(f"❌ Failed to start backend: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# This is needed for Gunicorn
application = app
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)