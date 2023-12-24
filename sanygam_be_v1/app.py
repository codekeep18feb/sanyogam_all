from flask import render_template,abort,jsonify # Remove: import Flask
# import config
from datetime import datetime
from models import User, Profile,ProfileSchema, chat_histories_schema, profiles_schema, ChatHistory

import json
from flask_migrate import Migrate
# from handlers.users import read_all
# from flask_socketio import SocketIO, emit  # Import SocketIO
from flask_socketio import SocketIO, join_room, disconnect
from flask import request
from handlers.profiles import handle_filtering

from config import app, db,decode_token, socketio, connex_app,basedir  # Assuming your Flask app instance is named 'app'
migrate = Migrate(app, db)
# socketio = SocketIO(app)  # Initialize SocketIO

# # ... existing code ...
@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('custom_event')
def handle_message(*args):
    # token = request.args.get('token')
    print(dir(args),'sadfsda')
    message = args.message
    print('tokendsfds',message)
    # if not token:
    #     disconnect()
    #     return
    # print('Client connected:', request.sid)
    print('Received message custom_event:', message)
    socketio.emit('custom_event', message)  # Echo the message b



@socketio.on('fetch_online_profiles')
def handle_message(*args):
    message = 'merersg'
    print('Received payload for fetch_online_profiles:', message,args,request.sid)
    
    
    #********************IDEA IS SIMPLE*************
    #Let's return the same we used to respective apis
    #handlers.profiles.all_profiles
    #infact use the same code if possible
    # auth_token = request.headers.get("Authorization")
    auth_token = request.args.get('Authorization')
    if not auth_token:
        print('MARK1')
        return "Unauthorized", 401
    
    print("auth_token",auth_token)
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    print('MARK2')
    
    json_dec_data = json.loads(decoded_data_str)
    print('MARK3')
    me = User.query.filter_by(email=json_dec_data['email']).first()

    print('ME.PROFILE',me.profile)
    
    all_profiles_query = Profile.query
    print('MARK4')
    all_profiles_data = handle_filtering(all_profiles_query,
        {
        "family_info": {}
        },
        me.profile.id)
    print('MARK5')
    
    fres = profiles_schema.dump(all_profiles_data)
    
    print('RESUSLT: ',fres)
    # return fres
    socketio.emit('fetch_online_profiles', json.dumps(fres))



    
    # token = request.args.get('token')
    # print('tokendsfds',token)
    # # socketio.emit('message', message+"hd")  # Echo the message b

    # print('Here lets mdsfsake THE DB CALLS', message,request.sid)
    # scheme, token = token.split('Bearer ')    
    # decoded = decode_token(token)
    # print('makr 2')
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
    # print('HEREmydsfprofile',me.profile)
    
    # # profile = Profile.query.filter_by(user_id=me.id)
    # if me.profile:
    #     print('makr 3')
    #     profile_schema = ProfileSchema()
    #     return profile_schema.dump(me.profile)   
    # socketio.emit('fetch_online_profiles', message)



@socketio.on('fetch_profile_chats')
def handle_message(*args):
    message = 'merersg'
    print('Received chat msg:', message,args,request.sid,dir(args))
    
    
    #********************IDEA IS SIMPLE*************
    #Let's return the same we used to respective apis
    #handlers.profiles.all_profiles
    #infact use the same code if possible
    # auth_token = request.headers.get("Authorization")
    auth_token = request.args.get('Authorization')
    if not auth_token:
        print('MARKDSFSDF1')
        return "Unauthorized", 401
    
    print("auth_token",auth_token)
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    print('MARK2')
    
    json_dec_data = json.loads(decoded_data_str)
    print('MARK3')
    me = User.query.filter_by(email=json_dec_data['email']).first()

    print('ME.PROFILE',me.profile)
    
    all_chats = ChatHistory.query.all()
    print('MARK4')
    # all_profiles_data = handle_filtering(all_profiles_query,
    #     {
    #     "family_info": {}
    #     },
    #     me.profile.id)
    # print('MARK5')
    
    chats = chat_histories_schema.dump(all_chats)
    
    print('RESUSLdT: ',chats)
    # return fres
    socketio.emit('fetch_profile_chats', json.dumps(chats))
    # socketio.emit('fetch_profile_chats', chat_histories_schema.dump(all_chats))



 


@socketio.on('message')
def handle_message(message):
    # print('Received message message token:', message)
    # token = request.args.get('token')
    # print('tokendsfds',token)
    # # socketio.emit('message', message+"hd")  # Echo the message b

    # print('Here lets mdsfsake THE DB CALLS', message,request.sid)
    # scheme, token = token.split('Bearer ')    
    # decoded = decode_token(token)
    # print('makr 2')
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
    # print('HEREmydsfprofile',me.profile)
    
    # # profile = Profile.query.filter_by(user_id=me.id)
    # if me.profile:
    #     print('makr 3')
    #     profile_schema = ProfileSchema()
    #     return profile_schema.dump(me.profile)
    print('got message')   
    socketio.emit('message', message)


# ...

# connex_app = connex_app
connex_app.add_api(basedir / "swagger.yml")


if __name__ == "__main__":
    # connex_app.run(host="0.0.0.0", port=8000, debug=True)
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
