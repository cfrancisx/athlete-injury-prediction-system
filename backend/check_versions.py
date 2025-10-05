def get_package_version(package_name):
    """Get package version without deprecated attributes"""
    try:
        # Modern way (Python 3.8+)
        from importlib.metadata import version
        return version(package_name)
    except ImportError:
        try:
            # Fallback for older Python versions
            import pkg_resources
            return pkg_resources.get_distribution(package_name).version
        except:
            # Final fallback
            try:
                module = __import__(package_name)
                return getattr(module, '__version__', 'Unknown')
            except:
                return 'Not installed'

def check_all_versions():
    packages = [
        'flask',
        'flask_sqlalchemy',
        'flask_jwt_extended', 
        'flask_cors',
        'flask_migrate',
        'flask_pymongo',
        'pandas',
        'numpy',
        'scikit-learn',
        'xgboost',
        'pymongo',
        'psycopg2'
    ]
    
    print("Package Versions:")
    print("-" * 40)
    
    for package in packages:
        version = get_package_version(package)
        print(f"{package:20} {version}")
    
    print("-" * 40)

if __name__ == '__main__':
    check_all_versions()