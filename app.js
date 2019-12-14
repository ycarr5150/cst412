const express = require("express");
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public")); 

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'password'
})); 

// routes
app.get('/', function(req, res, next) {
    delete req.session.idNumber;
    
    const connection = mysql.createConnection({
        host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ns0xtj5joo1dl0j9',
        password: 'oashevj1wpkaemmg',
        database: 'h2eeztdsfwtqbwbf'
    });
    
    connection.connect();
    
    connection.query(
        'SELECT * FROM assets', function(error, results, fields) {
        if (error) throw error;
        connection.end(); 

        res.render('index.hbs', {
            item: results
        });
    });
});

app.post('/', function(req, res, next) {
    req.session.idNumber = req.body.idNumber; 
    
    // Return success or failure
    res.json({
        successful: true,
        message: ""
    });
}); 

app.get('/new-asset', function(req, res, next) {
    res.render("new-asset.hbs");
});

app.post('/new-asset', function(req, res, next) {
    let successful = false;
    let message = ""; 
    
    if(req.body.category == "" || req.body.manufacturer == "" || req.body.model == "" || req.body.serial == "" || req.body.acquired == ""
        || req.body.paid == "" || req.body.condition == "" || req.body.warrenty == "" || req.body.located == "") {
        message = "Missing information above. Please fill out to continue"; 
    } else {
        // if success, open connection, add asset to database 
        successful = true; 
        const connection = mysql.createConnection({
            host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ns0xtj5joo1dl0j9',
            password: 'oashevj1wpkaemmg',
            database: 'h2eeztdsfwtqbwbf'
        });
        
        connection.connect();
        connection.query(
        `INSERT INTO assets 
        (category, manufacturer, model, serial, acquired, price, cond, warrenty, location, retired, description, comments)
        VALUES ('${req.body.category}', '${req.body.manufacturer}', '${req.body.model}', '${req.body.serial}', '${req.body.acquired}', 
        '${req.body.paid}', '${req.body.condition}', '${req.body.warrenty}', '${req.body.located}', 'N', '${req.body.descrip}', 
        '${req.body.comment}')`
        , function(error, results, fields) {
            if (error) throw error;
        });
        
        connection.end(); 
    }
    
    // Return success or failure
    res.json({
        successful: successful,
        message: message
    });
});

app.get('/show-asset', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ns0xtj5joo1dl0j9',
        password: 'oashevj1wpkaemmg',
        database: 'h2eeztdsfwtqbwbf'
    });
    
    connection.connect();
    
    connection.query(
        `SELECT * FROM assets
        WHERE id = ${req.session.idNumber}`, function(error, results, fields) {
        if (error) throw error;
        connection.end(); 

        res.render('show-asset.hbs', {
            item: results
        });
    });
}); 

app.post('/show-asset', function(req, res, next) {
    let date = new Date();
    let successful = false;
    let message = ""; 
    
    if(req.body.retire == "yes") {
        successful = true; 
        
        const connection = mysql.createConnection({
            host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ns0xtj5joo1dl0j9',
            password: 'oashevj1wpkaemmg',
            database: 'h2eeztdsfwtqbwbf'
        });
        
        connection.connect();
        
        connection.query(
        `UPDATE assets SET retired = '${date}' WHERE id = '${req.session.idNumber}'`
        , function(error, results, fields) {
            if (error) throw error;
        });
        
        connection.end(); 
        
        // Return success or failure
        res.json({
            successful: successful,
            message: message
        });
    }
    
    if(req.body.retire == "no") {
        successful = true; 
        
        const connection = mysql.createConnection({
            host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ns0xtj5joo1dl0j9',
            password: 'oashevj1wpkaemmg',
            database: 'h2eeztdsfwtqbwbf'
        });
        
        connection.connect();
        
        connection.query(
        `UPDATE assets SET retired = 'N' WHERE id = '${req.session.idNumber}'`
        , function(error, results, fields) {
            if (error) throw error;
        });
        
        connection.end(); 
        
        // Return success or failure
        res.json({
            successful: successful,
            message: message
        });
    }
    
    if(req.body.category == "" || req.body.manufacturer == "" || req.body.model == "" || req.body.serial == "" || req.body.acquired == ""
        || req.body.paid == "" || req.body.condition == "" || req.body.warrenty == "" || req.body.located == "") {
        message = "Missing information above. Please fill out to continue"; 
    } else {
        // if success, open connection, add asset to database 
        successful = true; 
        const connection = mysql.createConnection({
            host: 'nkpl8b2jg68m87ht.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ns0xtj5joo1dl0j9',
            password: 'oashevj1wpkaemmg',
            database: 'h2eeztdsfwtqbwbf'
        });
        
        connection.connect();
        connection.query(
        `UPDATE assets
        SET category = '${req.body.category}', manufacturer = '${req.body.manufacturer}', model = '${req.body.model}', serial = '${req.body.serial}', 
        acquired = '${req.body.acquired}', price = '${req.body.paid}', cond = '${req.body.condition}', warrenty = '${req.body.warrenty}', 
        location = '${req.body.located}', retired = 'N', description = '${req.body.descrip}', comments =  '${req.body.comment}'
        WHERE id = ${req.session.idNumber};`
        , function(error, results, fields) {
            if (error) throw error;
        });
        
        connection.end(); 
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
