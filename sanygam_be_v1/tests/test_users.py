import pytest
from config import app
from handlers import signup



@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_signup(client, mocker):
    # Mock the send_email function
    # mocker.patch('your_flask_app.send_email')

    # Define sample signup data
    signup_data = {
        'email': 'test@example.com',
        'fname': 'John',
        'lname': 'Doe',
        'password': 'secure_password',
        'gender': 'Male',
        'timestamp': '2022-01-01 12:00:00',  # Use a valid timestamp
    }

    # Make a POST request to the signup endpoint
    response = client.post('/signup', json=signup_data)

    # Assert that the response status code is 201 (created)
    assert response.status_code == 201

    # Assert that the send_email function was called
    # assert your_flask_app.send_email.called

    # Parse the JSON response
    data = response.get_json()

    # Assert the expected response structure
    assert 'id' in data
    assert 'fname' in data
    assert 'lname' in data
    assert 'gender' in data
    assert 'timestamp' in data

    # Assert the expected values
    assert data['fname'] == signup_data['fname']
    assert data['lname'] == signup_data['lname']
    assert data['gender'] == signup_data['gender']

    # Clean up any created user (if applicable)
    # (You may need to implement a method for deleting a user in your app)

    # Optionally, you can assert other conditions based on your specific requirements
