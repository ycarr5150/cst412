const express = require("express"); 
const app = express(); 

app.engine('html', require('ejs').renderFile);
app.use(express.static("public")); 

// routes
app.get('/', function(req, res, next) {
    res.render("index.html");
});

// server listener 
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server..."); 
});
