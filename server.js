const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');


// Set up template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
  res.render('home');
})


app.listen(port,()=>console.log('Listening to the server ... '));
