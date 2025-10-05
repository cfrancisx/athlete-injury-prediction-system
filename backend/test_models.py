import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import User, AthleteProfile, TrainingSession, InjuryPrediction

def test_models():
    app = create_app('default')
    
    with app.app_context():
        try:
            print("🧪 Testing Database Models...")
            print("=" * 50)
            
            # Test User model
            user = User(
                email="test@example.com",
                password_hash="hashed_password",
                role="athlete",
                first_name="Test",
                last_name="User"
            )
            print("✓ User model created")
            print(f"  User repr: {user}")
            
            # Test AthleteProfile model
            profile = AthleteProfile(
                user_id=1,  # This would be set after user creation
                sport_type="Running",
                height=180.0,
                weight=75.0
            )
            print("✓ AthleteProfile model created")
            print(f"  Profile repr: {profile}")
            
            # Test TrainingSession model
            session = TrainingSession(
                athlete_id=1,
                coach_id=2,
                session_date="2024-01-15",
                duration_minutes=90,
                intensity="high",
                session_type="Interval Training"
            )
            print("✓ TrainingSession model created")
            print(f"  Session repr: {session}")
            
            # Test InjuryPrediction model
            prediction = InjuryPrediction(
                athlete_id=1,
                risk_score=25.5,
                risk_level="low",
                confidence=0.85,
                features_used='{"heart_rate": 75}',
                recommendations="Maintain current training"
            )
            print("✓ InjuryPrediction model created")
            print(f"  Prediction repr: {prediction}")
            
            # Test to_dict methods
            user_dict = user.to_dict()
            print("✓ User to_dict() works")
            print(f"  User dict keys: {list(user_dict.keys())}")
            
            print("\n✅ All models tested successfully!")
            print("=" * 50)
            
        except Exception as e:
            print(f"❌ Model test failed: {e}")
            import traceback
            traceback.print_exc()

if __name__ == '__main__':
    test_models()