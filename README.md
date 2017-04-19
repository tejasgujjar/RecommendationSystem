# RecommendationSystem

## Front-end technologies
* Angular JS, 
* Bootstrap
* nvD3

## Back-end technologies
* Node JS
* Express JS
* MongoDB 

## Set up
* To auto restart node server on change of file, use $npm install -g nodemon and start server with 'nodemon' instead of 'node'. Refer: https://github.com/remy/nodemon
  
#### Mongo DB
1. Download MongoDB zip from https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/, untar it and export the path with the command $ export PATH=\<mongodb-install-directory\>/bin:$PATH
2. Run mongoDB $ mongod --dbpath \<path where you want to run the db\>
Refer: http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/

- UI template https://github.com/start-angular/ani-theme/blob/master/README.md

* Created mongodb in local directory. DB name: recommendme_db
* Run misc/sample.py to update the DB with the restaurant dataset. 

#### Important links
* Twitter text analysis: https://marcobonzanini.com/2015/03/09/mining-twitter-data-with-python-part-2/

#### To-Do
* Recommendation engine setup - Yashas
* Sign in - sign up page (with db update) - Kushal
* Backend request handling (Home page) and reviews update  - Tejas
* Twitter data wrt restaurant and updating db - Ashwin
