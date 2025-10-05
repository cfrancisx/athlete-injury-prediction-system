
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

monitoring_bp = Blueprint('monitoring', __name__)

@monitoring_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Monitoring route working!'})
