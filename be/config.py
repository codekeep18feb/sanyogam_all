import json
import pathlib
import time
import connexion
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS




basedir = pathlib.Path(__file__).parent.resolve()
print("AMICORRECT ? basedir",basedir)
connex_app = connexion.App(__name__, specification_dir=basedir)
# Initialize CORS to allow requests from http://localhost:3000
# CORS(connex_app.app)
CORS(connex_app.app, resources={r"/api/*": {"origins": "http://localhost:3000"}})




@connex_app.app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response



app = connex_app.app
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir / 'sgam.db'}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Add JWT configuration
# app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Replace with your secret key
# jwt = JWTManager(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)


