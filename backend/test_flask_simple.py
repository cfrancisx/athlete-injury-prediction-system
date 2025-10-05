# backend/test_flask_simple.py
try:
    import flask
    print("✓ Flask is installed!")
    
    # Get version without using deprecated attribute
    try:
        # New way to get version in Flask 2.3+
        from importlib.metadata import version
        flask_version = version('flask')
    except ImportError:
        # Fallback for older Python versions
        import pkg_resources
        flask_version = pkg_resources.get_distribution('flask').version
    except:
        # Final fallback
        flask_version = getattr(flask, '__version__', 'Unknown')
    
    print(f"Flask version: {flask_version}")
    
    # Test creating a simple app
    app = flask.Flask(__name__)
    
    @app.route('/')
    def hello():
        return 'Hello World!'
    
    print("✓ Flask app creation successful!")
    
except ImportError as e:
    print(f"✗ Flask is NOT installed: {e}")