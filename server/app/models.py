from . import db 

    # Represents an item in the inventory with a name, description, and price.
    # This SQLAlchemy model maps to the 'item' table in the database and is used
    # for creating, retrieving, updating, and deleting item records through the API.

class Item(db.Model):         
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)  # store hashed password
