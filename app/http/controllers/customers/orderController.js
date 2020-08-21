const Order = require('../../../models/order.js');
const moment = require('moment');

let orderController = {

store:(req,res)=>
{

  const {phone,address} = req.body;
  if(!phone || !address)
  {
    req.flash('error_msg','All fields must be completed');
    return res.redirect('/cart'); // Go back to cart to complete
  }
  let customerId = req.user._id; // Remember this is the id of the logged in user
  // that we get by calling req.logIn

  // Making a new order;
  let order = new Order({
    phone,
    address,
    customerId,
    items:req.session.cart.items //  (check cart controller)
  })


// Saving the order;
order.save().then((result)=>{

 req.flash('success_msg','Your order has been placed succesfully');
 // delete req.session.cart;
 console.log('Fuck yh');
 return res.redirect('/customers/orders');

}).catch((err)=>{

 req.flash('error_msg','Your order could not be saved');
 console.log(`Order data can't be displayed :( `);
 return res.redirect('/cart');

});


},
showOrders:async(req,res)=>
{
  // Sorting orders by creationDate :  1 is ascending , -1 descending
  const orders =  await Order.find({customerId:req.user._id},null,{ sort: { 'createdAt':1 } });
  console.log('Order data can be displayed 😀');
  return res.render('customers/orders',{orders,moment});
  /* We can also pass a module in this customer/orders file and then
  format date in our file */
}



};

module.exports = orderController;
