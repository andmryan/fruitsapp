const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});


module.exports = router;