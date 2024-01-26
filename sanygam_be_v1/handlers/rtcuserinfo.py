import sqlite3
import json
from datetime import datetime
from flask import Flask, request, abort ,jsonify
from config import db, generate_token
from config import db, decode_token
from .common import utils

from models import User, users_schema, user_schema, UserSchema,Profile,ChatHistory,RTCUserInfo
from models import UserRequests,UserRequestsSchema,ChatHistorySchema, RTCUserInfoSchema
def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

@utils.authenticate        
def rtc_user_info_by_id(with_id, **kwargs):
    me = kwargs.get('me')
    # print("here is id",id)

    # auth_token = request.headers.get("Authorization")
    # if not auth_token:
    #     return "Unauthorized", 401

    # scheme, token = auth_token.split('Bearer ')    
    # decoded = decode_token(token)
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
    print("ahmersp",me.id)

    rtc_info = RTCUserInfo.query.filter_by(frm_user=me.id,to_user=with_id).first() or RTCUserInfo.query.filter_by(frm_user=with_id,to_user=me.id).first() 
    rtc_usr_schema = RTCUserInfoSchema()
    return rtc_usr_schema.dump(rtc_info)

@utils.authenticate        
def get_my_rtc_offer(**kwargs):
    me = kwargs.get('me')
    # print("here is id",id)

    # auth_token = request.headers.get("Authorization")
    # if not auth_token:
    #     return "Unauthorized", 401

    # scheme, token = auth_token.split('Bearer ')    
    # decoded = decode_token(token)
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
    print("ahmersp",me.id)

    rtc_info = RTCUserInfo.query.filter_by(to_user=me.id).first()
    rtc_usr_schema = RTCUserInfoSchema()
    return rtc_usr_schema.dump(rtc_info)

@utils.authenticate        
def del_rtc_entry(id, **kwargs):
    me = kwargs.get('me')
    # print("here is id",id)

    # auth_token = request.headers.get("Authorization")
    # if not auth_token:
    #     return "Unauthorized", 401

    # scheme, token = auth_token.split('Bearer ')    
    # decoded = decode_token(token)
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
    rtc_info = RTCUserInfo.query.filter_by(id=id).first()
    # rtc_usr_schema = RTCUserInfoSchema()
    # return rtc_usr_schema.dump(rtc_info)
    if rtc_info:
        # Delete the RTCUserInfo from the database
        db.session.delete(rtc_info)
        db.session.commit()
        return "RTC Entry deleted successfully", 200
    else:
        return "RTC Entry could not be deleted", 404

@utils.authenticate        
def add_rtc_user(payload, **kwargs):
    me = kwargs.get('me')
    print("here is id", payload)

    # auth_token = request.headers.get("Authorization")
    # if not auth_token:
    #     return "Unauthorized", 401

    # scheme, token = auth_token.split('Bearer ')
    # decoded = decode_token(token)
    # decoded_data_str = decoded['sub']
    # json_dec_data = json.loads(decoded_data_str)
    # me = User.query.filter_by(email=json_dec_data['email']).first()
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
    
