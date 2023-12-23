from flask import render_template,abort,jsonify # Remove: import Flask
# import config
from datetime import datetime

import json
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

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    socketio.emit('message', message)  # Echo the message b
# rtc_pool = {}


# @socketio.on('write_rtc_pool')
# def handle_message(message):
#     print('Received message:', message)
#     # let's just send them a msg

#     now = datetime.now()
#     timestamp_str = now.strftime("%Y-%m-%d %H:%M:%S")
#     print("Current timestamp:", timestamp_str)
#     entry = json.loads(message)
#     print('here is entry',entry)
#     if not rtc_pool:
#         print("Initiator case")
#         sdp_s = entry['sdp']
#         sdp = json.loads(sdp_s)
#         if sdp['type']=='offer':
#             rtc_pool['sdp'] = sdp['sdp']
#             rtc_pool['answer'] = None
#             # rtc_pool.update(entry)
#             rtc_pool.update({"id":1})
#     else:
#         print("Responder case - updating answer",entry)
#         sdp_s = entry['sdp']
#         print("Mark1")
#         sdp = json.loads(sdp_s)
#         print("Mark2")
        
#         if sdp['type']=='answer':
#             print("Responder dffds herer")

#             rtc_pool['answer'] = sdp['sdp']
#     print('RTCPOOLNOw',rtc_pool)
#     emit('message', json.dumps(rtc_pool))



# @socketio.on('ping')
# def handle_ping(message):
#     print('Received message on ping:', message)
#     emit('ping', {})


# @socketio.on('message')
# def handle_message(message):
#     print('Received message:', message)
    
#     now = datetime.now()
#     timestamp_str = now.strftime("%Y-%m-%d %H:%M:%S")
#     print("Current timestamp:", timestamp_str)

#     if not rtc_pool:
#         print("Initiator case")
#         entry = {"initiator": 1, "id": 1, "sdp": message, "timestamp": timestamp_str, "answer": None}
#         rtc_pool.update(entry)
#     elif rtc_pool and rtc_pool['answer'] is None:
#         print("Responder case - updating answer")
#         rtc_pool['answer'] = message

#     emit('message', json.dumps(rtc_pool))  # Echo the message back to all clients

# ...

# connex_app = connex_app
connex_app.add_api(basedir / "swagger.yml")


if __name__ == "__main__":
    # connex_app.run(host="0.0.0.0", port=8000, debug=True)
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
