const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const webRoute = require('./routes/web');
const session = require('express-session');
const flash = require('express-flash');
// require('./routes/web')(app)   - Router under the hood;
const dotenv = require('dotenv');
const MongoDbStore = require('connect-mongo')(session); // To store session data into the db
dotenv.config();


// Connect to mongoose
mongoose.connect('mongodb://localhost/Pizzas',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true})
let connection = mongoose.connection;
connection.once('open',()=>console.log('Connected to mongoose ...')).catch((e)=>{
  console.log('Connection failed with this error : '+e)
})

// Storing session
let mongoStore = new MongoDbStore(
  {
    mongooseConnection:connection, // Make sure we use this connection
    collection:'sessions' // Sessions will be stored in this connection
  }
)

// Session config;
app.use(session({
  secret:process.env.COOKIE_SECRET, // Secret is used to encrypt our data
  resave: false, // Resave data saves registration data when data is not modified
  saveUninitialized: true // this helps in identifying the user (like data won't be saved in the db if the user didn't choose that)
  // cookie: { secure: false } // b/c we're not using https
  ,store: mongoStore,
  cookie:{maxAge:1000*60*60*24}, // No of ms the cookie will be available (24hrs)
  // session:{maxAge:1000*15*600*24}
}))


app.use((req,res,next)=>{
  res.locals.session = req.session; // We set this up after setting up cart in the session to use it in the views and get cart data
  next();
});
// Setting up flash
app.use(flash());

// For form data
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//  '/'
app.use('/',webRoute);

// Serving up static files
app.use(express.static('public'));

// Set up template engine
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


app.listen(port,()=>console.log('Listening to the server ... '));
