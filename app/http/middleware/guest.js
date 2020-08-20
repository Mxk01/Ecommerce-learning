//  If user is already authenticated there's no need for the user to access login and register (that's why we're using this middleware)
// in the get routes

function guest(req,res,next){
  // If user isn't authenticated simply proceed to execute the function handler
  if(!req.isAuthenticated())
  {
    return  next();
  }
 // Otherwise redirect to homepage;
return res.redirect('/');
}

module.exports = guest;
