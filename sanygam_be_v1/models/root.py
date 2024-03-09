# import enum
# from datetime import datetime
# from config import db, ma
# from marshmallow import fields
# from sqlalchemy import event,Enum  # Add this import statement
# # from .user import User
# # from .profile import Profile, FamilyInformation, Father, AllFormComp
# # from .requests import ChatHistory, OnlineStatusEnumField, ProfileRequests, RTCUserInfo, ChatBriefRec


# # Add an event listener to the ProfileRequests table for inserts
# # @event.listens_for(User, 'after_insert')
# # def after_user_insert(mapper, connection, target):
# #     print('targetdfgfd',target,mapper,connection)
# #     # Your custom code here
# #     print(f"User created: {target.id}")

# # class UserSchema(ma.SQLAlchemyAutoSchema):
# #     class Meta:
# #         model = User
# #         load_instance = True
# #         sqla_session = db.session
# #         include_relationships = True


# # user_request_schema = UserRequestsSchema()
# # user_requests_schema = UserRequestsSchema(many=True)

