var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
     Schema = mongoose.Schema

userModel = new Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    }
});

userModel.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
userModel.methods.validatePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('users',userModel,'users');
