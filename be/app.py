from flask import render_template,abort,jsonify # Remove: import Flask
import config
from flask_migrate import Migrate
# from handlers.users import read_all

from config import app, db  # Assuming your Flask app instance is named 'app'
migrate = Migrate(app, db)






connex_app = config.connex_app
connex_app.add_api(config.basedir / "swagger.yml")


if __name__ == "__main__":
    connex_app.run(host="0.0.0.0", port=8000, debug=True)