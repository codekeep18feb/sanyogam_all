
import enum
from datetime import datetime
from config import db, ma
from marshmallow import fields
from sqlalchemy import event,Enum  # Add this import statement




class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(16))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='profile')
    image = db.Column(db.String(200))
    family_info = db.relationship('FamilyInformation', uselist=False, back_populates='profile')
    chat_brief_rec = db.relationship('ChatBriefRec', uselist=False, back_populates='profile')
    father = db.relationship('Father', back_populates='profile', uselist=False)
    form_components = db.relationship('AllFormComp', back_populates='profile', uselist=False)


class FamilyInformation(db.Model):
    __tablename__ = "family_info"
    id = db.Column(db.Integer, primary_key=True)
    no_of_brothers = db.Column(db.Integer, default=0)
    married_brother = db.Column(db.Integer, default=0)
    no_of_sisters = db.Column(db.Integer, default=0)
    married_sister = db.Column(db.Integer, default=0)
    family_location = db.Column(db.String(50), default=None)
    native_place = db.Column(db.String(50), default=None)
    affluence = db.Column(db.String(50), default=None)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='family_info')

    
class Father(db.Model):
    __tablename__ = "father"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='father')
    first_name = db.Column(db.String(50), default=None)
    last_name = db.Column(db.String(50), default=None)
    designation = db.Column(db.String(50), default=None)
    company_name = db.Column(db.String(50), default=None)
    job_type = db.Column(db.String(50), default=None)
    

class radioEnum(enum.Enum):
    SENT = 1
    CANCELED = 2
    RECEIVED = 3
    ACCEPTED = 4
    REJECTED = 5


class AllFormComp(db.Model):
    __tablename__ = "form_components"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='form_components')
    first_name = db.Column(db.String(50), default=None)
    age = db.Column(db.String(50), default=None)
    dob = db.Column(db.Date(), default=None)
    tob  = db.Column(db.Time, default=None)
    drop = db.Column(db.String(50), default=None)
    radio = db.Column(Enum(radioEnum))

    
