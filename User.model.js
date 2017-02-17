var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local: {
		email: String,
		password : String
	},
	facebook : {
		id: String,
		token : String,
		email : String,
		name : String
	},
	twitter : {
		id: String,
		token : String,
		displayName : String,
		username : String
	},
	google : {
		id: String,
		token : String,
		email : String,
		name : String
	}
}
, {
  toObject: {
  	virtuals: true
  },
  toJSON: {
 	 virtuals: true 
  }
});

userSchema.virtual('showName')
	.get(function(){

		if(this.local && this.local.email){
			return this.local.email;
		} else if(this.twitter && this.twitter.displayName){
			return this.twitter.displayName;
		} else if(this.facebook && this.facebook.name){
			return this.facebook.name;
		} else if(this.google && this.google.name){
			return this.google.name;
		}

		return "";
	});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(passport, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);