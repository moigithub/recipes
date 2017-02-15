var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
	name: String,
	photoUrl: String,
	ingredients: Array,
	preparation: String,
	category: Array,
	likes: {type: Number, default:0},
	date: { type: Date, default: Date.now },
	userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Recipe', recipeSchema);