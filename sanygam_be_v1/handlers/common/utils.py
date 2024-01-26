

import json
from .. import User
from flask import request
from functools import wraps
from config import db, decode_token


def authenticate(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print('did the wrapper wran')
        auth_token = request.headers.get("Authorization")
        print("auth_token", auth_token)
        if not auth_token:
            return "Unauthorized", 401

        scheme, token = auth_token.split('Bearer ')
        decoded = decode_token(token)
        decoded_data_str = decoded['sub']
        json_dec_data = json.loads(decoded_data_str)
        me = User.query.filter_by(email=json_dec_data['email']).first()

        # print('ME.PROFILE', me.profile)

        # You may want to modify the following line depending on your use case
        
        # Add 'me' to kwargs
        kwargs['me'] = me
        
        return func(*args, **kwargs)

    return wrapper

