var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
	name: String,
	photoUrl: String,
	ingredients: Array,
	preparation: String,
	category: Array,
	likes: {type: Array, default:[]}, //array of usersId
	date: { type: Date, default: Date.now },
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Recipe', recipeSchema);