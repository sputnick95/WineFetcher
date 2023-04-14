from sqlalchemy import create_engine, MetaData, Table

def droppingtable():
    # create engine and metadata objects
    engine = create_engine('postgresql://app.db')
    metaData = MetaData(bind=engine)

    # get the table to be dropped
    my_table = Table('my_table', metaData, autoload=True)

    # drop the table
    my_table.drop()

droppingtable()