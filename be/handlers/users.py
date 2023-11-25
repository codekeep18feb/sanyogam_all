import sqlite3
import json
import smtplib
from datetime import datetime
from flask import Flask, request, abort  
from config import db
from config import db
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from models.users import User, UserSchema
def read_all():
   
    
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return user_schema.dump(users)


def signup(signup_data):
    fname = signup_data.get("fname", "")

    new_person = User(fname=fname)
    print("new_person",new_person)
    db.session.add(new_person)

    db.session.commit()