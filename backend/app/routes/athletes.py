
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
