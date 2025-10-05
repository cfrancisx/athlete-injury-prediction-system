import os

# Create routes directory if it doesn't exist
routes_dir = os.path.join('app', 'routes')
os.makedirs(routes_dir, exist_ok=True)

# Create __init__.py in routes directory
with open(os.path.join(routes_dir, '__init__.py'), 'w') as f:
    f.write('# Routes package\n')

# List of route files to create
route_files = {
    'athletes.py': '''
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, AthleteProfile

athletes_bp = Blueprint('athletes', __name__)

@athletes_bp.route('/', methods=['GET'])
@jwt_required()
def get_athletes():
    return jsonify({'message': 'Athletes route working!'})

@athletes_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Athletes test route working!'})
''',
    
    'predictions.py': '''
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

predictions_bp = Blueprint('predictions', __name__)

@predictions_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Predictions route working!'})
''',
    
    'monitoring.py': '''
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

monitoring_bp = Blueprint('monitoring', __name__)

@monitoring_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Monitoring route working!'})
'''
}

# Create each route file
for filename, content in route_files.items():
    filepath = os.path.join(routes_dir, filename)
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created {filepath}")

print("All missing route files created!")