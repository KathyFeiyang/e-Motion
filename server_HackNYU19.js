/*
   Code References including:
   https://stackoverflow.com/questions/35995273/how-to-run-html-file-using-node-js
   https://stackoverflow.com/questions/33942334/redirect-on-another-html-page
   https://sailsjs.com/documentation/reference/response-res/res-redirect
   ...
*/

var express = require('express');
var app = express();
var fs = require("fs");

var http = require('http');

const PORT=8080; 

var bodyParser = require('body-parser');
var multer  = require('multer');

var userID = "testUserID";
var uploadDestination = "./" + userID + "/image/";
var imageID = 1;
var filePaths = [];

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: '/tmp/'}));
//app.use(multer({dest: uploadDestination}).single('file'));
app.use(multer({dest: uploadDestination}).array('file'));

app.get('/testingUploadImage.html', function (req, res) {
   res.sendFile( __dirname + "/" + "testingUploadImage.html" );
})

app.get('/', function (req, res) {
   //res.sendFile( __dirname + "/" + "testingUploadImage.html" );
   console.log('got the GET request!!!!!!' + filePaths[0]);
   
   res.writeHeader(200, {"Content-Type": "text/html"}); 
   res.write(filePaths[0]);
   res.end(filePaths[0]);
   
   //res.send(filePaths[0]);
   console.log(filePaths);
})

app.post('/file_upload', function (req, res) {
   // multiple uploaded files must be referred to by files
   // don't know why it's files[0]
   req.files[0].name = userID + "_" + imageID;
   //req.files[index].path = uploadDestination + userID + "_" + imageID;
   console.log(req.files[0].name);
   console.log(req.files[0].path);
   console.log(req.files[0].type);
   //var file = __dirname + "/" + req.files[index].name;
   var file = uploadDestination + "/" + req.files[0].name;
   for (var index = 0; index < req.files.length; index++){
      filePaths.push(req.files[index].path);
   }
      
   fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  fileLocations: filePaths,
                  message:'Files uploaded successfully',
                  //filename:req.files[index].name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
   
   fs.readFile('./UploadAndDetectFaces.html', function (err, html) {
      if (err) throw err;    
  
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);
          response.end();  
      }).listen(PORT);
   });
   res.redirect('http://localhost:8080');

   console.log("POST complete");
   console.log(filePaths);
  
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})