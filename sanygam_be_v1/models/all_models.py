from datetime import datetime

from config import db, ma
# from marshmallow_sqlalchemy import fields
from marshmallow import fields

from sqlalchemy import event  # Add this import statement

class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(16))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='profile')
    image = db.Column(db.String(200))
    family_info = db.relationship('FamilyInformation', uselist=False, back_populates='profile')
    father = db.relationship('Father', back_populates='profile', uselist=False)


class FamilyInformation(db.Model):
    __tablename__ = "family_info"
    id = db.Column(db.Integer, primary_key=True)
    no_of_brothers = db.Column(db.Integer)
    married_brother = db.Column(db.Integer)
    no_of_sisters = db.Column(db.Integer)
    married_sister = db.Column(db.Integer)
    family_location = db.Column(db.String(50))
    native_place = db.Column(db.String(50))
    affluence = db.Column(db.String(50))
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='family_info')

    
class Father(db.Model):
    __tablename__ = "father"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='father')
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    designation = db.Column(db.String(50))
    company_name = db.Column(db.String(50))
    job_type = db.Column(db.String(50))
    

class User(db.Model):
    __tablename__ = "user"
    profile = db.relationship('Profile', uselist=False, back_populates='user')
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32), unique=True)
    lname = db.Column(db.String(32))
    fname = db.Column(db.String(32))
    password = db.Column(db.String(32))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    friends_ids = db.Column(db.String)
    online = db.Column(db.Boolean, default=False)



class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class FamilyInformationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FamilyInformation
        load_instance = True
        sqla_session = db.session
        include_relationships = True


class FatherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Father
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class ProfileSchema(ma.SQLAlchemyAutoSchema):
    user_email = fields.String(attribute="user.email")
    user_fname = fields.String(attribute="user.fname")
    user_lname = fields.String(attribute="user.lname")

    family_info = fields.Nested(FamilyInformationSchema)
    father = fields.Nested(FatherSchema)

    class Meta:
        model = Profile
        load_instance = True
        sqla_session = db.session
        include_relationships = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

family_information_schema = FamilyInformationSchema()
family_informations_schema = FamilyInformationSchema(many=True)

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)


father_schema = FatherSchema()
fathers_schema = FatherSchema(many=True)


class UserRequests(db.Model):
    __tablename__ = "requests"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(16))
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
class UserRequestsSchema(ma.SQLAlchemyAutoSchema):
    frm_user = fields.String(attribute="act_frm_user.email")
    to_user = fields.String(attribute="act_to_user.email")
    class Meta:
        model = UserRequests
        load_instance = True
        sqla_session = db.session
        include_relationships = True
        # exclude = ('timestamp',)  # Exclude the 'timestamp' field




class OnlineUsersSchema(ma.SQLAlchemyAutoSchema):
    # frm_user = fields.String(attribute="act_frm_user.email")
    frm_user = fields.Method('get_frm_user')

    def get_frm_user(self, obj):
        return {
            'email': obj.act_frm_user.email,
            'online': obj.act_frm_user.online,
        }
    to_user =  fields.Method('get_to_user')
    def get_to_user(self, obj):
        return {
            'email': obj.act_to_user.email,
            'online': obj.act_to_user.online,
        }
    class Meta:
        model = UserRequests
        load_instance = True
        sqla_session = db.session
        include_relationships = True
        exclude = ('timestamp','status','act_frm_user','act_to_user')  # Exclude the 'timestamp' field


user_request_schema = UserRequestsSchema()
user_requests_schema = UserRequestsSchema(many=True)

class ChatHistory(db.Model):
    __tablename__ = "chathistory"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100))
    frm_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    act_frm_user = db.relationship('User', foreign_keys=[frm_user])

    to_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )




class ChatHistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ChatHistory
        load_instance = True
        sqla_session = db.session
        include_relationships = True


chat_history_schema = ChatHistorySchema()
chat_histories_schema = ChatHistorySchema(many=True)








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




class RTCUserInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RTCUserInfo
        load_instance = True
        sqla_session = db.session
        include_relationships = True


rtc_info_schema = RTCUserInfoSchema()
# rtc_infos_schema = RTCUserInfoSchema(many=True)