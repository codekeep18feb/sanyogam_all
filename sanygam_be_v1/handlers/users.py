import sqlite3
from flask import jsonify
import json
import smtplib
from datetime import datetime
from flask import Flask, request, abort  
from config import db, generate_token
from config import db, decode_token
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# from models import MyEnum  # Import the Enum class
from sqlalchemy import or_

from models import *
from models import UserRequests,UserRequestsSchema
def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))


# @my_decorator("Hello, world!")
# @jwt_required()  # Protect this route with JWT authentication
def handle_request(to_email):
    auth_token = request.headers.get("Authorization")
    if not auth_token:
        return "Unauthorized", 401

    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    me_user = User.query.filter_by(email=json_dec_data['email']).first()
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
        print("action", action)
        all_requests_query = UserRequests.query.filter(
        or_(
            (UserRequests.frm_user == me_user.id) & (UserRequests.to_user == to_user.id),
            (UserRequests.frm_user == to_user.id) & (UserRequests.to_user == me_user.id)
            )
        ).first()
        
        
        #sender case
        if not all_requests_query and action=='SENT':
            to_user_request = UserRequests(to_user=to_user.id, frm_user=me_user.id, status='SENT')
            print('to_user_request', to_user_request)
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
        if all_requests_query and all_requests_query.status==MyEnum.SENT and (action == 'ACCEPTED' or action == 'REJECTED'):
            # if all_requests_query.to_user==me_user.id:
            #     abort(400, f"It's sent by you only so you can't `Accept` it")

            all_requests_query.status = action
            # db.session.update(all_requests_query)
            db.session.commit()
            return f"Successfully Accepted"
        

        # if to_user_request and to_user_request.status == MyEnum.SENT:
        #     prv_user_request_s = to_user_request.status.name
        #     to_user_request.status = action
        #     db.session.add(to_user_request)
        #     db.session.commit()
        #     return f"Successfully changed from {prv_user_request_s} to {action}"
        # else:
        #     abort(400, f"Current request status is {to_user_request.status.name}" if to_user_request else "Request not found")

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
    if to_user_request.status == MyEnum.SENT:
        prv_user_request_s = to_user_request.status.name
        to_user_request.status=action
        db.session.add(to_user_request)
        db.session.commit()
        return f"successfully changed from ${prv_user_request_s} to ${action}"
    else:
        abort(400, f"current request status is {to_user_request.status.name}")



def read_all():
    auth_token = request.headers.get("Authorization")
    if False:
        return "Unauthorized", 401
    
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return user_schema.dump(users)


PEOPLE = [

 {
        "id":1,
        "fname": "Deepak",
        "lname": "Singh",
        "timestamp": get_timestamp(),
    },
{
        "id":2,
        "fname": "Rajni",
        "lname": "Ruprecht",
        "timestamp": get_timestamp(),
    },
{
        "id":3,
        "fname": "Easter",
        "lname": "Bunny",
        "timestamp": get_timestamp(),
    }

]



def upload_image(id):
    auth_token = request.headers.get("Authorization")  
    print("auth_token",auth_token)
    conn = sqlite3.connect('sgam.db')

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user WHERE id=?", (id,))
    result = cursor.fetchone()
    if result:
        user = {
            "id": result[0],
            "fname": result[1],
            "lname": result[2],
            "timestamp": result[3],
        }

        uploaded_file = request.files.get("image")
        print("you better save it here now anywhere!!",uploaded_file)
        if uploaded_file:
            file_data_binary = uploaded_file.read()
            print(f'Uploaded File Binary:: {file_data_binary}')

        return user

    else:
        abort(404, f"User with id {id} not found")



def read_id_one_query(id):
    user = User.query.filter_by(id=id).first()
    
    if user:
        # person_dict = {
        #     "id": user.id,
        #     "fname": user.fname,
        #     "lname": user.lname,
        #     "timestamp": user.timestamp,
        # }

        # uploaded_file = request.files.get("image")
        # if uploaded_file:
        #     print(f'Uploaded File:: {uploaded_file}')
        # print(type(user),user)
        return user_schema.dump(user)
    else:
        abort(404, f"User with id {id} not found")














