import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import User, AthleteProfile, TrainingSession, InjuryPrediction
from werkzeug.security import generate_password_hash

def init_database(drop_existing=False):
    app = create_app('default')
    
    with app.app_context():
        try:
            print("🚀 Starting database initialization...")
            print("=" * 50)
            
            if drop_existing:
                print("Dropping existing tables...")
                db.drop_all()
                print("✓ Existing tables dropped!")
            
            print("Creating database tables...")
            db.create_all()
            print("✓ Tables created successfully!")
            
            # Create sample users
            print("Creating sample users...")
            
            users_data = [
                {
                    'email': 'admin@athlete.com',
                    'password': 'admin123',
                    'role': 'admin',
                    'first_name': 'System',
                    'last_name': 'Administrator'
                },
                {
                    'email': 'coach@team.com', 
                    'password': 'coach123',
                    'role': 'coach',
                    'first_name': 'John',
                    'last_name': 'Coach'
                },
                {
                    'email': 'athlete@team.com',
                    'password': 'athlete123', 
                    'role': 'athlete',
                    'first_name': 'Mike',
                    'last_name': 'Runner'
                }
            ]
            
            users = []
            for user_data in users_data:
                user = User(
                    email=user_data['email'],
                    password_hash=generate_password_hash(user_data['password']),
                    role=user_data['role'],
                    first_name=user_data['first_name'],
                    last_name=user_data['last_name']
                )
                db.session.add(user)
                users.append(user)
            
            db.session.commit()
            print("✓ Sample users created!")
            
            # Get the athlete user
            athlete_user = next(user for user in users if user.role == 'athlete')
            coach_user = next(user for user in users if user.role == 'coach')
            
            # Create athlete profile
            athlete_profile = AthleteProfile(
                user_id=athlete_user.id,
                date_of_birth=datetime(1995, 5, 15),
                height=180.5,
                weight=75.2,
                sport_type='Running',
                position='Long Distance',
                medical_history='No significant medical history',
                previous_injuries='Minor ankle sprain in 2022'
            )
            db.session.add(athlete_profile)
            
            # Create sample training session
            training_session = TrainingSession(
                athlete_id=athlete_user.id,
                coach_id=coach_user.id,
                session_date=datetime.now().date(),
                duration_minutes=90,
                intensity='high',
                session_type='Interval Training',
                notes='Good performance, maintained target pace'
            )
            db.session.add(training_session)
            
            # Create sample injury prediction
            prediction = InjuryPrediction(
                athlete_id=athlete_user.id,
                risk_score=25.5,
                risk_level='low',
                predicted_injury_type='Muscle Strain',
                confidence=0.85,
                features_used='{"heart_rate": 75, "training_load": 350}',
                recommendations='Maintain current training load. Ensure proper warm-up and cool down.'
            )
            db.session.add(prediction)
            
            db.session.commit()
            
            print("✓ Database initialized successfully!")
            print("\n" + "=" * 50)
            print("✅ DATABASE READY")
            print("=" * 50)
            print("\n👤 Sample Users Created:")
            for user_data in users_data:
                print(f"   {user_data['role'].title():8}: {user_data['email']} / {user_data['password']}")
            print("\n🎯 Next Steps:")
            print("   1. Start backend: python run.py")
            print("   2. Test API endpoints")
            print("   3. Start frontend: npm start")
            print("=" * 50)
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error initializing database: {str(e)}")
            import traceback
            traceback.print_exc()

if __name__ == '__main__':
    # Use init_database(True) to force drop existing tables
    init_database(drop_existing=False)