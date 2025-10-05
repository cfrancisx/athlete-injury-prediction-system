
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

predictions_bp = Blueprint('predictions', __name__)

@predictions_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Predictions route working!'})
