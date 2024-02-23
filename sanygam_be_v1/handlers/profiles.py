
import json
from flask import Flask, request, abort, jsonify 
from config import db, decode_token
from . import User
from models import Profile,ProfileSchema, profiles_schema
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import ProfileRequests, UserRequestsSchema, OnlineUsersSchema, ProfileSchema, FamilyInformation
from sqlalchemy import or_
from .common import utils

from datetime import datetime
import boto3
from botocore.exceptions import NoCredentialsError
from flask import request



# Configure the S3 client
s3 = boto3.client('s3')
bucket_name = 'dhankosh' 
object_key = 'profile_images/{id}.jpg' 
content_type = 'image/jpeg'
from functools import wraps




def update_my_profile(profile_update_data, **kwargs):
    me = kwargs.get('me')
    gender =      profile_update_data.get('gender',me.profile.gender)
    fname =       profile_update_data.get('fname',me.profile.user.fname)
    lname =       profile_update_data.get('lname',me.profile.user.lname)
    family_info = profile_update_data.get('family_info',None)
    father = profile_update_data.get('father',None)
    print("family_info",family_info,gender,fname,me.profile.family_info)
    
    
    # profile = Profile.query.filter_by(id=id).first()
    print('hdsafsadfdsa',father)
    if me.profile:
        me.profile.gender = gender
        me.profile.user.fname = fname
        me.profile.user.lname = lname
        # me.profile.father.first_name = 'jakiru'
        if family_info:
            for field, value in family_info.items():
                setattr(me.profile.family_info, field, value)
        if father:
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


@utils.authenticate
def all_profiles(p_filter_obj, **kwargs):
    me = kwargs.get('me')
    print('logged idn me',me,kwargs)
    # auth_token = request.headers.get("Authorization")
    print('ME.PROFILE', me.profile)
    
    all_profiles_query = Profile.query
    all_profiles_data = handle_filtering(all_profiles_query,p_filter_obj,me.profile.id)
    
    fres = profiles_schema.dump(all_profiles_data)
    return fres


@utils.authenticate
def filter_profiles(**kwargs):
    me = kwargs.get('me')
    req_status = kwargs.get('req_status')
    print('logged idn me',me,req_status)
    print('ME.PROFILE', me.profile)
    
    all_profiles_query = Profile.query
    
    all_profiles_query = all_profiles_query.filter(Profile.id != me.profile.id)
    all_profiles = all_profiles_query.all()
    
    fres = profiles_schema.dump(all_profiles)
    
    return fres



@utils.authenticate
def fetch_online_profiles(p_filter_obj, **kwargs):
    me = kwargs.get('me')
    # print('api_rdfsfesult',api_result)

    # me =  DictWithDotAccess(api_result)
    
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
    
    return fres   



@utils.authenticate
def myprofile(**kwargs):
    me = kwargs.get('me')
    me = User.query.filter_by(email=me.email).first()
    print('HEREmyprofile',me.profile)
    
    # profile = Profile.query.filter_by(user_id=me.id)
    
    if me.profile:
        
        profile_schema = ProfileSchema()
        return profile_schema.dump(me.profile)   
    else:
        abort(404, f"Your profile not found, contact Admin")


def handle_filtering(all_profiles_query, p_filter_obj,user_profile_id):
    all_profiles_query = all_profiles_query.filter(Profile.id != user_profile_id)

    if 'family_info' in p_filter_obj and p_filter_obj['family_info']:
        family_info_filter = p_filter_obj['family_info']

        if 'affluence' in family_info_filter and family_info_filter['affluence']:
            affluence_value = family_info_filter['affluence']
            all_profiles_query = all_profiles_query.filter(Profile.family_info.has(FamilyInformation.affluence == affluence_value))
        if 'location' in family_info_filter and family_info_filter['location']:
            location_value = family_info_filter['location']
            family_info_condition = or_(
                FamilyInformation.family_location == location_value,
                FamilyInformation.native_place == location_value
            )
            all_profiles_query = all_profiles_query.filter(Profile.family_info.has(family_info_condition))

        # Add more filters as needed based on your requirements

    all_profiles = all_profiles_query.all()
    return all_profiles

   
    # else:
    #     abort(500, f"internal server error")








def read_all_profiles_old(**kwargs):
    print("payloadchat")
    me = kwargs.get('me')
    
    me = User.query.filter_by(email=me.email).first()
    combined_query = ProfileRequests.query.filter(
    or_(ProfileRequests.frm_profile == me.id, ProfileRequests.to_profile == me.id),
    ProfileRequests.status == "ACCEPTED"
    )

    # Execute the query to get the results
    results = combined_query.all()
    # send_by_me = ProfileRequests.query.filter_by(frm_profile=me.id, status="ACCEPTED")
    # sent_to_me = ProfileRequests.query.filter_by(to_profile=me.id, status="ACCEPTED")
    print("sent_to_me",results)
    if not results:
        abort(400, f"no request exist {results}")


    # print("to_user_request",existing_req.status)
    elif results:
        accepted_profiles = []
        for result in results:
            frm_profile = result.act_frm_user
            to_profile = result.act_to_user

            # Check if frm_profile's email is not me.email and online is true
            if frm_profile.email != me.email:
                accepted_profiles.append({"user_id":frm_profile.id,"user_email":frm_profile.email,"online":frm_profile.online})

            # Check if to_profile's email is not me.email and online is true
            if to_profile.email != me.email:
                accepted_profiles.append({"user_id":to_profile.id,"user_email":to_profile.email,"online":to_profile.online})

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


def read_online_circle(**kwargs):
    me = kwargs.get('me')
    
    combined_query = ProfileRequests.query.filter(
    or_(ProfileRequests.frm_profile == me.id, ProfileRequests.to_profile == me.id),
    ProfileRequests.status == "ACCEPTED"
    )

    # Execute the query to get the results
    results = combined_query.all()
    # send_by_me = ProfileRequests.query.filter_by(frm_profile=me.id, status="ACCEPTED")
    # sent_to_me = ProfileRequests.query.filter_by(to_profile=me.id, status="ACCEPTED")
    print("sent_to_me",results)
    if not results:
        abort(400, f"no request exist {results}")


    # print("to_user_request",existing_req.status)
    elif results:
        online_emails = []
        for result in results:
            frm_profile = result.act_frm_user
            to_profile = result.act_to_user

            # Check if frm_profile's email is not me.email and online is true
            if frm_profile.email != me.email and frm_profile.online:
                online_emails.append(frm_profile.email)

            # Check if to_profile's email is not me.email and online is true
            if to_profile.email != me.email and to_profile.online:
                online_emails.append(to_profile.email)

        # Remove duplicates if any
        online_emails = list(set(online_emails))

        # Return the list of online emails
        print("online_emails",online_emails)
        return online_emails
        # user_req_schema = OnlineUsersSchema(many=True)
        # return user_req_schema.dump(results)
    else:
        abort(500, f"internal server error")


def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))



