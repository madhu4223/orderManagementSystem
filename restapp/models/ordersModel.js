
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
     Schema = mongoose.Schema

ordersModel = new Schema({
    order_number:{
        type:Number
    },
    due_date:{
        type:Object
    },
    buyer_name:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    order_total:{
        type:Number
    },
    status:{
        type:Number,
        enum:[1,2], /// 1- active 2-deleted
    }

    
});

module.exports = mongoose.model('orders',ordersModel,'orders');
