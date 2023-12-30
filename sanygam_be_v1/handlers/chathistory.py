import sqlite3
import json
from datetime import datetime
from flask import Flask, request, abort ,jsonify
from config import db, generate_token
from config import db, decode_token

from models import MyEnum, User, users_schema, user_schema, UserSchema,Profile,ChatHistory
from models import chat_histories_schema, UserRequests,UserRequestsSchema,ChatHistorySchema
def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))



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
    # # chat_history_schema = ChatHistorySchema(many=True)
    # # return chat_history_schema.dump(chats)
    #     # Create a list to store the chat history with the "who" field
    # chat_history_with_who = []

    # for chat in chats:
    #     chat_dict = {
    #         "content": chat.content,
    #         "id": chat.id,
    #         "timestamp": chat.timestamp
    #     }

    #     # Add the "who" field based on the comparison
    #     if me.email == chat.act_frm_user.email:
    #         chat_dict["who"] = "ME"
    #     else:
    #         chat_dict["who"] = "OTHER"

    #     chat_history_with_who.append(chat_dict)

    # return jsonify(chat_history_with_who) 
    return chat_histories_schema.dump(chats)





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
    if not existing_req.status==MyEnum.ACCEPTED:
        abort(400, f"request status {existing_req.status}")
    elif existing_req.status==MyEnum.ACCEPTED:
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
