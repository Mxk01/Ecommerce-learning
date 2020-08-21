
const express = require('express');
const router = express.Router();
const {index} = require('../app/http/controllers/homeController');
const {login,register,registerPost,loginPost,logOut} = require('../app/http/controllers/authController');
const {showCart,updateCart} = require('../app/http/controllers/customers/cartController');
const {main} = require('../app/http/controllers/admin/orderController');
const {store,showOrders} = require('../app/http/controllers/customers/orderController');
const guest = require('../app/http/middleware/guest.js');
const auth = require('../app/http/middleware/auth.js');

router.get('/',index);



// Cart and order  routes;
router.get('/cart',showCart);
router.post('/update-cart',updateCart);
router.post('/orders',auth,store)
router.get('/customers/orders',auth,showOrders); // Route for displaying address,user id date of the order;

// Auth post routes
router.post('/login',loginPost);
router.post('/register',registerPost);
router.post('/logout',logOut);

// Auth get routes;
router.get('/login',guest,login);
router.get('/register',guest,register);

// Admin routes;
// router.get('/admin/orders',auth,callback);

module.exports = router;












































/*  Router under the hood
function initRoutes(app)
{
  app.get('/',(req,res)=>{
    res.render('home');
  })
  app.get('/cart',(req,res)=>{
    res.render('customers/cart.ejs');
  })
  app.get('/login',(req,res)=>{
    res.render('auth/login.ejs');
  })
  app.get('/register',(req,res)=>{
    res.render('auth/register.ejs');
  })
}
}
module.exports = initApp;
*/
