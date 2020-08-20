const User = require('../../models/user.js');
const bcrypt = require('bcrypt');
const passport = require('passport');

let authController = {

  login:(req,res)=>{   res.render('auth/login') },
  loginPost:(req,res,next)=>
  {
     let {email,password} = req.body;

     if(!email || !password)
     {
       req.flash('error_msg','Please fill in both the fields');
       return res.redirect('/login');
     }

  /*
  By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not
  be invoked. If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.
  */
  passport.authenticate('local',(err,user,info) => // err,user,info come from the done function;  done(null,false,{message:'Hello'})
  {

  if(err)
  {
    // info.message comes from message object;
    req.flash('error_msg',info.message);
    return next(err);

  }
  if(!user)
  {
    req.flash('error_msg',info.message); // Checks if user is false,if it is go back to login ;
    return res.redirect('/login');
  }

/*
Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.
When the login operation completes, user will be assigned to req.user
*/

  req.logIn(user,(err)=>{

  if(err)
  {

  req.flash('error',info.message);
  return next(err);

  }
  // If there's no error go back to main page
  return res.redirect('/');
  })

})(req,res,next)


  },
  register:(req,res)=>{ res.render('auth/register.ejs') },
  registerPost:async(req,res)=>{
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
       return res.redirect('/register');
    }
  });
console.log(password);
// Hash the password;
let hashedPassword = await bcrypt.hash(password,10);
console.log(hashedPassword);
// Making a new user (CREATE);
  let user = new User(
    {
    username,
    email,
    password: hashedPassword
    });

    console.log(user);


// Saving the user;
user.save().then(()=>{ return res.redirect('/')})
.catch((e)=>{
  req.flash('error_msg',`User couldn't be saved`);
  req.flash('username',username);
  req.flash('email',email);
  return res.redirect('/register');
})


},
logOut:(req,res)=>{
  req.logout();
  return res.redirect('/login');
}

}

module.exports = authController;
