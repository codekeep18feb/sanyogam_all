import sqlite3
import json
from datetime import datetime
from flask import Flask, request, abort ,jsonify
from config import db, generate_token
from config import db, decode_token

from models import User, users_schema, user_schema, UserSchema,Profile,ChatHistory,RTCUserInfo
from models import UserRequests,UserRequestsSchema,ChatHistorySchema, RTCUserInfoSchema
def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def rtc_user_info_by_id(with_id):
    # print("here is id",id)

    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    print("ahmersp",me.id)

    rtc_info = RTCUserInfo.query.filter_by(frm_user=me.id,to_user=with_id).first() or RTCUserInfo.query.filter_by(frm_user=with_id,to_user=me.id).first() 
    rtc_usr_schema = RTCUserInfoSchema()
    return rtc_usr_schema.dump(rtc_info)


def get_my_rtc_offer():
    # print("here is id",id)

    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    print("ahmersp",me.id)

    rtc_info = RTCUserInfo.query.filter_by(to_user=me.id).first()
    rtc_usr_schema = RTCUserInfoSchema()
    return rtc_usr_schema.dump(rtc_info)


def del_rtc_user():
    # print("here is id",id)

    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    rtc_info = RTCUserInfo.query.filter_by(frm_user=me.id).first()
    # rtc_usr_schema = RTCUserInfoSchema()
    # return rtc_usr_schema.dump(rtc_info)
    if rtc_info:
        # Delete the RTCUserInfo from the database
        db.session.delete(rtc_info)
        db.session.commit()
        return "User deleted successfully", 200
    else:
        return "User not found or unauthorized to delete", 404

def add_rtc_user(payload):
    print("here is id", payload)

    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    print("me",me)
    # Check if an RTCUserInfo entry already exists for the given frm_user
    if payload['initiator']:
        existing_request = RTCUserInfo.query.filter_by(frm_user=me.id,to_user=payload["to_user"]).first()
        if existing_request:
            # Update the existing entry's sdp
            existing_request.sdp = payload["sdp"]
            db.session.add(existing_request)
            db.session.commit()
        else:
            # Create a new RTCUserInfo entry
            new_request = RTCUserInfo(frm_user=me.id, sdp=payload["sdp"], initiator=payload["initiator"],to_user=payload["to_user"])
            db.session.add(new_request)
            db.session.commit()

        return {
            "message": "RTCUserInfo updated or created successfully"
        }, 201

    else:
        existing_request = RTCUserInfo.query.filter_by(to_user=me.id,frm_user=payload["to_user"]).first()
        if existing_request:
            # Update the existing entry's sdp
            existing_request.answer = payload["sdp"]
            # db.session.add(new_request)
            # db.session.commit()
        else:
            # Create a new RTCUserInfo entry
            new_request = RTCUserInfo(frm_user=me.id, answer=payload["sdp"], initiator=payload["initiator"],to_user=payload["to_user"])
            db.session.add(new_request)
        db.session.commit()

        return {
            "message": "RTCUserInfo updated or created successfully"
        }, 201
    
# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
# def send_msg(payload,to_email):
#     # current_user = get_jwt_identity()
#     # wondering if we can put a decorator here????
#     print("payloadchat",payload,to_email)

#     auth_token = request.headers.get("Authorization")
#     print("auth_token",auth_token)
#     if not auth_token:
        
#         return "Unauthorized", 401
    
    
#     scheme, token = auth_token.split('Bearer ')    
#     decoded = decode_token(token)
#     decoded_data_str = decoded['sub']
#     json_dec_data = json.loads(decoded_data_str)
#     frm_user = User.query.filter_by(email=json_dec_data['email']).first()
#     to_user =  User.query.filter_by(email=to_email).first()
#     # existing_req = UserRequests.query.all()[0]# or UserRequests.query.filter_by(to_user=to_user.id).first() ##(frm_user=to_user.id)
#     # existing_req1 = UserRequests.query.filter_by(to_user=to_user.id).first()# or UserRequests.query.filter_by(to_user=to_user.id).first() ##(frm_user=to_user.id)
#     existing_req = UserRequests.query.filter_by(to_user=frm_user.id).first() or UserRequests.query.filter_by(to_user=to_user.id).first()

#     if not existing_req:
#         abort(400, f"no request exist {existing_req}")


#     print("to_user_request",existing_req.status)
#     if not existing_req.status=='ACCEPTED':
#         abort(400, f"request status {existing_req.status}")
#     elif existing_req.status=='ACCEPTED':
#         print("frm_user",frm_user,"to_user",to_user)
#         # print("here sicontent",content)
#         new_chat = ChatHistory(content=payload['content'],frm_user=frm_user.id,to_user=to_user.id)
#         print("new_chat",new_chat)
#         db.session.add(new_chat)
#         db.session.commit()
#     else:
#         abort(500, f"internal server error")


#     # person_dict = {
#     #     "id": profile.id,
#     #     "gender": profile.gender,
#     #     "fname" : profile.user.fname,
#     #     "lname" : profile.user.lname
#     # }

#     # uploaded_file = request.files.get("image")
#     # if uploaded_file:
#     #     print(f'Uploaded File:: {uploaded_file}')

        
#     return "sent now"
#     # else:
#     #     abort(404, f"Profile with id {id} not found")



# def request_info(with_email):
#     print("with_email",with_email)
#     auth_token = request.headers.get("Authorization")
#     print("auth_token",auth_token)
#     if not auth_token:
#         return "Unauthorized", 401
    
#     scheme, token = auth_token.split('Bearer ')    
#     decoded = decode_token(token)
#     decoded_data_str = decoded['sub']
#     json_dec_data = json.loads(decoded_data_str)
#     frm_user = User.query.filter_by(email=json_dec_data['email']).first()
#     to_user =  User.query.filter_by(email=with_email).first()
#     existing_req = UserRequests.query.filter_by(to_user=frm_user.id).first() or UserRequests.query.filter_by(to_user=to_user.id).first()

#     if not existing_req:
#         abort(400, f"no request exist {existing_req}")


#     print("to_user_request",existing_req.status)
#     if existing_req:
#         return {"status":existing_req.status}

#     else:
#         abort(500, f"internal server error")


#     # person_dict = {
#     #     "id": profile.id,
#     #     "gender": profile.gender,
#     #     "fname" : profile.user.fname,
#     #     "lname" : profile.user.lname
#     # }

#     # uploaded_file = request.files.get("image")
#     # if uploaded_file:
#     #     print(f'Uploaded File:: {uploaded_file}')

        
#     # return "sent now"
#     # else:
#     #     abort(404, f"Profile with id {id} not found")
