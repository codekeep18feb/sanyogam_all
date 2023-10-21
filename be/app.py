from flask import render_template,abort,jsonify # Remove: import Flask
import config
import stripe
from models import User, users_schema, user_schema, UserSchema,Profile
# from flask_jwt_extended import JWTManager, jwt_required
import jwt
import time
from pathlib import Path
from flask_cors import CORS






app = config.connex_app
# CORS(app.app)

app.add_api(config.basedir / "swagger.yml")
# def before_request():
#     # Your logic here before handling the request
#     print("attaching user if login logic here to the request")
#     pass

# app.before_request(before_request)
stripe.api_key = "sk_test_QDOw3l4W4TnKE6Hb3I7TMQO100KfBdpOtg"


@app.route("/")
def home():
    users = User.query.all()

    return render_template("home.html",users=users)



@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        amount = 1000  # Amount in cents (adjust as needed)
        currency = 'usd'
        
        intent = stripe.PaymentIntent.create(
            amount=1000,  # Replace with the actual amount
            currency='usd',
            payment_method_types=['card']
  # You can specify other payment method types here
        )

        return jsonify({'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# This below is working but unable to add similar authentication using only swagger.yml
# @app.route("/users")
# @jwt_required()
# def protected_users():
#     users = User.query.all()
#     user_schema = UserSchema(many=True)
#     return user_schema.dump(users)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)