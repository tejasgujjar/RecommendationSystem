from __future__ import print_function
from pymongo import MongoClient
import re

def twitter_update(restaurant,state):
    if state == 0:
        return True
    restaurant_name  = restaurant[1:].replace("_"," ").lower()
    connection = MongoClient("ds117311.mlab.com", 17311)
    db = connection['restreco']
    db.authenticate("restUser", "restUser123#")
    val = 0
    if state == 1:
        db.restaurants_dump.update_one({"name": re.compile(restaurant_name, re.IGNORECASE),"rating":{"$lt":5}}, {
            '$inc': {
                'rating': 0.1
            }
        }, upsert=False)
    elif state == -1:
        db.restaurants_dump.update_one({"name": re.compile(restaurant_name, re.IGNORECASE), "rating": {"$gt": 0}}, {
            '$inc': {
                'rating': -0.1
            }
        }, upsert=False)

    return True


twitter_update("#cloudz_hookah_lounge",1)

