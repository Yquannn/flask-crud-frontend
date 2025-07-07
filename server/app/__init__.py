from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager  # ✅ Add this
from config import Config
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()  # ✅ Initialize JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)
    jwt.init_app(app)  # ✅ Link JWT with your Flask app

    with app.app_context():
        from . import models, routes
        from .auth import routes as auth_routes
        db.create_all()

    return app
