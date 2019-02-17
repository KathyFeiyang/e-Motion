const url = require('url');
const http = require('http');
const path = require('path')
const express = require('express')
const layout = require('express-layout')
const app = express()
var server = http.createServer(app)
const bodyParser = require('body-parser')
var mysql = require('mysql')
var fs = require('fs'); 


var pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user: 'root',
    database: 'eMotion_db',
    password:'1234567890'
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/userinfo', urlencodedParser, function (req, res){
    // connection.connect(function(err){
    //     if (err) {throw err;}
    //     console.log("Connected to Server!");
    //  });
    pool.getConnection(function(err, connection) {
        req = [
            username = req.body.username,
            password = req.body.password
        ]
        connection.query('INSERT INTO users SET ?', req, function(err, result) {
            connection.release();
        });
    });

    fs.readFile('./Login.html', function (err, html) {
        if (err) throw err;    
        http.createServer(function(req, res) {  
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        }).listen(8080);
    });
        
    // response = {
    //     username: req.body.username,
    //     password: req.body.password
    // };
    res.redirect("http://localhost:8080/Login.html");

    res.end();
});

// app.post('/login', urlencodedParser, function(req, res) {
//     response = [
//         username = req.body.username,
//         password = req.body.password
//     ]
//     var q = 'SELECT * FROM users WHERE username == ' + username;
//     pool.getConnection(function(err, connection) {
//         connection.query(q, function(err, result, fields) {
//             console.log("hello")
//             if (err) {console.log(err.code);}
//             if (result.isEmpty()) {console.log('User not found.');}
//             if (result[0].password != password) {console.log('Incorrect password.');}
//             else{res.sendFile( __dirname + "/" + result[0].id + "/index.html" );}
//             connection.release();
//         });
//     })
// })

app.get('/Register.html', function (req, res) {
    res.sendFile( __dirname + "/" + "Register.html" );
 });


// var app = require('http').createServer(createServer);
// var fs = require('fs'); 
// var url = require('url');

// function createServer(req, res) {
//     var path = url.parse(req.url).pathname;
//     var fsCallback = function(error, data) {
//         if(error) throw error;

//         res.writeHead(200);
//         res.write(data);
//         res.end();
//     }

//     switch(path) {
//         case '/subpage':
//             doc = fs.readFile(__dirname + '/subpage.html', fsCallback);
//         break;
//         default:
//             doc = fs.readFile(__dirname + '/index.html', fsCallback);
//         break;
//     }
// }
 
   var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});


