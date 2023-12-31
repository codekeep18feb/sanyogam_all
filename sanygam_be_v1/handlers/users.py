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
# from models import UserRequests,UserRequestsSchema
def read_all():
    auth_token = request.headers.get("Authorization")
    if False:
        return "Unauthorized", 401
    
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return user_schema.dump(users)