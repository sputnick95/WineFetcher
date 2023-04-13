from extensions import db
from sqlalchemy.orm import validates

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    carts = db.relationship('Cart', backref='user')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
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

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "wine_name": self.wine_name,
            "winery": self.winery,
            "location": self.location,
            "average_rating": self.average_rating,
            "number_of_reviews": self.number_of_reviews,
            "image": self.image
        }




