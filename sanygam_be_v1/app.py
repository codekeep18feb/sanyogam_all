from flask import render_template,abort,jsonify # Remove: import Flask
# import config
from datetime import datetime
from models import User
from sqlalchemy import or_, and_

import json
from flask_migrate import Migrate
# from handlers.users import read_all
# from flask_socketio import SocketIO, emit  # Import SocketIO
from flask_socketio import SocketIO, join_room, disconnect
from flask import request
# from handlers.profiles import handle_filtering

from config import app, db,decode_token, socketio, connex_app,basedir  # Assuming your Flask app instance is named 'app'
migrate = Migrate(app, db)
# socketio = SocketIO(app)  # Initialize SocketIO


# connex_app = connex_app
connex_app.add_api(basedir / "swagger.yml")


if __name__ == "__main__":
    # connex_app.run(host="0.0.0.0", port=8000, debug=True)
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
