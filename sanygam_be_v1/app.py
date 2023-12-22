from flask import render_template,abort,jsonify # Remove: import Flask
# import config
from flask_migrate import Migrate
# from handlers.users import read_all
from flask_socketio import SocketIO, emit  # Import SocketIO

from config import app, db, socketio, connex_app,basedir  # Assuming your Flask app instance is named 'app'
migrate = Migrate(app, db)
# socketio = SocketIO(app)  # Initialize SocketIO

# # ... existing code ...
@app.route('/')
def index():
    return render_template('index.html')

# @socketio.on('message')
# def handle_message(message):
#     print('Received message:', message)
#     socketio.emit('message', message)  # Echo the message b

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    emit('message', message)  # Echo the message back to all clients

# ...

# connex_app = connex_app
connex_app.add_api(basedir / "swagger.yml")


if __name__ == "__main__":
    # connex_app.run(host="0.0.0.0", port=8000, debug=True)
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
