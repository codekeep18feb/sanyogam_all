import copy

import asyncio
import threading


import aiohttp
from flask import render_template,abort,jsonify # Remove: import Flask
# import config

from datetime import datetime
from models import User, Profile,ProfileSchema, chat_histories_schema, profiles_schema, ChatHistory
from sqlalchemy import or_, and_

import json
from flask_migrate import Migrate
# from handlers.users import read_all
# from flask_socketio import SocketIO, emit  # Import SocketIO
from flask_socketio import SocketIO, join_room, disconnect
from flask import request
from handlers.profiles import handle_filtering

from config import app, db,decode_token, socketio, connex_app,basedir  # Assuming your Flask app instance is named 'app'
migrate = Migrate(app, db)
from common.utils import DictWithDotAccess
# from utils  import DictWithDotAccess
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



s_pool = []

async def make_me_api_call(authorization_token):
    api_url = 'http://192.168.1.13:3000/api/me'

    headers = {
        'Authorization': f'{authorization_token}',
        'Content-Type': 'application/json',  # Adjust content type if needed
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.get(api_url, headers=headers) as response:
            # Assuming the API returns JSON data
            api_data = await response.json()
            print("api_dafasdfta",api_data)

    return api_data



async def make_all_profiles_api_call(authorization_token, request_data):
    api_url = 'http://192.168.1.13:3000/api/fetch_online_profiles'

    headers = {
        'Authorization': f'{authorization_token}',
        'Content-Type': 'application/json',  # Adjust content type if needed
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(api_url, headers=headers, json=request_data) as response:
            # Assuming the API returns JSON data
            api_data = await response.json()
            print("api_dafasdfta",api_data)

    return api_data




class DictWithDotAccess:
    def __init__(self, dictionary):
        self.dictionary = dictionary

    def __getattr__(self, key):
        if key in self.dictionary:
            return self.dictionary[key]
        else:
            raise AttributeError(f"'DictWithDotAccess' object has no attribute '{key}'")

async def async_emit_signal_pool(auth_token, message, with_userid):
    # Placeholder for any async operation
    api_result = await make_me_api_call(auth_token)
    print('api_rdfsfesult',api_result)

    me =  DictWithDotAccess(api_result)
    
    if message:
        print("COPY MESSAGE", message, type(message))
        p_payload = json.loads(message)
        print('prepared p_payload', p_payload, type(p_payload), with_userid)
        if "action" in p_payload:
            action = p_payload.pop("action", 'ADD')
            initator_room_str = f"{with_userid}_{me.id}"
            p_payload['id'] = initator_room_str
            if action == 'ADD':
                payload = {
                    'sdp': p_payload['sdp'],
                    'answer': None,
                    'initiator': me.id,
                    'responder': with_userid,
                    'id': p_payload['id']
                }
                print('prepared payload', payload)
                s_pool.append(payload)

            elif action == 'UPDATE':
                print('mark1noww')
                resp_room_str = f"{me.id}_{with_userid}"
                p_payload['id'] = resp_room_str

                payload = {
                    'answer': p_payload['answer'],
                    'id': p_payload['id']
                }

                for obj in s_pool:
                    if obj['id'] == p_payload['id']:
                        print('adfasdf we here')
                        obj['answer'] = p_payload['answer']
                        break

            elif action == 'DELETE':
                payload = {
                    'id': p_payload['id']
                }
                for ind, obj in enumerate(s_pool):
                    if obj['id'] == p_payload['id']:
                        deleted_element = s_pool.pop(ind)
                        print('rip', deleted_element)
                        break

                print('payload id to delete', payload)

        print('WERERER1')
        print('WERERER2')

    print('now are we here', s_pool)

    # Emit the updated signal_pool to connected clients
    socketio.emit('signal_pool', json.dumps(s_pool))

@socketio.on('signal_pool')
def handle_message(message, with_userid):
    print('API Call Result: arere??')

    # Extract auth_token from the request
    auth_token = request.args.get('Authorization')

    # Example asynchronous API call without using a separate thread
    asyncio.run(async_emit_signal_pool(auth_token, message, with_userid))
    


async def async_emit_listen_global_events(for_userid):
     # # first_incoming_call = None
    cp_s_pool = copy.copy(s_pool)
    for i in cp_s_pool:
        if i['responder'] == for_userid:
            if for_userid not in global_events_bucket['incoming_calls']:
                global_events_bucket['incoming_calls'].append(i)
                # first_incoming_call = i
                print('Received message @listen_global_events:')
                room_str = str(for_userid)
                join_room(room_str)
                print('DWOEREWFSDFC')
                socketio.emit('listen_global_events', json.dumps(global_events_bucket),room=room_str)  # Echo the message bv
                break
    
    socketio.emit('signal_pool', json.dumps(s_pool))

global_events_bucket = {'incoming_calls':[],'notifications':[]}
@socketio.on('listen_global_events')
def handle_message(for_userid):
    # Example asynchronous API call without using a separate thread
    asyncio.run(async_emit_listen_global_events(for_userid))
    




async def async_emit_fetch_online_profiles(*args):
    message = 'merersg'
    auth_token = request.args.get('Authorization')
    
    # print('Received payload for fetch_online_profiles:', auth_token)
    
    
    #********************IDEA IS SIMPLE*************
    #Let's return the same we used to respective apis
    #handlers.profiles.all_profiles
    #infact use the same code if possible
    # auth_token = request.headers.get("Authorization")
    # auth_token = request.args.get('Authorization')
    if not auth_token:
        print('MARK1')
        return "Unauthorized", 401
    
    # print("auth_token",auth_token)
    
    # scheme, token = auth_token.split('Bearer ')    
    # decoded = decode_token(token)
    # decoded_data_str = decoded['sub']
    # print('MARK2')
    
    # json_dec_data = json.loads(decoded_data_str)
    # print('MARK3')
    # me = User.query.filter_by(email=json_dec_data['email']).first()

    api_result = await make_all_profiles_api_call(auth_token,{
        "family_info": {}
        })
    print('fghsdfasdfasdgjhgfyghjgh',api_result)

    # me =  DictWithDotAccess(api_result)
    
    # print('ME.PROFILE',me.profile)
    
    # all_profiles_query = Profile.query
    # print('MARK4')
    # all_profiles_data = handle_filtering(all_profiles_query,
        # {
        # "family_info": {}
        # },
    #     me.profile.id)
    # print('MARK5')
    
    # fres = profiles_schema.dump(api_result)
    
    print('RESUSLT:sdfsadfsd ',api_result)
    # return fres
    socketio.emit('fetch_online_profiles', json.dumps(api_result))

@socketio.on('fetch_online_profiles')
def handle_message(*args):
    auth_token = request.args.get('Authorization')
    print('dfasdf',auth_token)
    asyncio.run(async_emit_fetch_online_profiles(*args))
    

async def async_emit_fetch_profile_chats(*args):
    auth_token = request.args.get('Authorization')
    
    with_user_id = args[0]
    message = 'merersg'
    
    api_result = await make_me_api_call(auth_token)
    me =  DictWithDotAccess(api_result)
    
    
    chats = chat_histories_schema.dump([])
    room_str = f"{me.id}_{with_user_id}"
    first, second = room_str.split('_')
    new_roo_str = f"{second}_{first}"
    if room_str not in existing_rooms and new_roo_str not in existing_rooms:
        existing_rooms.add(room_str)

    # existing_rooms.add(room_str)
    join_room(room_str)
    socketio.emit('fetch_profile_chats', json.dumps(chats), room=room_str)
    # socketio.emit('fetch_profile_chats', chat_histories_schema.dump(all_cha





# Set to store existing rooms
existing_rooms = set()

@socketio.on('fetch_profile_chats')
def handle_message(*args):
    # with_user_id = args[0]
    # message = 'merersg'
    
    
    
    # chats = chat_histories_schema.dump([])
    # room_str = f"{me.id}_{with_user_id}"
    # first, second = room_str.split('_')
    # new_roo_str = f"{second}_{first}"
    # if room_str not in existing_rooms and new_roo_str not in existing_rooms:
    #     existing_rooms.add(room_str)

    # # existing_rooms.add(room_str)
    # join_room(room_str)
    # socketio.emit('fetch_profile_chats', json.dumps(chats), room=room_str)
    # # socketio.emit('fetch_profile_chats', chat_histories_schema.dump(all_chats))
    auth_token = request.headers.get("Authorization")
    # print('DWOEASDFASDF',auth_token)
    asyncio.run(async_emit_fetch_profile_chats(*args))





 


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



#  to store existing rooms
# existing_rooms = set()

# @socketio.on('fetch_profile_chats')
# def handle_message(*args):
#     with_user_id = args[0]
#     message = 'merersg'
    
    
#     #********************IDEA IS SIMPLE*************
#     #Let's return the same we used to respective apis
#     #handlers.profiles.all_profiles
#     #infact use the same code if possible
#     # auth_token = request.headers.get("Authorization")
#     # auth_token = request.args.get('Authorization')
#     # if not auth_token:
#     #     print('MARKDSFSDF1')
#     #     return "Unauthorized", 401
    
#     # print("auth_token",auth_token)
    
#     # scheme, token = auth_token.split('Bearer ')    
#     # decoded = decode_token(token)
#     # decoded_data_str = decoded['sub']
#     # print('MARK2')
    
#     # json_dec_data = json.loads(decoded_data_str)
#     # print('MARK3')
#     # me = User.query.filter_by(email=json_dec_data['email']).first()

#     # print('ME.PROFILE',me.profile)
#     # print('Received chat msgsfdssdf:', with_user_id,me.id)
#     # # query = ChatHistory.query
#     # # all_chats = query.filter(
#     # #     (ChatHistory.frm_user_id == me.id)
#     # # )

#     # # all_chats = ChatHistory.query.filter(
#     # #     (ChatHistory.frm_user_id == me.id)
#     # # )
    
#     # all_chats = ChatHistory.query.filter(
#     #     and_(
#     #         or_(ChatHistory.frm_user_id == me.id, ChatHistory.to_user_id == me.id),
#     #         or_(ChatHistory.frm_user_id == with_user_id, ChatHistory.to_user_id == with_user_id),
#     #     )
#     #     )

#     # all_chats = all_chats.all()

#     # print('MARK4afasdf',all_chats)
#     # all_profiles_data = handle_filtering(all_profiles_query,
#     #     {
#     #     "family_info": {}
#     #     },
#     #     me.profile.id)
#     # print('MARK5')
    
#     chats = chat_histories_schema.dump([])
#     room_str = f"{me.id}_{with_user_id}"
#     first, second = room_str.split('_')
#     new_roo_str = f"{second}_{first}"
#     if room_str not in existing_rooms and new_roo_str not in existing_rooms:
#         existing_rooms.add(room_str)

#     # existing_rooms.add(room_str)
#     join_room(room_str)
#     socketio.emit('fetch_profile_chats', json.dumps(chats), room=room_str)
#     # socketio.emit('fetch_profile_chats', chat_histories_schema.dump(all_chats))

