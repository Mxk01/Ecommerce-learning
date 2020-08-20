const LocalStrategy = require('passport-local').Strategy; // This means we'll be using the local strategy
const User = require('../models/user');
const bcrypt = require('bcrypt');




function initPassport(passport)
{

  // done function will be called once user has been authenticated
  let authenticateUser = async(email,password,done) => {
  let user = await User.findOne({email});

  // Checking if there's no user;
  if(!user)
  {
  return  done(null,false,{message:'There is no user'})
  }


  bcrypt.compare(password,user.password).then((match)=>{
    if(match)
    {
    return  done(null,user,{message:'Logged in'}); // Upon calling this user (will be returned and user )data can be used by serializeUser;
    }
    return  done(null,false,{message:'Bad password or username'}); // Passwords didn't match;
  }).catch((e)=>{
    return  done(null,false,{message:'Something went wrong'});
  })


  }





  // Create a new local strategy for logging in users.
  // Username field means that we'll be logging in the user with their email and password;
  passport.use(new LocalStrategy({usernameField:'email'},authenticateUser));


  /*                  S  E  R  I  A  L I  Z  E      U  S  E  R

     We're getting the user object upon calling done(null,user) then once serializeUser is called  the user will be attached to our session
     variable :  req.session.passport.user._id = 'wk902ja';
     user is a certain document in our mongodb database;
  */
    passport.serializeUser((user,done)=>
    {
        done(null,user._id); // user object is returned upon calling done(null,user); We can get user._id from that object;
    });


         /*                 D  E  S  E  R  I  A  L I  Z  E      U  S  E  R
            With deserializeUser  we can retrieve user data back from the session with the help of a key.We get that key upon calling serializeUser
            Then we can use it as our first parameter to retrieve data from user;

         */
          passport.deserializeUser((id,done)=>
          {
             // id comes from upon calling done(user._id) in serializeUser;
            // searching an user with the id stored in the session variable
          User.findById(id,(err,user)=>{ done(err,user) }); // err,user come from mongoose not passport (inside this function)
          })


}




module.exports =  initPassport;
