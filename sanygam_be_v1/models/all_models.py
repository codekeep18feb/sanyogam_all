import enum
from config import app
from datetime import datetime

from config import db, ma
# from marshmallow_sqlalchemy import fields
from marshmallow import fields

from sqlalchemy import event,Enum  # Add this import statement

# from sqlalchemy import event
tenant_counter = 0
def get_current_tenant_counter():
    # You might use some logic to retrieve the current tenant's counter
    # This could be based on request context, user information, or any other relevant data
    # For simplicity, let's use a global variable as a counter
    global tenant_counter
    tenant_counter += 1
    return tenant_counter


def determine_tenant_schema():
    # You can implement the logic to determine the current tenant's schema here
    # For simplicity, let's say you have a sequence of company schemas: company1, company2, company3, ...
    # You might use some context, request data, or configuration to identify the current tenant
    # For now, let's use a counter to simulate different tenants

    # Assuming you have a counter that increments for each new tenant
    counter = get_current_tenant_counter()

    # Generate the schema name based on the pattern
    schema_name = f"company{counter}"

    return schema_name


# Initialize the global tenant counter

@app.before_request
def set_tenant_schema():
    g.tenant_schema = determine_tenant_schema() or "default_schema" # Implement a function to determine the schema


class User(db.Model):
    __tablename__ = "user"
    __table_args__ = {"schema": lambda: g.get("tenant_schema", "default_schema")}
    # __table_args__ = {"schema": "tenant_schema_name"}  # Replace with the actual schema name
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32), unique=True)
    lname = db.Column(db.String(32), default=None)
    fname = db.Column(db.String(32), default=None)
    password = db.Column(db.String(32))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session
        include_relationships = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)
