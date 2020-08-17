const Menu = require('../../models/menu.js');


let homeController = {

index:async(req,res)=>
{

  const pizzas =  await Menu.find();
  // console.log(pizzas);
  res.render('home',{pizzas});
/*    Menu.find().then((pizzas)=>
 {
 // Finding all menu items from db and displaying them in our views;
   console.log(pizzas);
   return res.render('home',{pizzas})
 })
*/
}

}


module.exports = homeController;
