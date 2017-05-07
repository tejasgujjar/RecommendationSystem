var mongoose = require('mongoose');
var mongourl = 'mongodb://restUser:restUser123#@ds117311.mlab.com:17311/restreco'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var restaurantDataSchema = new mongoose.Schema({
	rating:{type:Number},
	review_count:{type:Number},
	name: {type: String},
	url: {type: String}
});

//restaurantDataSchema.plugin(autoIncrement.plugin, {model: 'restaurants_dump', field: 'rest_id'});

var restaurants_dump = mongoose.model('restaurants_dump', restaurantDataSchema);

module.exports = restaurants_dump;