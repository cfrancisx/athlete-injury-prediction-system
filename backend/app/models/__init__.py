from app import db
from datetime import datetime
import json

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # athlete, coach, medical_staff, admin
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    athlete_profile = db.relationship('AthleteProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    training_sessions_as_athlete = db.relationship('TrainingSession', 
                                                 foreign_keys='TrainingSession.athlete_id', 
                                                 backref='athlete', 
                                                 lazy='dynamic')
    training_sessions_as_coach = db.relationship('TrainingSession', 
                                               foreign_keys='TrainingSession.coach_id', 
                                               backref='coach', 
                                               lazy='dynamic')
    injury_predictions = db.relationship('InjuryPrediction', backref='athlete', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'is_active': self.is_active
        }
    
    def __repr__(self):
        return f'<User {self.email} ({self.role})>'

class AthleteProfile(db.Model):
    __tablename__ = 'athlete_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    date_of_birth = db.Column(db.Date)
    height = db.Column(db.Float)  # in cm
    weight = db.Column(db.Float)  # in kg
    sport_type = db.Column(db.String(100))
    position = db.Column(db.String(100))
    medical_history = db.Column(db.Text)
    previous_injuries = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'height': self.height,
            'weight': self.weight,
            'sport_type': self.sport_type,
            'position': self.position,
            'medical_history': self.medical_history,
            'previous_injuries': self.previous_injuries,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<AthleteProfile user_id={self.user_id} sport={self.sport_type}>'

class TrainingSession(db.Model):
    __tablename__ = 'training_sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    athlete_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    coach_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    session_date = db.Column(db.Date, nullable=False)
    duration_minutes = db.Column(db.Integer)
    intensity = db.Column(db.String(50))  # low, medium, high
    session_type = db.Column(db.String(100))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Add constraints
    __table_args__ = (
        db.CheckConstraint("intensity IN ('low', 'medium', 'high')", name='check_intensity'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'athlete_id': self.athlete_id,
            'coach_id': self.coach_id,
            'session_date': self.session_date.isoformat() if self.session_date else None,
            'duration_minutes': self.duration_minutes,
            'intensity': self.intensity,
            'session_type': self.session_type,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<TrainingSession athlete={self.athlete_id} date={self.session_date}>'

class InjuryPrediction(db.Model):
    __tablename__ = 'injury_predictions'
    
    id = db.Column(db.Integer, primary_key=True)
    athlete_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    prediction_date = db.Column(db.DateTime, default=datetime.utcnow)
    risk_score = db.Column(db.Float, nullable=False)  # 0-100
    risk_level = db.Column(db.String(20), nullable=False)  # low, medium, high
    predicted_injury_type = db.Column(db.String(100))
    confidence = db.Column(db.Float)  # 0-1
    features_used = db.Column(db.Text)  # JSON string of features used
    recommendations = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Add constraints
    __table_args__ = (
        db.CheckConstraint("risk_score >= 0 AND risk_score <= 100", name='check_risk_score'),
        db.CheckConstraint("risk_level IN ('low', 'medium', 'high')", name='check_risk_level'),
        db.CheckConstraint("confidence >= 0 AND confidence <= 1", name='check_confidence'),
    )
    
    def to_dict(self):
        try:
            features = json.loads(self.features_used) if self.features_used else None
        except (json.JSONDecodeError, TypeError):
            features = None
            
        return {
            'id': self.id,
            'athlete_id': self.athlete_id,
            'prediction_date': self.prediction_date.isoformat() if self.prediction_date else None,
            'risk_score': self.risk_score,
            'risk_level': self.risk_level,
            'predicted_injury_type': self.predicted_injury_type,
            'confidence': self.confidence,
            'features_used': features,
            'recommendations': self.recommendations,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<InjuryPrediction athlete={self.athlete_id} risk={self.risk_level} score={self.risk_score}>'