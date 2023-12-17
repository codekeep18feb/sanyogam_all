import json
from flask import Flask, request, abort  
from config import db, decode_token
from . import User
from models import Profile,ProfileSchema
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import UserRequests, UserRequestsSchema, OnlineUsersSchema, ProfileSchema
from sqlalchemy import or_

from datetime import datetime
import boto3
from botocore.exceptions import NoCredentialsError
from flask import request

# Configure the S3 client
s3 = boto3.client('s3')
bucket_name = 'dhankosh' 
object_key = 'profile_images/{id}.jpg' 
content_type = 'image/jpeg'


def update_my_profile(profile_update_data):
    # image_data = request.files.get('image')
    gender =      profile_update_data.get('gender')
    fname =       profile_update_data.get('fname')
    lname =       profile_update_data.get('lname')
    family_info = profile_update_data.get('family_info')
    father = profile_update_data.get('father')
    auth_token = request.headers.get("Authorization")
    
    if not auth_token:
        return "Unauthorized", 401
    
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    print("family_info",family_info,gender,fname,me.profile.family_info)

    # profile = Profile.query.filter_by(id=id).first()
    print('hdsafsadfdsa',father)
    if me.profile:
        me.profile.gender = gender
        me.profile.user.fname = fname
        me.profile.user.lname = lname
        # me.profile.father.first_name = 'jakiru'
        for field, value in family_info.items():
            setattr(me.profile.family_info, field, value)
        for field, value in father.items():
            setattr(me.profile.father, field, value)
        db.session.add(me)
        db.session.commit()

    return {
        "success": "Updated successfully!"
    }

def profile(id):
    profile = Profile.query.filter_by(id=id).first()
    
    if profile:
        
        profile_schema = ProfileSchema()
        return profile_schema.dump(profile)   
    else:
        abort(404, f"Profile with id {id} not found")


def myprofile():
    auth_token = request.headers.get("Authorization")
    if not auth_token:
        
        return "Unauthorized", 401
    
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    print('HEREmyprofile',me.profile)
    
    # profile = Profile.query.filter_by(user_id=me.id)
    
    if me.profile:
        
        profile_schema = ProfileSchema()
        return profile_schema.dump(me.profile)   
    else:
        abort(404, f"Your profile not found, contact Admin")


def read_all_profiles_old():
    print("payloadchat")

    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        
        return "Unauthorized", 401
    
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    combined_query = UserRequests.query.filter(
    or_(UserRequests.frm_user == me.id, UserRequests.to_user == me.id),
    UserRequests.status == "ACCEPTED"
    )

    # Execute the query to get the results
    results = combined_query.all()
    # send_by_me = UserRequests.query.filter_by(frm_user=me.id, status="ACCEPTED")
    # sent_to_me = UserRequests.query.filter_by(to_user=me.id, status="ACCEPTED")
    print("sent_to_me",results)
    if not results:
        abort(400, f"no request exist {results}")


    # print("to_user_request",existing_req.status)
    elif results:
        accepted_profiles = []
        for result in results:
            frm_user = result.act_frm_user
            to_user = result.act_to_user

            # Check if frm_user's email is not me.email and online is true
            if frm_user.email != me.email:
                accepted_profiles.append({"user_id":frm_user.id,"user_email":frm_user.email,"online":frm_user.online})

            # Check if to_user's email is not me.email and online is true
            if to_user.email != me.email:
                accepted_profiles.append({"user_id":to_user.id,"user_email":to_user.email,"online":to_user.online})

        # Remove duplicates if any
        # accepted_profiles = list(set(accepted_profiles))

        # Return the list of online emails
        print("online_emails",accepted_profiles)
        return accepted_profiles
    
        # user_req_schema = UserRequestsSchema(many=True)
        # return user_req_schema.dump(results)
    else:
        abort(500, f"internal server error")



def read_all_profiles_v1():
    profiles = Profile.query.all()
    profile_schema = ProfileSchema(many=True)
    return profile_schema.dump(profiles)


# def read_all():
#     print("payloadchat")

#     auth_token = request.headers.get("Authorization")
#     print("auth_token",auth_token)
#     if not auth_token:
        
#         return "Unauthorized", 401
    
    
#     scheme, token = auth_token.split('Bearer ')    
#     decoded = decode_token(token)
#     decoded_data_str = decoded['sub']
#     json_dec_data = json.loads(decoded_data_str)
#     me = User.query.filter_by(email=json_dec_data['email']).first()
#     combined_query = UserRequests.query.filter(
#     or_(UserRequests.frm_user == me.id, UserRequests.to_user == me.id),
#     UserRequests.status == "ACCEPTED"
#     )

#     # Execute the query to get the results
#     results = combined_query.all()
#     # send_by_me = UserRequests.query.filter_by(frm_user=me.id, status="ACCEPTED")
#     # sent_to_me = UserRequests.query.filter_by(to_user=me.id, status="ACCEPTED")
#     print("sent_to_me",results)
#     if not results:
#         abort(400, f"no request exist {results}")


#     # print("to_user_request",existing_req.status)
#     elif results:
#         user_req_schema = UserRequestsSchema(many=True)
#         return user_req_schema.dump(results)
#     else:
#         abort(500, f"internal server error")


def read_online_circle():
    print("payloadchat")

    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        
        return "Unauthorized", 401
    
    
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me = User.query.filter_by(email=json_dec_data['email']).first()
    combined_query = UserRequests.query.filter(
    or_(UserRequests.frm_user == me.id, UserRequests.to_user == me.id),
    UserRequests.status == "ACCEPTED"
    )

    # Execute the query to get the results
    results = combined_query.all()
    # send_by_me = UserRequests.query.filter_by(frm_user=me.id, status="ACCEPTED")
    # sent_to_me = UserRequests.query.filter_by(to_user=me.id, status="ACCEPTED")
    print("sent_to_me",results)
    if not results:
        abort(400, f"no request exist {results}")


    # print("to_user_request",existing_req.status)
    elif results:
        online_emails = []
        for result in results:
            frm_user = result.act_frm_user
            to_user = result.act_to_user

            # Check if frm_user's email is not me.email and online is true
            if frm_user.email != me.email and frm_user.online:
                online_emails.append(frm_user.email)

            # Check if to_user's email is not me.email and online is true
            if to_user.email != me.email and to_user.online:
                online_emails.append(to_user.email)

        # Remove duplicates if any
        online_emails = list(set(online_emails))

        # Return the list of online emails
        print("online_emails",online_emails)
        return online_emails
        # user_req_schema = OnlineUsersSchema(many=True)
        # return user_req_schema.dump(results)
    else:
        abort(500, f"internal server error")

def my_decorator(param):
    def wrapper(func):
        def inner(*args, **kwargs):
            # Do something before calling the decorated function
            print(f"Decorator parameter: {param}")
            result = func(*args, **kwargs)
            # Do something after calling the decorated function
            return result
        return inner
    return wrapper

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))



