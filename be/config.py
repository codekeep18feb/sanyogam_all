import json
import jwt
import pathlib
import time
import connexion
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required
from flask_cors import CORS

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
print("AMICORRECT ? basedir",basedir)
connex_app = connexion.App(__name__, specification_dir=basedir)
# Initialize CORS to allow requests from http://localhost:3000
# CORS(connex_app.app)
CORS(connex_app.app, resources={r"/*": {"origins": "*"}})




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


