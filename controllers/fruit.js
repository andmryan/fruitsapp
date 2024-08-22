
const express = require('express');
const Fruits = require('../models/fruit');

const router = express.Router();

router.get('/', async (req, res) => {
    const fruits = await Fruits.find({});
    res.render('index.ejs', { fruits })
});


router.get('/new', async (req, res) => {
    res.render('new.ejs');
});


router.post('/', async (req, res) => {
    //convert the string to be boolean
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruits.create(req.body);
    res.redirect('/fruit');
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruits.findById(id);
    res.render('edit.ejs', { fruit });
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruits.findByIdAndUpdate(id, req.body);
    res.redirect('/fruit');
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Fruits.findByIdAndDelete(id);
    res.redirect('/fruit');
});


module.exports = router;