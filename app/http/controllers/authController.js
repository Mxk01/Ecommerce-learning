let authController = {
  login:(req,res)=>{   res.render('auth/login') },
  register:(req,res)=>{ res.render('auth/register.ejs') },
  registerPost:(req,res)=>{
   let {username,email,password} = req.body;
   console.log(username);
   }
}

module.exports = authController;
