const express = require("express");
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('html', require('ejs').renderFile);
app.use(express.static("public")); 

// routes
app.get('/', function(req, res, next) {
    res.render("index.html");
});

app.get('/new-asset', function(req, res, next) {
    res.render("new-asset.html");
});

app.post('/new-asset', function(req, res, next) {
    let successful = false;
    let message = ""; 
    
    if(req.body.category == "" || req.body.manufacturer == "" || req.body.model == "" || req.body.acquired == ""
        || req.body.paid == "" || req.body.condition == "" || req.body.warrenty == "" || req.body.located == "") {
        message = "Missing information above. Please fill out to continue"; 
    } else {
        successful = true; 
    }
    
    // Return success or failure
    res.json({
        successful: successful,
        message: message
    });
});

// server listener 
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server..."); 
});
