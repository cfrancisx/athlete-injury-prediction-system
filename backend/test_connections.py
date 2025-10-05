import os
import sys
from dotenv import load_dotenv

def get_version(package_name):
    """Safe version check without deprecated attributes"""
    try:
        from importlib.metadata import version
        return version(package_name)
    except:
        return "Unknown"

# Load environment variables
load_dotenv()

print("=== Testing Database Connections ===")
print(f"Flask version: {get_version('flask')}")

# Test MongoDB Connection
print("\n1. Testing MongoDB...")
try:
    from pymongo import MongoClient
    mongodb_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/athlete_sensor_data')
    print(f"MongoDB URI: {mongodb_uri}")
    
    client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
    client.server_info()
    print("✓ MongoDB connection successful!")
    
    # List databases
    dbs = client.list_database_names()
    print(f"Available databases: {dbs}")
    
except Exception as e:
    print(f"✗ MongoDB connection failed: {e}")

# Test PostgreSQL Connection
print("\n2. Testing PostgreSQL...")
try:
    import psycopg2
    database_url = os.environ.get('DATABASE_URL', 'postgresql://athlete_user:yourpassword@localhost:5432/athlete_safety_db')
    print(f"PostgreSQL URL: {database_url}")
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"✓ PostgreSQL connection successful!")
    print(f"PostgreSQL version: {db_version[0]}")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"✗ PostgreSQL connection failed: {e}")

print("\n=== Connection Tests Complete ===")