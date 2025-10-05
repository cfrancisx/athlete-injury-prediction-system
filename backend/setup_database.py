import psycopg2
from psycopg2 import sql
import getpass

def setup_database():
    print("🔧 Database Setup for Athlete Safety System")
    print("=" * 50)
    
    # Get PostgreSQL superuser password
    postgres_password = getpass.getpass("Enter PostgreSQL superuser password (default is often 'postgres'): ") or "postgres"
    
    try:
        # Connect as superuser
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            user="postgres",
            password=postgres_password,
            database="postgres"
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        print("✅ Connected to PostgreSQL successfully!")
        
        # Drop and recreate database
        print("Setting up database...")
        cursor.execute("DROP DATABASE IF EXISTS athlete_safety_db;")
        cursor.execute("CREATE DATABASE athlete_safety_db;")
        
        # Drop and recreate user
        cursor.execute("DROP USER IF EXISTS athlete_user;")
        cursor.execute("CREATE USER athlete_user WITH PASSWORD 'athlete123' SUPERUSER;")
        
        # Grant privileges
        cursor.execute("GRANT ALL PRIVILEGES ON DATABASE athlete_safety_db TO athlete_user;")
        
        print("✅ Database 'athlete_safety_db' created successfully!")
        print("✅ User 'athlete_user' created with password 'athlete123'")
        
        # Test the new user connection
        print("Testing new user connection...")
        cursor.close()
        conn.close()
        
        # Connect with new user
        test_conn = psycopg2.connect(
            host="localhost",
            port=5432,
            user="athlete_user",
            password="athlete123",
            database="athlete_safety_db"
        )
        test_cursor = test_conn.cursor()
        test_cursor.execute("SELECT version();")
        version = test_cursor.fetchone()
        print(f"✅ New user connection successful! PostgreSQL version: {version[0]}")
        
        test_cursor.close()
        test_conn.close()
        
        print("\n🎉 Database setup completed successfully!")
        print("You can now run: python init_db.py")
        
    except psycopg2.OperationalError as e:
        print(f"❌ Connection failed: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check if the password is correct")
        print("3. Try the default password 'postgres'")
        print("4. Check if PostgreSQL service is started")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    setup_database()