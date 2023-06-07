from flask import Flask, jsonify, render_template, request, make_response, session as browser_session
from extensions import *
from models import db, User, Cart, Wine_inventory, Order,Comments
from random import randint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'BAD_SECRET_KEY'
app.json.compact = False

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)


@app.route('/wine_inventory', methods=['POST','GET','PATCH'])
def wine_inventory_populate():

    if request.method == 'GET':
        wines = Wine_inventory.query.order_by(Wine_inventory.id).all()

        each_wine_dicted = [wine.to_dict() for wine in wines]
        return make_response(jsonify(each_wine_dicted), 200)

    elif request.method == 'POST':
        data = request.get_json()

        for wine_data in data:
            new_wine = Wine_inventory(
                wine_name=wine_data['wine_name'],
                winery=wine_data['winery'],
                location=wine_data['location'],
                average_rating=wine_data['average_rating'],
                number_of_reviews=wine_data['number_of_reviews'],
                image=wine_data['image'],
                stock=wine_data['stock'],
                price=wine_data['price']
            )
            db.session.add(new_wine)
        db.session.commit()

        return make_response(jsonify({'Status':'Post is successful'}), 201)

    elif request.method == 'PATCH':
        data = request.get_json()


        ##MAYBE IMPLEMENT A FOR-LOOP HERE
        wine_inventory = Wine_inventory.query.filter_by(id=data['wine_id']).first()
        ## IF QUANTITY_ORDERED IS GREATER THAN THE STOCK ??
        wine_inventory.stock -= data['quantity_ordered']
        
        db.session.commit()

        return make_response(jsonify(wine_inventory.to_dict()),200)
        ## TEST WITH POSTMAN

@app.route('/wine_inventory/<int:id>', methods = ['GET'])
def wine_by_id(id):
    wine_object = Wine_inventory.query.filter_by(id=id).first()

    return make_response(jsonify(wine_object.to_dict()), 200)


@app.route('/user', methods=['POST'])
def sign_up():

    if request.method == 'POST':
        data = request.get_json()

        new_user = User(
            email=data['email'],
            fullname=data['fullname'],
            username=data['username'],
            password=data['password'],
            shippingaddress=data['shippingaddress'],
            CreditCard=data['CreditCard']
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(new_user.to_dict()), 201)
    

@app.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        user = User.query.filter_by(username = username).first()

        if not user:
            return jsonify({'error': 'invalid login'}), 404
        
        browser_session['user_id'] = user.id
        return jsonify(username), 201
    
@app.route('/check_session', methods=['GET'])
def CheckSession():

    if request.method == 'GET':
        user_id = browser_session.get('user_id')
        user = User.query.filter(User.id == user_id).first()

        if user:
            return jsonify(user.to_dict()), 200
        
        if not user:
            return jsonify({'error': 'not authorized'}), 401
        
@app.route('/logout', methods=['DELETE'])
def logging_out():

    if request.method == 'DELETE':
        browser_session['user_id'] = None
        return jsonify({'message': '204: No Content'}), 204

@app.route('/users', methods=['GET'])
def check_users():
    if request.method == 'GET':
        users = User.query.order_by(User.id).all()

        each_user_dicted = [user.to_dict() for user in users]

        return make_response(jsonify(each_user_dicted), 200)
    
@app.route('/cart_user_id/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def cart_by_userid(id):
    user = User.query.filter_by(id=id).first()

    if request.method == 'GET':
        cart_items_dict = [item.to_dict() for item in user.carts]
        return make_response(jsonify(cart_items_dict), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()

        try:
            cart_item = Cart.query.filter_by(user_id=id, wine_id = data['wine_id']).first()
            cart_item.quantity_ordered += data['quantity_ordered']
            db.session.commit()
        
        except Exception:
            return make_response(jsonify({'error': 'Invalid input'}), 422)

        return make_response(jsonify(cart_item.to_dict()), 200)

@app.route('/new_cart_item', methods = ['POST'])
def new_cart_item():
    
    if request.method == 'POST':
        data = request.get_json()

        new_item = Cart(
            wine_name = data['wine_name'],
            winery = data['winery'],
            image = data['image'],
            user_id = data['user_id'],
            price = data['price'],
            quantity_ordered = data['quantity_ordered'],
            average_rating = data['average_rating'],
            number_of_reviews = data['number_of_reviews'],
            wine_id = data['wine_id']
        )

        db.session.add(new_item)
        db.session.commit()
        return make_response(jsonify(new_item.to_dict()), 201)


@app.route('/cart_item/<int:id>', methods=['GET','DELETE'])
def cart_item(id):
    item = Cart.query.filter_by(id=id).first()

    if item is None:
       return make_response(jsonify({'error': 'Not found'}), 404)


    elif request.method == 'GET':
        return make_response(jsonify(item.to_dict()), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return make_response(jsonify({'Deleted': True}), 202)
    


@app.route('/cart_to_orders/<int:id>', methods=['POST', 'DELETE'])
def cart_to_order(id):

    cart_items = Cart.query.filter_by(user_id=id).all()
    if request.method == 'POST':
        
        
        for item in cart_items:
            order_item = Order(wine_name = item.wine_name, winery=item.winery, location=item.location, number_of_reviews=item.number_of_reviews, image=item.image, quantity_ordered=item.quantity_ordered, price=item.price, user_id=item.user_id)
            db.session.add(order_item)
        db.session.commit()

        return make_response(jsonify({'Post': 'Success'}), 201)
    
    if request.method == 'DELETE':

        for item in cart_items:
            db.session.delete(item)
        db.session.commit()

        return make_response(jsonify({'Delete':'Success'}),204)

# build order_wine object
# order_wine.wine = <wine object>
# order_wine.order = <order object>
# then commit

@app.route('/orders/<int:id>', methods=['GET'])
def order_by_id(id):
    orders = Order.query.filter_by(user_id = id).all()

    return make_response(jsonify([order.to_dict() for order in orders]), 200)

@app.route('/comments_by_wine/<int:id>', methods=['GET'])
def get_comments_by_wine(id):
    comments = Comments.query.filter_by(wine_id=id).all()

    return make_response(jsonify([comment.to_dict() for comment in comments]), 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