# Gmail SMTP settings
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'codekeep18feb@gmail.com'  # Replace with your Gmail address
SMTP_PASSWORD = 'jujljayicfwkjkmb'   # Replace with your Gmail password


# @app.route('/send_email', methods=['GET'])
def send_email(recipient_email,subject,message):
    recipient_email = recipient_email #'djangoboy.18feb@gmail.com'
    subject = subject
    message = message

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    try:
        # Connect to Gmail SMTP server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)

        # Send the email
        server.sendmail(SMTP_USERNAME, recipient_email, msg.as_string())
        server.quit()

        return "Email sent successfully!"
    except Exception as e:
        return f"Email could not be sent. Error: {str(e)}"




def read_one_query():
    body = request.args
    fname = body.get("fname", None)
    lname = body.get("lname", None)
    q_email = body.get("q_email", None)

    if fname and lname and q_email:
        user = User.query.filter_by(fname=fname, lname=lname,email=q_email).first()

    elif fname and lname:
        user = User.query.filter_by(fname=fname, lname=lname).first()
    elif fname:
        user = User.query.filter_by(fname=fname).first()
    elif lname:
        user = User.query.filter_by(lname=lname).first()
    elif q_email:
        user = User.query.filter_by(email=q_email).first()
    else:
        abort(404, "No such user found")

    if user:
        person_dict = {
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "timestamp": user.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
        }
        return person_dict
    else:
        abort(404, "No such user found")


import base64

# Function to convert binary image data to base62
def binary_image_to_base62(binary_image):
    # Encode binary image data to base64
    base64_encoded = base64.b64encode(binary_image).decode('utf-8')

    # Define the base62 character set
    base62_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    # Convert base64 to base62
    base62_result = []
    value = 0
    base = 256  # 2^8 (8 bits)
    
    for char in base64_encoded:
        value = value * base + ord(char)
        while value >= 62:
            div, mod = divmod(value, 62)
            base62_result.append(base62_chars[mod])
            value = div
    
    base62_result.append(base62_chars[value])
    
    return ''.join(reversed(base62_result))

# # Example usage
# binary_image_data = b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00H\x00H\x00\x00\xff\xe2\x0cXICC_PROFILE\x00\x01\x01\x00\x00\x0cHLino\x02\x10\x00\x00mntrRGB XYZ \x07\xce\x00\x02\x00\t\x00\x06\x001\x00\x00acspMSFT\x00\x00\x00\x00IEC sRGB\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf6\xd6\x00\x01\x00\x00\x00\x00\xd3-HP  \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x11cprt\x00\x00\x01P\x00\x00\x003desc\x00\x00\x01\x84\x00\x00\x00lwtpt\x00\x00\x01\xf0\x00\x00\x00\x14bkpt\x00\x00\x02\x04\x00\x00\x00\x14rXYZ\x00\x00\x02\x18\x00\x00\x00\x14gXYZ\x00\x00\x02,\x00\x00\x00\x14bXYZ\x00\x00\x02@\x00\x00\x00\x14dmnd\x00\x00\x02T\x00\x00\x00pdmdd\x00\x00\x02\xc4\x00\x00\x00\x88vued\x00\x00\x03L\x00\x00\x00\x86view\x00\x00\x03\xd4\x00\x00\x00$lumi\x00\x00\x03\xf8\x00\x00\x00\x14meas\x00\x00\x04\x0c\x00\x00\x00$tech\x00\x00\x040\x00\x00\x00\x0crTRC\x00\x00\x04<\x00\x00\x08\x0cgTRC\x00\x00\x04<\x00\x00\x08\x0cbTRC\x00\x00\x04<\x00\x00\x08\x0ctext\x00\x00\x00\x00Copyright (c) 1998 Hewlett-Packard Company\x00\x00desc\x00\x00\x00\x00\x00\x00\x00\x12sRGB IEC61966-2.1\x00\x00\x00\x00\x00\x00'

# base62_image = binary_image_to_base62(binary_image_data)

# # Print the base62-encoded image data
# print(base62_image)



