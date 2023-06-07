from app import app
from random import choices as rc
from models import db, User, Cart, Order, Wine_inventory, OrderWine, Comments

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Comments.query.delete()
        
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
        

        orders = [
            Order(wine_name="Meursault Les Rougeots 2005", location='France\n·\nMeursault', winery='Olivier Leflaive', price=50, user_id=1),
            Order(wine_name="Vin de Pays de l'Hérault Blanc 2007", location='France\n·\nHérault', winery='La Grange des Pères', price=780, user_id=1)
        ]

        db.session.add_all(orders)

        wines = [
            Wine_inventory(wine_name="Meursault Les Rougeots 2005", location='France\n·\nMeursault', winery='Olivier Leflaive', price=50, image='https://images.vivino.com/thumbs/l5W5NRvZR_SzClIDSnG5Ag_pb_x300.png', stock=3),
            Wine_inventory(wine_name="Vin de Pays de l'Hérault Blanc 2007", location='France\n·\nHérault', winery='La Grange des Pères', price=780, image='https://images.vivino.com/thumbs/tBJyYsUeTxuYIPy6oS5T4A_pb_x300.png', stock=2),
            Wine_inventory(wine_name="Montrachet Grand Cru 2010", winery="Domaine de La Romanée-Conti", image="https://images.vivino.com/thumbs/rORmihtxSrKG7SfuI0bD6w_pb_x300.png", location='France\n·\nMontrachet Grand Cru', price=900, stock=1)
        ]

        db.session.add_all(wines)

        order_join_wine =[
            OrderWine(price=50, quantity_ordered=1, order_id=1, wine_id=1),
            OrderWine(price=780, quantity_ordered=2, order_id=2, wine_id=2),
        ]

        db.session.add_all(order_join_wine)

        one_comment = Comments(id=1, comment="Fantastic. Nice body; perfect acid balance. Like voting into a slice of pineapple cake.",likes=4, dislikes=0, user_id=14, wine_id=2)

        db.session.add(one_comment)

        many_comments = [
            Comments(id=2, comment="The most expensive bottle I ever tasted. Honey, walnuts, vanilla. The aroma is endless and very deep. Premium quality",likes=1, dislikes=1, user_id=1, wine_id=2),
            Comments(id=3, comment="I promised mr. Bok Montrachet by Drouphin, but it is too young! So, this vintage I already posted, but still excited with this! Apples, vanilla, smooth chalky and butter, very complexity and full-bodied Amazing wine! Very recommend! Cheers, dear Bok! I will search for right vintage!",likes=0, dislikes=0, user_id=4, wine_id=2)
        ]

        db.session.add_all(many_comments)




        db.session.commit()