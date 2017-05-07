var mongoose = require('mongoose');
var mongourl = 'mongodb://restUser:restUser123#@ds117311.mlab.com:17311/restreco'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var userSchema = new mongoose.Schema({
	user_firstname: {type: String},
	user_lastname: {type: String},
	user_email: {type: String},
	user_password: {type: String},
	user_id: {type: Number, unique: true},
	//user_cuisine : [{type: String}],
	user_streetName : {type: String},
	user_state : {type: String},
	user_city : {type: String},
	user_zipcode : {type: String},
	user_country : {type: String},
	user_phone: {type: String},
	user_latitude: {type: String},
	user_longitude: {type: String},
});

userSchema.plugin(autoIncrement.plugin, {model: 'users', field: 'user_id'});

var user = mongoose.model('users', userSchema);

module.exports = user;