def me():
    auth_token = request.headers.get("Authorization")
    if not auth_token:    
        return "Unauthorized", 401
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    user = User.query.filter_by(email=json_dec_data['email']).first()
    # base_64_str = binary_image_to_base62(user.profile.image)
    # print("userme",base_64_str)
    if user:
        user_dict = {
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "image":user.profile.image
            # "timestamp": user.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
        }
        return user_dict
    else:
        abort(404, "No such user found")




def login(user):
    email = user.get("email", "")
    password = user.get("password", "")
    """

    generate_token(email)
    
    """
    print("what is it",email)
    user = User.query.filter_by(email=email,password=password).first()
    if not user:
        return "No Such User Found!", 401
    # profile = user.profile if user else None
    user.online=True
    db.session.add(user)
    db.session.commit()
    print("Logged in User and profile",user)

    return {
        "token": generate_token({"email":email}),
    }, 201



def logout():
    auth_token = request.headers.get("Authorization")    
    if not auth_token:
        return "Unauthorized", 401
    scheme, token = auth_token.split('Bearer ')    
    decoded = decode_token(token)
    decoded_data_str = decoded['sub']
    json_dec_data = json.loads(decoded_data_str)
    user = User.query.filter_by(email=json_dec_data['email']).first()
    # profile = user.profile if user else None
    user.online=False
    db.session.add(user)
    db.session.commit()
    return "loggedout", 201


def signup(signup_data):
    lname = signup_data.get("lname")
    fname = signup_data.get("fname", "")
    email = signup_data.get("email", "")
    password = signup_data.get("password", "")
    gender = signup_data.get("gender")  # New field for gender
 

    timestamp_str = signup_data.get("timestamp", get_timestamp())
    timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')

    
    family_info_default = FamilyInformation()
    father_default = Father()
    # mother_default = Mother()
    # brother_default = Brother()
    # sister_default = Sister()
    # contact_details_default = ContactDetails()
    # about_me_default = AboutMe()
    # horoscope_details_default = HoroscopeDetails()

    new_person = User(email=email, password=password, fname=fname, lname=lname, timestamp=timestamp)
    db.session.add(new_person)

    profile = Profile(
        gender=gender,
        user=new_person,
        family_info=family_info_default,
        father=father_default,
        # mother=mother_default,
        # brother=brother_default,
        # sister=sister_default,
        # contact_details=contact_details_default,
        # about_me=about_me_default,
        # horoscope_details=horoscope_details_default
    )

    db.session.add(profile)

    db.session.commit()
    send_email(email,"Registration with Sgam", 'Successfully Registrated!')
    return {
        "id": new_person.id,
        "fname": new_person.fname,
        "lname": new_person.lname,
        "gender": profile.gender,
        "timestamp": new_person.timestamp,
    }, 201



def save_oauth(data):
    fname = data.get("name").split(" ")[0]
    lname = data.get("name").split(" ")[1]
    email = data.get("email", "")
    password = data.get("password", "")
    gender = data.get("gender")  # New field for gender
    image = data.get("picture", "")
 
    print("extraction data",data)
    timestamp_str = data.get("timestamp", get_timestamp())
    timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')

    new_person = User(email=email, password=password,fname=fname, lname=lname, timestamp=timestamp)
    print("new_person",new_person)
    # # # Create a profile and link it to the user
    db.session.add(new_person)
    profile = Profile(gender=gender, user=new_person,image=image)
    db.session.add(profile)

    db.session.commit()
    # send_email(email,"Registration with Sgam", 'Successfully Registrated!')
    return {
        "id": "new_person.id",
        # "fname": new_person.fname,
        # "lname": new_person.lname,
        # "gender": profile.gender,
        # "timestamp": new_person.timestamp,
    }, 201

# def create(user):
#     lname = user.get("lname")
#     fname = user.get("fname", "")
    
#     timestamp_str = user.get("timestamp", get_timestamp())
#     timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')

#     new_person = User(fname=fname, lname=lname, timestamp=timestamp)

#     db.session.add(new_person)
#     db.session.commit()

#     return {
#         "id": new_person.id,
#         "fname": new_person.fname,
#         "lname": new_person.lname,
#         "timestamp": new_person.timestamp,
#     }, 201
