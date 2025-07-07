from flask import request, jsonify
from . import db
from .models import Item
from flask import current_app as app



@app.route('/api/items', methods=['POST'])  # this function is used to create a new item
def create_item():
    data = request.get_json()

     # validate if the name is empty or price is less than 0 
    if not data.get('name') or len(data['name'].strip()) == 0 or data.get('price', 0) <= 0:
        return jsonify({'error': 'Name is required and price must be greater than 0'}), 400


    item = Item(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price']
    )
    db.session.add(item)
    db.session.commit()

    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'price': item.price
    }), 201

@app.route('/api/items', methods=['GET'])          # this function is used to get all items
def get_items():
    items = Item.query.all()
    return jsonify([
        {
            'id': i.id,
            'name': i.name,
            'description': i.description,
            'price': i.price
        } for i in items
    ])

@app.route('/api/items/<id>', methods=['GET'])          # this function is used to get a specific item
def get_item(id):
    item = Item.query.get_or_404(id)
    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'price': item.price
    })

@app.route('/api/items/<id>', methods=['PUT'])          # this function is used to update a specific item
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.price = data.get('price', item.price)
    # validate if the name is empty or price is less than or equal to 0 
    if not data.get('name') or len(data['name'].strip()) == 0 or data.get('price', 0) <= 0:
        return jsonify({'error': 'Name is required and price must be greater than 0'}), 400
    db.session.commit()
    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'price': item.price
    })

@app.route('/api/items/<id>', methods=['DELETE'])          # this function is used to delete a specific item
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'})


# @app.route('/api/show-secret')
# def show_secret():
#     secret = current_app.config['JWT_SECRET_KEY']
#     return jsonify({'jwt_secret': secret})
