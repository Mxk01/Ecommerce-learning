
const express = require('express');
const router = express.Router();
const {index} = require('../app/http/controllers/homeController');
const {login,register,registerPost,loginPost,logOut} = require('../app/http/controllers/authController');
const {showCart,updateCart} = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middleware/guest.js');

router.get('/',index);
router.get('/cart',showCart);
router.get('/login',guest,login);
router.get('/register',guest,register);


router.post('/update-cart',updateCart);
router.post('/login',loginPost);
router.post('/register',registerPost);
router.post('/logout',logOut);



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
