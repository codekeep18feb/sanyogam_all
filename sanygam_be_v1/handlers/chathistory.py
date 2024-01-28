import sqlite3
import json
from datetime import datetime
from flask import Flask, request, abort ,jsonify
from config import db, generate_token
from config import db, decode_token
# from .common import utils
from sqlalchemy import or_, and_

from models import OnlineStatusEnum, User, users_schema, user_schema, UserSchema,Profile,ChatHistory
from models import chat_histories_schema, UserRequests,UserRequestsSchema,ChatHistorySchema

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

# @utils.authenticate
def chathistory(with_email):
    print("with_email",with_email)
    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    
    chats = ChatHistory.query.all()
    
    return chat_histories_schema.dump(chats)


# @utils.authenticate
def chathistory2(with_user_id): # ws handler's code was transferred here...
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
    print('Received chat msgsfdssdf:', with_user_id,me.id)
    # query = ChatHistory.query
    # all_chats = query.filter(
    #     (ChatHistory.frm_user_id == me.id)
    # )

    # all_chats = ChatHistory.query.filter(
    #     (ChatHistory.frm_user_id == me.id)
    # )
    
    all_chats = ChatHistory.query.filter(
        and_(
            or_(ChatHistory.frm_user_id == me.id, ChatHistory.to_user_id == me.id),
            or_(ChatHistory.frm_user_id == with_user_id, ChatHistory.to_user_id == with_user_id),
        )
        )

    all_chats = all_chats.all()

    print('MARK4afasdf',all_chats)
    return chat_histories_schema.dump(all_chats)






# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
def send_msg(payload,to_userid):
    # current_user = get_jwt_identity()
    # wondering if we can put a decorator here????
    print("payloadchat",payload,to_userid)

    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        
        return "Unauthorized", 401
    
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    frm_user = User.query.filter_by(email=json_dec_data['email']).first()
    to_user =  User.query.filter_by(id=to_userid).first()
    print('HOPE THI SI SALL ARIGHT',to_user)
    # existing_req = UserRequests.query.all()[0]# or UserRequests.query.filter_by(to_user=to_user.id).first() ##(frm_user=to_user.id)
    # existing_req1 = UserRequests.query.filter_by(to_user=to_user.id).first()# or UserRequests.query.filter_by(to_user=to_user.id).first() ##(frm_user=to_user.id)
    existing_req = UserRequests.query.filter_by(to_user=frm_user.id).first() or UserRequests.query.filter_by(to_user=to_user.id).first()

    if not existing_req:
        abort(400, f"no request exist {existing_req}")


    print("to_user_request",existing_req.status)
    if not existing_req.status==OnlineStatusEnum.ACCEPTED:
        abort(400, f"request status {existing_req.status}")
    elif existing_req.status==OnlineStatusEnum.ACCEPTED:
        print("frm_user",frm_user,"to_user",to_user)
        # print("here sicontent",content)
        new_chat = ChatHistory(msg=payload['msg'],
                               frm_user_id=frm_user.id,to_user_id=to_user.id)
        print("new_chat",new_chat)
        db.session.add(new_chat)
        db.session.commit()
    else:
        abort(500, f"internal server error")


    # person_dict = {
    #     "id": profile.id,
    #     "gender": profile.gender,
    #     "fname" : profile.user.fname,
    #     "lname" : profile.user.lname
    # }

    # uploaded_file = request.files.get("image")
    # if uploaded_file:
    #     print(f'Uploaded File:: {uploaded_file}')

        
    return "sent now"
    # else:
    #     abort(404, f"Profile with id {id} not found")



def request_info(with_email):
    print("with_email",with_email)
    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        return "Unauthorized", 401
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    frm_user = User.query.filter_by(email=json_dec_data['email']).first()
    to_user =  User.query.filter_by(email=with_email).first()
    existing_req = UserRequests.query.filter_by(to_user=frm_user.id).first() or UserRequests.query.filter_by(to_user=to_user.id).first()

    if not existing_req:
        abort(400, f"no request exist {existing_req}")


    print("to_user_request",existing_req.status)
    if existing_req:
        return {"status":existing_req.status}

    else:
        abort(500, f"internal server error")


    # person_dict = {
    #     "id": profile.id,
    #     "gender": profile.gender,
    #     "fname" : profile.user.fname,
    #     "lname" : profile.user.lname
    # }

    # uploaded_file = request.files.get("image")
    # if uploaded_file:
    #     print(f'Uploaded File:: {uploaded_file}')

        
    # return "sent now"
    # else:
    #     abort(404, f"Profile with id {id} not found")
