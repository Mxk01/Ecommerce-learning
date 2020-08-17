let cartController = {
  showCart:(req,res)=>{   res.render('customers/cart') },
  updateCart: (req, res) => {
             /* Checking if there is no cart data stored in the session
               If there isn't store cart in the session ( then assigning it to a new variable) which has the following fields :
               1.  items object {}  which is used for storing item data like pizza name  or id;
               2.  totalQty - total pizza quantity
               3.  totalPrice
            */
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // Check if item does not exist in cart
            if(!cart.items[req.body._id]) {
              /* Inside items we create a new property
              cart  = {
              items:
              {
              '9q90uq2id':
              {
              item:
              {
              // req.body data
            },
            qty:1
            }
          },
          totalQty:0,
          totalPrice:0
           }

               */
               // req.body._id  comes from pizza object ( axios post ), _id is the unique id of the element we've added

                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1 // Increase total qty of product
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice =  cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        }
  }

module.exports = cartController;
