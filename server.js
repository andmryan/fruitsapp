/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config(); //load env variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan - morgan is a package that logs routes. (totally optional btw)
const methodOverride = require('method-override'); //import method override. Remember html forms only allows POST and GET. This expands on that limitation. We will be using PUT and DELETE also
const FruitRouter = require('./controllers/fruit');
const UserRouter = require('./controllers/user');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const Fruits = require('./models/fruit');

const PORT = process.env.PORT;
const app = express(); 

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan('tiny')); //makes use of morgan
app.use(methodOverride('_method')); //looks for the request's query parameter with a key of '_method' and will use the value (such as PUT or DELETE)
// app.use(express.json());// only use this if we are doing postman's body -> raw -> JSON 
app.use(express.urlencoded({ extended: true })); // parse urlencoded requests. reads form data
app.use(session({
    secret: process.env.secret,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}));

//placement of our routes is critical here becuase we want all our middleware above to be applied
// the first arguement will act route prefix which will append all routes that are defined in the second argument (FruitRouter)
app.use('/fruit', FruitRouter);
app.use('/user', UserRouter);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
//this will be a test route
app.get('/', async (req, res) => {
    const allFruits = await Fruits.find({});
    res.render("landing.ejs", { allFruits });
});


app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});








