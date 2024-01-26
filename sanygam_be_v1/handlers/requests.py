import json
from config import db, generate_token
from config import db, decode_token
from models import *
from flask import Flask, request, abort  
from sqlalchemy import or_
from flask import jsonify



# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
def handle_request():
    auth_token = request.headers.get("Authorization")
    to_email = request.args.get("to_email",None)

    print('fdrthjrtf')
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me_user = User.query.filter_by(email=json_dec_data['email']).first()
    print('to_emaiadsfl',to_email)
    if to_email:
        to_user =  User.query.filter_by(email=to_email).first()

        print("frm_usdsfsdafer", me_user, "to_user", to_user)

        # Check if action query parameter is present
        action = request.args.get("action",None)

        if action is None:
            # GET request status when GET whithout query(action)
            # all_requests_query = UserRequests.query
            all_requests_query = UserRequests.query.filter(
            or_(
                (UserRequests.frm_user == me_user.id) & (UserRequests.to_user == to_user.id),
                (UserRequests.frm_user == to_user.id) & (UserRequests.to_user == me_user.id)
                )
            ).first()
                
            res = user_request_schema.dump(all_requests_query)
            print('any request between users',type(res),res)
            return jsonify(res)  

        else:
            # If action is provided, it's a respond_request
            print("actioDFn", action)
            all_requests_query = UserRequests.query.filter(
            or_(
                (UserRequests.frm_user == me_user.id) & (UserRequests.to_user == to_user.id),
                (UserRequests.frm_user == to_user.id) & (UserRequests.to_user == me_user.id)
                )
            ).first()
            
            
            #sender case
            if not all_requests_query and action=='SENT':
                to_user_request = UserRequests(to_user=to_user.id, frm_user=me_user.id, status='SENT')
                print('to_user_DSFrequest', to_user_request)
                db.session.add(to_user_request)
                db.session.commit()
                return f"Successfully sent"
            
            elif all_requests_query and action=='CANCELED':
                db.session.delete(all_requests_query)
                db.session.commit()
                return "Request deleted successfully"
            
            elif all_requests_query and action=='SENT':
                res = user_request_schema.dump(all_requests_query)
                abort(400, f"already there is one request - {res}")
            
            #reciever case
            print('all_requests_query.status',all_requests_query.status)
            if all_requests_query and all_requests_query.status==OnlineStatusEnum.SENT and (action == 'ACCEPTED' or action == 'REJECTED'):
                # if all_requests_query.to_user==me_user.id:
                #     abort(400, f"It's sent by you only so you can't `Accept` it")

                all_requests_query.status = action
                # db.session.update(all_requests_query)
                db.session.commit()
                return f"Successfully Accepted"
            

            # if to_user_request and to_user_request.status == OnlineStatusEnum.SENT:
            #     prv_user_request_s = to_user_request.status.name
            #     to_user_request.status = action
            #     db.session.add(to_user_request)
            #     db.session.commit()
            #     return f"Successfully changed from {prv_user_request_s} to {action}"
            # else:
            #     abort(400, f"Current request status is {to_user_request.status.name}" if to_user_request else "Request not found")
    else:
        all_requests_query = UserRequests.query.filter(
        UserRequests.to_user == me_user.id
        ).all()
        print('all_requests_quedsfasdry',all_requests_query)
        return user_requests_schema.dump(all_requests_query)
# Add your route definition for /handle_request/{to_email}/query here


# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
def send_request(to_email):
    # current_user = get_jwt_identity()
    # wondering if we can put a decorator here????
    print("Inside my_function")

    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        
        return "Unauthorized", 401
    
    


    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    frm_user = User.query.filter_by(email=json_dec_data['email']).first()
    to_user =  User.query.filter_by(email=to_email).first()

    print("frm_user",frm_user,"to_user",to_user)
    try:
        new_request = UserRequests(frm_user=frm_user.id,to_user=to_user.id,status='SENT')
        print("new_request",new_request)
        db.session.add(new_request)
        db.session.commit()
    except Exception as e:
        print(f"Error progbd: {e}")
        db.session.rollback()
        
    return "sent now"
    # else:
    #     abort(404, f"Profile with id {id} not found")



# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
def respond_request(to_email):
    body = request.args
    action = body.get("action", "ACCEPTED")
    print("action",action)

    auth_token = request.headers.get("Authorization")
    print("auth_token",auth_token)
    if not auth_token:
        return "Unauthorized", 401
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    frm_user = User.query.filter_by(email=json_dec_data['email']).first()
    to_user =  User.query.filter_by(email=to_email).first()
    print("what is the diff",UserRequests,to_user.id)
    to_user_request = UserRequests.query.filter_by(frm_user=to_user.id).first() ##(frm_user=to_user.id)
    print('to_user_reqsdfsduest',to_user_request.status)
    if to_user_request.status == OnlineStatusEnum.SENT:
        prv_user_request_s = to_user_request.status.name
        to_user_request.status=action
        db.session.add(to_user_request)
        db.session.commit()
        return f"successfully changed from ${prv_user_request_s} to ${action}"
    else:
        abort(400, f"current request status is {to_user_request.status.name}")

