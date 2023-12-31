import enum

from datetime import datetime

from config import db, ma
# from marshmallow_sqlalchemy import fields
from marshmallow import fields

from sqlalchemy import event,Enum  # Add this import statement

# from sqlalchemy import event




class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32), unique=True)
    lname = db.Column(db.String(32),default=None)
    fname = db.Column(db.String(32),default=None)
    password = db.Column(db.String(32))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )



class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session
        include_relationships = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)
