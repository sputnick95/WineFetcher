from app import app
from random import choices as rc
from models import db, User, Cart

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        
        print("Seeding Users...")
        users = [
            User(email='galen.sato@gmail.com', password="lawandorderfiend", username='galen_satosan'),
            User(email="teconomou7@hotmail.com", password = "knicks4Eva92", username="the_pedro_pascal"),
            User(email="nicksap@ymail.com", password="GreekFreakBucky22", username="sputnick"),
            User(email="siddykittens@aol.com", password="wholeFoodsHomie09", username="cat_touchthis")
        ]


        db.session.add_all(users)


        carts = [
            Cart(wine_name="Montrachet Grand Cru 2010", winery="Domaine de La Romanée-Conti", image="https://images.vivino.com/thumbs/rORmihtxSrKG7SfuI0bD6w_pb_x300.png", user_id=1)
        ]

        db.session.add_all(carts)
        db.session.commit()