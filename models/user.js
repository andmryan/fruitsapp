///////////////////////////////////////////////
//////// User model                   ///////// 
///////////////////////////////////////////////

const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

const Users = mongoose.model('user', UserSchema);

module.exports = Users;

//username: 'david'
//password: 'qwerty'

// npm install bcryptjs express-session connect-mongo
//bcryptjs: package that encrypts passwords
//we need to encrpty because we cannot just save raw password in the db

// express-session: middleware for create session cookies
// this middle ware will determine if we are logged in or not from the presence of a cookie
// and this cookie must be valid

//connect-mongo: allows express sesssion to save data in our mongo db

//create 2 pages a sign up page and a login page