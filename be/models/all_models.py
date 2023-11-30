from datetime import datetime

from config import db, ma
# from marshmallow_sqlalchemy import fields
from marshmallow import fields

from sqlalchemy import event  # Add this import statement

class FamilyInformation(db.Model):
    __tablename__ = "family_information"
    id = db.Column(db.Integer, primary_key=True)
    profile = db.relationship('Profile', uselist=False, back_populates='family_information')
    no_of_brothers = db.Column(db.Integer)
    married_brother = db.Column(db.Integer)
    no_of_sisters = db.Column(db.Integer)
    married_sister = db.Column(db.Integer)
    family_location = db.Column(db.String(50))
    native_place = db.Column(db.String(50))
    affluence = db.Column(db.String(50))

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

class Mother(db.Model):
    __tablename__ = "mother"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='mother')
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    designation = db.Column(db.String(50))
    job_type = db.Column(db.String(50))

class Brother(db.Model):
    __tablename__ = "brother"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='brother')
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    designation = db.Column(db.String(50))
    company_name = db.Column(db.String(50))
    marital_status = db.Column(db.String(50))

class Sister(db.Model):
    __tablename__ = "sister"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='sister')
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    designation = db.Column(db.String(50))
    company_name = db.Column(db.String(50))
    marital_status = db.Column(db.String(50))

class ContactDetails(db.Model):
    __tablename__ = "contact_details"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='contact_details')
    email = db.Column(db.String(50))
    phone_number = db.Column(db.String(15))

class AboutMe(db.Model):
    __tablename__ = "about_me"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='about_me')
    gothra = db.Column(db.String(50))
    complexion = db.Column(db.String(50))
    diet = db.Column(db.String(50))
    body_type = db.Column(db.String(50))
    location = db.Column(db.String(50))
    residency_status = db.Column(db.String(50))
    designation = db.Column(db.String(50))
    company_name = db.Column(db.String(50))
    annual_income = db.Column(db.String(50))
    education = db.Column(db.String(50))
    college_name = db.Column(db.String(50))

class HoroscopeDetails(db.Model):
    __tablename__ = "horoscope_details"
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    profile = db.relationship('Profile', back_populates='horoscope_details')
    birth_location = db.Column(db.String(50))
    time_of_birth = db.Column(db.String(50))
    date_of_birth = db.Column(db.String(50))
    manglik = db.Column(db.String(3))
    nakshatra = db.Column(db.String(50))

class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(16))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='profile')
    image = db.Column(db.String(200))

    family_information_id = db.Column(db.Integer, db.ForeignKey('family_information.id'))
    family_information = db.relationship('FamilyInformation', back_populates='profile')

    father = db.relationship('Father', back_populates='profile', uselist=False)
    mother = db.relationship('Mother', back_populates='profile', uselist=False)
    brother = db.relationship('Brother', back_populates='profile', uselist=False)
    sister = db.relationship('Sister', back_populates='profile', uselist=False)
    contact_details = db.relationship('ContactDetails', back_populates='profile', uselist=False)
    about_me = db.relationship('AboutMe', back_populates='profile', uselist=False)
    horoscope_details = db.relationship('HoroscopeDetails', back_populates='profile', uselist=False)

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

class MotherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Mother
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class BrotherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Brother
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class SisterSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Sister
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class ContactDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ContactDetails
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class AboutMeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AboutMe
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class HoroscopeDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HoroscopeDetails
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class ProfileSchema(ma.SQLAlchemyAutoSchema):
    user_email = fields.String(attribute="user.email")
    user_fname = fields.String(attribute="user.fname")
    user_lname = fields.String(attribute="user.lname")

    family_information = fields.Nested(FamilyInformationSchema)
    father = fields.Nested(FatherSchema)
    mother = fields.Nested(MotherSchema)
    brother = fields.Nested(BrotherSchema)
    sister = fields.Nested(SisterSchema)
    contact_details = fields.Nested(ContactDetailsSchema)
    about_me = fields.Nested(AboutMeSchema)
    horoscope_details = fields.Nested(HoroscopeDetailsSchema)

    class Meta:
        model = Profile
        load_instance = True
        sqla_session = db.session
        include_relationships = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

family_information_schema = FamilyInformationSchema()
family_informations_schema = FamilyInformationSchema(many=True)

father_schema = FatherSchema()
fathers_schema = FatherSchema(many=True)

mother_schema = MotherSchema()
mothers_schema = MotherSchema(many=True)

brother_schema = BrotherSchema()
brothers_schema = BrotherSchema(many=True)

sister_schema = SisterSchema()
sisters_schema = SisterSchema(many=True)

contact_details_schema = ContactDetailsSchema()
contact_detailss_schema = ContactDetailsSchema(many=True)

about_me_schema = AboutMeSchema()
about_mes_schema = AboutMeSchema(many=True)

horoscope_details_schema = HoroscopeDetailsSchema()
horoscope_detailss_schema = HoroscopeDetailsSchema(many=True)

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)

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