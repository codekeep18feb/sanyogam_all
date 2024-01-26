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
# from models import OnlineStatusEnum  # Import the Enum class
from .common import utils

# from models import *
from models import *
def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))


def read_all():
    auth_token = request.headers.get("Authorization")
    if False:
        return "Unauthorized", 401
    
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return user_schema.dump(users)


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


class UserMixin:
    def create_user(self, data):
        user = User(email=data['email'], password=data['password'], fname=data['fname'], lname=data['lname'], timestamp=data['timestamp'])
        db.session.add(user)
        return user

    def get_user(self, email):
        user = User.query.filter_by(email=email).first()
        return user

    def get_all_users(self):
        users = User.query.all()
        return users

    def update_user_password(self, user_id, password):
        user = User(id=user_id)
        user.password = password
        db.session.add(user)
        db.session.commit()
        return user

class ValidationMixin:
    def __init__(self, data):
        self.data = data

    @staticmethod
    def missing_mandate_func(data, mandate):
        missing_mandate = [key for key in mandate if key not in data.keys()]
        return missing_mandate

    def validate_signup(self, mandate):
        missing_mandate = self.missing_mandate_func(self.data, mandate)

        if missing_mandate:
            return f'missing_mandate keys - {missing_mandate}'
        else:
            if '@' not in self.data['email']:
                return 'Email Format is wrong!'

            if len(self.data['password']) < 8:
                return 'Password length is less than 8'

    def validate_login(self, mandate):
        missing_mandate = self.missing_mandate_func(self.data, mandate)

        if missing_mandate:
            return f'missing_mandate keys - {missing_mandate}'
        else:
            if '@' not in self.data['email']:
                return 'Email Format is wrong!'

class UserH(UserMixin, ValidationMixin):
    def __init__(self, data):
        if data:
            super().__init__(data)
            self.lname = data.get("lname")
            self.fname = data.get("fname", "")
            self.email = data.get("email", "")
            self.password = data.get("password", "")
            self.gender = data.get("gender")
            self.timestamp_str = data.get("timestamp", get_timestamp())
            self.timestamp = datetime.strptime(self.timestamp_str, '%Y-%m-%d %H:%M:%S')

    def to_dict(self):
        return {
            "lname": self.lname,
            "fname": self.fname,
            "email": self.email,
            "password": self.password,
            "gender": self.gender,
            "timestamp": self.timestamp,
        }

    def signup(self):
        family_info_default = FamilyInformation()
        father_default = Father()
        data = self.to_dict()
        user = self.create_user(data)
        profile = Profile(
            gender=self.gender,
            user=user,
            family_info=family_info_default,
            father=father_default,
        )
        db.session.add(profile)
        db.session.commit()
        return [user, profile]

    def me(self):
        user = self.get_user(self.email)
        print('arew3ehere',user)
        if user:
            user_dict = {
                "id": user.id,
                "fname": user.fname,
                "lname": user.lname,
                "image": user.profile.image
            }
            return user_dict

    def logout(self):
        user = self.get_user(self.email)
        user.online = False
        db.session.add(user)
        db.session.commit()

    def login(self):
        user = User.query.filter_by(email=self.email, password=self.password).first()
        if not user:
            return "No Such User Found!", 401
        user.online = True
        db.session.add(user)
        db.session.commit()
        return {"token": generate_token({"email": self.email})}


# Route functions
@utils.authenticate
def me(**kwargs):
    me = kwargs.get('me')
    # res = UserH(None).me()
    # return res
    
    profile_schema = UserSchema()
    return profile_schema.dump(me)  

@utils.authenticate
def logout(**kwargs):
    me = kwargs.get('me')
    UserH(me).logout()
    return "loggedout", 201

def login(user):
    res = UserH(user).validate_login(["email", "password"])
    if res:
        return f"invalid payload :: {res}", 401
    res = UserH(user).login()
    return res, 201

def signup(signup_data):
    res = UserH(signup_data).validate_signup(['fname', 'lname', "email", "password", "gender"])
    if res:
        return f"invalid payload :: {res}", 401
    [user, profile] = UserH(signup_data).signup()
    send_email(user.email, "Registration with Sgam", 'Successfully Registrated!')
    return [{
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "gender": profile.gender,
        "timestamp": user.timestamp,
    }], 201

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

    user = User()
    print("user",user)
    # # # Create a profile and link it to the user
    db.session.add(user)
    profile = Profile(gender=gender, user=user,image=image)
    db.session.add(profile)

    db.session.commit()
    # send_email(email,"Registration with Sgam", 'Successfully Registrated!')
    return {
        "id": "user.id",
        # "fname": user.fname,
        # "lname": user.lname,
        # "gender": profile.gender,
        # "timestamp": user.timestamp,
    }, 201

