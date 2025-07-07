from flask import request, jsonify
from flask import current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
# from app.models import User
from app import db  # required to commit new users

# @app.route('/api/register', methods=['POST'])
# def register():
#     """
#     Registers a new user.
#     """
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     if not username or not password:
#         return jsonify({'error': 'Username and password are required'}), 400

#     if User.query.filter_by(username=username).first():
#         return jsonify({'error': 'Username already exists'}), 409

#     hashed_password = generate_password_hash(password)
#     new_user = User(username=username, password=hashed_password)

#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({'message': 'User registered successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    """
    Logs in a user and returns a JWT token.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Generate access token
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)
