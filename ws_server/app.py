import aiohttp
import json
import asyncio
import threading
import copy
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room
from flask_cors import CORS


app = Flask(__name__)
# socketio = SocketIO(app)  # Allowing all origins for simplicity, replace "*" with a list of allowed origins
CORS(app, resources={r"/*": {"origins": ["http://192.168.1.9:3000", "http://192.168.1.9:8000","http://192.168.1.9:8001"]}})
socketio = SocketIO(cors_allowed_origins="*")
socketio.init_app(app)

# @app.route('/')
# def index():
#     return render_template('index.html')



# @utils.authenticate        
global_events_bucket2 = {'incoming_calls': [], 'notifications': []}

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    if room:
        join_room(room)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data.get('room')
    if room:
        leave_room(room)

async def handle_trigger_now(token,for_userid):
    #get request id
    request_d = await make_get_request_info_by_id_call(token,for_userid)
    
    me = await make_me_api_call(token)
    print('ddddo you see me now then you are learning async ??',me['id'],request_d['id'],for_userid)
    # print('heremenow',me)
    
    data = request.get_json()
    data['to_userid'] = for_userid
    data['frm_userid'] = me['id']
    data['msg'] = "hjardidsf coded msg"
    # print('here is your data', data, type(data))
    # data = json.dumps(data)
    print('areweheretoo',request_d['id'])

    # Emit the message only to the specific room (for_userid)
    socketio.emit('new_data_event', "somedata",room=str(request_d['id'])) #, room=equest_d['id'])

@app.route('/new_data_event_trigger/<for_userid>', methods=['POST'])
def handle_some_event(for_userid):
    auth_header = request.headers.get('Authorization')
    # me = await make_me_api_call('Bearer '+auth_header)
    print('dddoauth_header',auth_header)
    asyncio.run(handle_trigger_now(auth_header,for_userid))
    

    return "success", 200


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
    api_url = 'http://192.168.1.9:3000/api/me'

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


async def make_get_request_info_by_id_call(authorization_token,with_userid):
    api_url = 'http://192.168.1.9:8000/api/get_request_info_by_id/'+with_userid

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
    api_url = 'http://192.168.1.9:3000/api/fetch_online_profiles'

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
                socketio.emit('listen_global_events', json.dumps(global_events_bucket))  # Echo the message bv
                break
    
    # socketio.emit('signal_pool', json.dumps(s_pool))

global_events_bucket = {'incoming_calls':[],'notifications':[]}
@socketio.on('listen_global_events')
def handle_message(for_userid):
    # Example asynchronous API call without using a separate thread
    asyncio.run(async_emit_listen_global_events(for_userid))
    




# global_events_bucket2 = {'incoming_calls':[],'notifications':[]}
# def emit_new_data_event():
#     #we should probably update global_events_bucket with incomming call
#     # and send it to the right user room/session???
    
    
#     socketio.emit('new_data_event', json.dumps(global_events_bucket2))  # Echo the message bv
    
    #  # # first_incoming_call = None
    # cp_s_pool = copy.copy(s_pool)
    # for i in cp_s_pool:
    #     if i['responder'] == for_userid:
    #         if for_userid not in global_events_bucket['incoming_calls']:
    #             global_events_bucket['incoming_calls'].append(i)
    #             # first_incoming_call = i
    #             print('Received message @listen_global_events:')
    #             room_str = str(for_userid)
    #             join_room(room_str)
    #             print('DWOEREWFSDFC')
    #             socketio.emit('listen_global_events', json.dumps(global_events_bucket))  # Echo the message bv
    #             break
    
    # # socketio.emit('signal_pool', json.dumps(s_pool))

# @socketio.on('new_data_event')
# def handle_message(for_userid):
#     # Example asynchronous API call without using a separate thread
#     asyncio.run(async_emit_new_data_event(for_userid))
    





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
    
    
    # chats = chat_histories_schema.dump([])
    room_str = f"{me.id}_{with_user_id}"
    first, second = room_str.split('_')
    new_roo_str = f"{second}_{first}"
    if room_str not in existing_rooms and new_roo_str not in existing_rooms:
        existing_rooms.add(room_str)

    # existing_rooms.add(room_str)
    join_room(room_str)
    socketio.emit('fetch_profile_chats', json.dumps([]), room=room_str)
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




if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=8001, debug=True)
