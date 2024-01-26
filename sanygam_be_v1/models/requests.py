
import enum
from datetime import datetime
from config import db, ma
from marshmallow import fields
from sqlalchemy import event,Enum  # Add this import statement


class ChatBriefRec(db.Model):
    __tablename__ = "chat_brief_rec"
    id = db.Column(db.Integer, primary_key=True)
    lmsgtime = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    lmsg_is_delivered = db.Column(db.Boolean, default=0)
    lmsg_is_read = db.Column(db.Boolean, default=0)
    total = db.Column(db.Integer, default=0)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='chat_brief_rec')

    

class OnlineStatusEnum(enum.Enum):
    SENT = 1
    CANCELED = 2
    RECEIVED = 3
    ACCEPTED = 4
    REJECTED = 5


class UserRequests(db.Model):
    __tablename__ = "requests"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(Enum(OnlineStatusEnum))
    # status = db.Column(Enum('pending', 'approved', 'rejected', name='request_status'), default='pending')
    frm_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    act_frm_user = db.relationship('User', foreign_keys=[frm_user])
    to_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    act_to_user = db.relationship('User', foreign_keys=[to_user])
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


# # Add an event listener to automatically populate act_user
# @event.listens_for(UserRequests.frm_user, 'set')
# def set_act_user(target, value, oldvalue, initiator):
#     target.act_user = value

class OnlineStatusEnumField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return value.name #.lower()



class ChatEnum(enum.Enum):
    SENT = "SENT"
    FAILED = "FAILED"
    DELIVERED = "DELIVERED"
    READ = "READ"


class ChatHistory(db.Model):
    __tablename__ = "chathistory"
    id = db.Column(db.Integer, primary_key=True)
    msg = db.Column(db.String(100))
    frm_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    frm_user = db.relationship('User', foreign_keys=[frm_user_id])
    status = db.Column(Enum(ChatEnum),default=ChatEnum.SENT)  
      
    to_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    to_user = db.relationship('User', foreign_keys=[to_user_id])

    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )



class RTCUserInfo(db.Model):
    __tablename__ = "rtcuserinfo"
    id = db.Column(db.Integer, primary_key=True)
    initiator = db.Column(db.Boolean, default=True)
    sdp = db.Column(db.String(5000))
    answer = db.Column(db.String(5000))
    frm_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    # act_frm_user = db.relationship('User', foreign_keys=[frm_user])
    to_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


