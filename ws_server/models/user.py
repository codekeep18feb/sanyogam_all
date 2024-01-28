
import enum
from datetime import datetime
from config import db, ma
from marshmallow import fields
from sqlalchemy import event,Enum  # Add this import statement



class User(db.Model):
    __tablename__ = "user"
    profile = db.relationship('Profile', uselist=False, back_populates='user')
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32), unique=True)
    lname = db.Column(db.String(32),default=None)
    fname = db.Column(db.String(32),default=None)
    password = db.Column(db.String(32))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    friends_ids = db.Column(db.String)
    online = db.Column(db.Boolean, default=False)
    
    def create(self, data): #we might wanna make it static :) i think we are arriving now :::::))))))))))
        user = User(email=data['email'], password=data['password'], fname=data['fname'], lname=data['lname'], timestamp=data['timestamp'])
        db.session.add(user)
        return user
    
    
    def get(self, email): #we might wanna make it static :) i think we are arriving now :::::))))))))))
        user = User.query.filter_by(email=email).first()
        return user
    
    
    def get_list(self, filter_obj=None): #we might wanna make it static :) i think we are arriving now :::::))))))))))
        
        users = User.query.all()
        return users
    # will only upate the password for user so far
    def update(self, id, password): 
        user = User(id=id)
        user.password = password
        db.session.add(user)
        db.session.commit()
        return user

