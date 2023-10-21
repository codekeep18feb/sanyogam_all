import json
from flask import Flask, request, abort  
from config import db, decode_token
from users import User
from models import Profile,ProfileSchema
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import UserRequests, UserRequestsSchema, OnlineUsersSchema
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


def update_profile(id):
    auth_token = request.headers.get("Authorization")
    image_data = request.files.get('image')
    gender = request.form.get('gender')
    fname = request.form.get('fname')
    lname = request.form.get('lname')

    profile = Profile.query.filter_by(id=id).first()

    if profile:
        profile.gender = gender
        if image_data and hasattr(image_data, 'read'):
            try:
                # Set the desired Content-Type (e.g., for JPEG images, use 'image/jpeg')
                content_type = 'image/jpeg'

                # Upload the image to S3
                s3.upload_fileobj(
                    image_data,
                    bucket_name,
                    f'profile_images/{id}.jpg',
                    ExtraArgs={'ContentType': content_type}  # Set the Content-Type
                )
                print("Image uploaded to S3",f'https://{bucket_name}.s3.amazonaws.com/profile_images/{id}.jpg')

                # Update the profile with the S3 URL
                profile.image = f'https://{bucket_name}.s3.amazonaws.com/profile_images/{id}.jpg'
            except NoCredentialsError:
                print("AWS credentials not found. Image upload failed.")

        profile.user.fname = fname
        profile.user.lname = lname

        db.session.add(profile)
        db.session.commit()

    return {
        "success": "Updated successfully!"
    }

def profile_id_one_query(id):
    profile = Profile.query.filter_by(id=id).first()
    
    if profile:
        person_dict = {
            "id": profile.id,
            "gender": profile.gender,
            "fname" : profile.user.fname,
            "lname" : profile.user.lname,
            "online" : profile.user.online
        }

        # uploaded_file = request.files.get("image")
        # if uploaded_file:
        #     print(f'Uploaded File:: {uploaded_file}')
            
        return person_dict
    else:
        abort(404, f"Profile with id {id} not found")


def read_all():
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




