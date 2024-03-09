from datetime import datetime
from config import app, db
# from models.models import User  # Import the Profile model

# Define the data for users and their profiles
PEOPLE_PROFILE_NOTES = [
    {
        "lname": "Fairy",
        "fname": "Tooth",
        "gender": "Female",  # Include gender
    },
    {
        "lname": "Ruprecht",
        "fname": "Knecht",
        "gender": "Male",
    },
    {
        "lname": "Bunny",
        "fname": "Easter",
        "gender": "Male",
    },
    {
        "lname": "John",
        "fname": "Doe",
        "gender": "Male",
    },
    {
        "lname": "Jane",
        "fname": "Smith",
        "gender": "Female",
    },
    {
        "lname": "Alice",
        "fname": "Johnson",
        "gender": "Female",
    },
]

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create users and profiles
    # user_objects = {}
    # for data in PEOPLE_PROFILE_NOTES:
    #     new_user = User(lname=data.get("lname"), fname=data.get("fname"))
    #     db.session.add(new_user)
        
    #     new_profile = Profile(gender=data.get("gender"), user=new_user)
    #     db.session.add(new_profile)

    db.session.commit()
