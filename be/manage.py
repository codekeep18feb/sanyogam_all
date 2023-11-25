# manage.py
from flask_migrate import Migrate
from flask.cli import FlaskGroup
from config import app, db  # Assuming your Flask app instance is named 'app'

migrate = Migrate(app, db)
cli = FlaskGroup(app)

if __name__ == '__main__':
    cli()
