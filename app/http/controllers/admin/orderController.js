const Order = require('../../../models/order.js');

let orderController = {
  index:
  async(req,res,next)=>
  {
  let order = await Order.find({status:{$ne:'completed'}},null,{sort:{createdAt:'-1'}}).populate('customerId','-password').exec((err,orders)=>
  {
    res.render('admin/orders');
  });
  }
};

module.exports = orderController;
