import base64
import sqlite3
import json
import smtplib
from datetime import datetime
from flask import Flask, request, abort  
from config import db, generate_token
from config import db, decode_token
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# from models import MyEnum  # Import the Enum class

from models import *
from models import UserRequests

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))


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

