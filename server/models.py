from extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    fullname = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    shippingaddress = db.Column(db.String)
    CreditCard = db.Column(db.Integer)

    carts = db.relationship('Cart', backref='user')
    orders = db.relationship('Order', backref='user') #new relationship added
    

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'fullname': self.fullname,
            'username': self.username,
            'password': self.password,
            'shippingaddress': self.shippingaddress,
            'CreditCard': self.CreditCard,
            'carts' : [cart.to_dict() for cart in self.carts]
        }

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    wine_name = db.Column(db.String)
    winery = db.Column(db.String)
    location = db.Column(db.String)
    average_rating = db.Column(db.Float)
    number_of_reviews = db.Column(db.String)
    image = db.Column(db.String)
    quantity_ordered = db.Column(db.Integer) #new field added to database
    price = db.Column(db.Integer) #new field added to database


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    wine_id = db.Column(db.Integer, db.ForeignKey('wines.id')) #new field added to database

    def to_dict(self):
        return {
            "id": self.id,
            "wine_name": self.wine_name,
            "winery": self.winery,
            "location": self.location,
            "average_rating": self.average_rating,
            "number_of_reviews": self.number_of_reviews,
            "quantity_ordered": self.quantity_ordered,
            "image": self.image,
            "price": self.price,
            "user_id": self.user_id,
            "wine_id": self.wine_id
        }
    
class Wine_inventory(db.Model):
    __tablename__ = 'wines'

    id = db.Column(db.Integer, primary_key=True)
    wine_name = db.Column(db.String)
    winery = db.Column(db.String)
    location = db.Column(db.String)
    average_rating = db.Column(db.Float)
    number_of_reviews = db.Column(db.String)
    image = db.Column(db.String)
    stock = db.Column(db.Integer)
    price = db.Column(db.Integer)


    cart = db.relationship('Cart', backref='wine')
    order_wine = db.relationship('OrderWine', backref='wine') #new field added to database

    def to_dict(self):
        return {
            "id": self.id,
            "wine_name": self.wine_name,
            "winery": self.winery,
            "location": self.location,
            "average_rating": self.average_rating,
            "number_of_reviews": self.number_of_reviews,
            "image": self.image,
            "stock": self.stock,
            "price": self.price
        }
    


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    wine_name = db.Column(db.String)
    winery = db.Column(db.String)
    location = db.Column(db.String)
    average_rating = db.Column(db.Float)
    number_of_reviews = db.Column(db.String)
    image = db.Column(db.String)
    quantity_ordered = db.Column(db.Integer)
    price = db.Column(db.Integer)
    time_of_order = db.Column(db.DateTime, default=db.func.now()) #add a Time_of_order!!!!
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    order_wine = db.relationship('OrderWine', backref='order') #new field added to database

    def to_dict(self):
        return {
            "id": self.id,
            "wine_name": self.wine_name,
            "winery": self.winery,
            "location": self.location,
            "average_rating": self.average_rating,
            "number_of_reviews": self.number_of_reviews,
            "image": self.image,
            "quantity_ordered": self.quantity_ordered,
            "price": self.price,
            'time_of_order': self.time_of_order
        } 
    

class OrderWine(db.Model): #JOIN TABLE
    __tablename__ = 'order_wine'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    quantity_ordered = db.Column(db.Integer)
    # What else should go in here

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id')) #new field added to database
    wine_id = db.Column(db.Integer, db.ForeignKey('wines.id')) #new field added to database


