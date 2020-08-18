const User = require('../../models/user.js');
let authController = {
  login:(req,res)=>{   res.render('auth/login') },
  register:(req,res)=>{ res.render('auth/register.ejs') },
  registerPost:(req,res)=>{
    // Getting data from req.body;
   let {username,email,password} = req.body;

   // Flashing messages (then making res.locals variables in server.js);
   if(!username || !email || !password )
   {
     req.flash('error_msg','Please insert all the fields'); // We use this to display a message to the frontend user;
     req.flash('username',username); // Those will be used to prepopulate data
     req.flash('email',email);
     req.flash('password',password);
     return res.redirect('/register');
   }

  // Checking for duplicates
   User.exists({email},(err,result)=>{
     if(result)
     {
       req.flash('error_msg','Email already taken');
       req.flash('username',username); // Those will be used to prepopulate data
       req.flash('email',email);
       return res.redirect('/');
    }
  });

// Making a new user; 
  let user = new User({name,email,password});



   }
}

module.exports = authController;
