import enum
from datetime import datetime
from config import db, ma
from marshmallow import fields
from sqlalchemy import event,Enum  # Add this import statement
from .user import User
from .profile import Profile, FamilyInformation, Father
from .requests import ChatHistory, OnlineStatusEnumField, ProfileRequests, RTCUserInfo, ChatBriefRec


# Add an event listener to the ProfileRequests table for inserts
@event.listens_for(User, 'after_insert')
def after_user_insert(mapper, connection, target):
    print('targetdfgfd',target,mapper,connection)
    # Your custom code here
    print(f"User created: {target.id}")

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



class ChatBriefRecSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ChatBriefRec
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
    online = fields.String(attribute="user.online")

    family_info = fields.Nested(FamilyInformationSchema)
    father = fields.Nested(FatherSchema)

    class Meta:
        model = Profile
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class ChatHistorySchema(ma.SQLAlchemyAutoSchema):
    status = fields.String(attribute='status.value')  # Use the 'value' attribute of the Enum
    class Meta:
        model = ChatHistory
        load_instance = True
        sqla_session = db.session
        include_relationships = True

class UserRequestsSchema(ma.SQLAlchemyAutoSchema):
    frm_profile = fields.String(attribute="act_frm_user.email")
    to_profile = fields.String(attribute="act_to_user.email")
    status = OnlineStatusEnumField(attribute="status")  # Use custom OnlineStatusEnumField for enum values

    class Meta:
        model = ProfileRequests
        load_instance = True
        sqla_session = db.session
        include_relationships = True
        # exclude = ('timestamp',)  # Exclude the 'timestamp' field

class OnlineUsersSchema(ma.SQLAlchemyAutoSchema):
    # frm_profile = fields.String(attribute="act_frm_user.email")
    frm_profile = fields.Method('frm_profile')

    def get_frm_user(self, obj):
        return {
            'email': obj.frm_profile.email,
            'online': obj.frm_profile.online,
        }
    to_profile =  fields.Method('to_profile')
    def get_to_user(self, obj):
        return {
            'email': obj.to_profile.email,
            'online': obj.to_profile.online,
        }
    class Meta:
        model = ProfileRequests
        load_instance = True
        sqla_session = db.session
        include_relationships = True
        exclude = ('timestamp','status','frm_profile','to_profile')  # Exclude the 'timestamp' field

class RTCUserInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RTCUserInfo
        load_instance = True
        sqla_session = db.session
        include_relationships = True




user_schema = UserSchema()
users_schema = UserSchema(many=True)

family_information_schema = FamilyInformationSchema()
family_informations_schema = FamilyInformationSchema(many=True)


chat_brief_schema = ChatBriefRecSchema()
chats_brief_schema = ChatBriefRecSchema(many=True)


profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)


father_schema = FatherSchema()
fathers_schema = FatherSchema(many=True)


chat_history_schema = ChatHistorySchema()
chat_histories_schema = ChatHistorySchema(many=True)


user_request_schema = UserRequestsSchema()
user_requests_schema = UserRequestsSchema(many=True)


rtc_info_schema = RTCUserInfoSchema()
# rtc_infos_schema = RTCUserInfoSchema(many=True)