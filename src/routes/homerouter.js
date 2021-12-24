const express = require('express'); 
const homeRouter = express.Router();
const nav = require('../data/nav');

homeRouter.get('/',function(req,res){
    const navList = nav;

    res.render('home',{
        nav: navList
    });
    
})







module.exports = homeRouter;