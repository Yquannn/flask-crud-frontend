import os

# # path to the database file
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # JWT_SECRET_KEY = 'your-super-secret' 
    # JWT_TOKEN_LOCATION = ['headers']     
