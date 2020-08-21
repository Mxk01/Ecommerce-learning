const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const orderSchema = new Schema({

customerId:
{

  // This is a relation between two mongoose models
  type:mongoose.Schema.Types.ObjectId, // ObjectId  is an unique identifier which belongs to the user which has placed this order;
  ref:'User', // Here we specify that we want the  id of that user from the User model 
  required:true
},

items:
{
  type:Object,
  required:true
},

phone:
{
  type:String,
  required:true
},

address:
{
  type:String,
  required:true
},

paymentType:
{
type:String,
default:'COD'
},

status:
{
  type:String,
  default:'order_placed'
}


},{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);
