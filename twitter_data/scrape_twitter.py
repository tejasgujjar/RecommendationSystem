import tweepy

consumer_key = "KYS0m11ML0WWuftNvjdaKF7iR"
consumer_secret = "hKszS7x6pmkblS4iIa6Z5UkNpogucRK45T81T5DRoStmxn2a6y"
access_token = "84014050-tgU5RY2ekrdRrQh4xVcZzuTHdbIimZ3SsFjobEn1J"
access_token_secret = "SKtdtX1856iCTWk1UVARjLT3ObR3OGvnuIAiVHiv6U7uT"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

public_tweets = api.home_timeline()
# for tweet in public_tweets:
#     print "-----------------------------------------------------------------------------------"
#     print tweet.text

cricTweet = tweepy.Cursor(api.search, q='restaurant').items()
for tweet in cricTweet:
    print "=================================================================================="
    print "Created at: ",tweet.created_at
    print "Tweet: ",tweet.text
    print "lang:", tweet.lang
    print "geo:", tweet.geo
    try:
        print "place country name:", tweet.place.country
        print "place name:", tweet.place.name
    except:
        print "No place found"
    # print "User:", tweet.user
    print "User Location:", tweet.user.location
    print "User name:", tweet.user.name
