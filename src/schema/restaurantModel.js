var mongoose = require('mongoose');
var mongourl = 'mongodb://restUser:restUser123#@ds117311.mlab.com:17311/restreco'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var restaurantSchema = new mongoose.Schema({
	rest_name: {type: String},
	rest_id: {type: Number, unique: true},
	rest_cuisine : {type: String},
	rest_lat: {type: String},
	rest_lng: {type: String}
});

restaurantSchema.plugin(autoIncrement.plugin, {model: 'restaurant', field: 'rest_id'});

var restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurant;