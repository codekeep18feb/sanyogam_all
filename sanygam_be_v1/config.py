import json
import jwt
import pathlib
import time
import connexion
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO
from flask import jsonify

from flask.json import JSONEncoder
from enum import Enum


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.value
        return super().default(obj)
    
JWT_ISSUER = "com.zalando.connexion"
JWT_SECRET = "change_this"
JWT_LIFETIME_SECONDS = 6000000
JWT_ALGORITHM = "HS256"


def generate_token(data):
    timestamp = _current_timestamp()
    payload = {
        "iss": JWT_ISSUER,
        "iat": int(timestamp),
        "exp": int(timestamp + JWT_LIFETIME_SECONDS),
        "sub": json.dumps(data),
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except Exception as e:
        raise e

def get_secret(user, token_info) -> str:
    return """
    You are user_id {user} and the secret is 'wbevuec'.
    Decoded token claims: {token_info}.
    """.format(
        user=user, token_info=token_info
    )


def _current_timestamp() -> int:
    return int(time.time())


basedir = pathlib.Path(__file__).parent.resolve()
print("AMICORRECT ? basedir", basedir)
connex_app = connexion.App(__name__, specification_dir=basedir)
# CORS(connex_app.app, resources={r"/api/*": {"origins": "http://192.168.1.13:3000"}})
CORS(connex_app.app, resources={r"/api/*": {"origins": ["http://192.168.1.13:3000", "http://192.168.1.13:8000"]}})

# Attach SocketIO to the Flask app
socketio = SocketIO(cors_allowed_origins="*")
socketio.init_app(connex_app.app)

# ... (other configurations)
import logging
logging.basicConfig(level=logging.DEBUG)

app = connex_app.app
app.json_encoder = CustomJSONEncoder

@app.errorhandler(Exception)
def handle_exception(error):
    logging.exception("An unexpected error occurred caught by Central Exception handler")

    response = {
        'error': str(error),
        'message': 'An unexpected error occurred caught by Centeral Exception handler',
    }
    return jsonify(response), 500

# app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir / 'sgam.db'}"
# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://developerRole:Django@321!@localhost/sgam"
from urllib.parse import quote

# Original password with special characters
password = "Django@321!"

# URL-encode the password
encoded_password = quote(password, safe="")
# app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://developerRole:{encoded_password}@localhost/sgam"
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir / 'sgam.db'}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
# jwt = JWTManager(app)
