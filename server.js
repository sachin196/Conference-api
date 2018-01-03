const http = require('http');
const express = require('express');
const app = express();
var port = process.env.PORT || 3000 ;
// const router = express.Router();
const mongoose = require('mongoose');
const Speaker = require('./api/models/speaker');
var fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// app.use(express.static(__dirname+ '/public'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
var dateFormat = require('dateformat');
var now = new Date();


// app.get('/', function(req, resp, ) {
//    fs.readFile("api/speaker.html", function (error, pgResp) {
//             if (error) {
//                 resp.writeHead(404);
//                 resp.write('Contents you are looking are Not Found');
//             } else {
//                 resp.writeHead(200, { 'Content-Type': 'text/html' });
//                 resp.write(pgResp);
//             }
             
//          resp.end();
           
//         });
// });

app.get('/', function(req, resp) {
    fs.readFile("api/form.html", function (error, pgResp) {
             if (error) {
                 resp.writeHead(404);
                 resp.write('Contents you are looking are Not Found');
             } else {
                 resp.writeHead(200, { 'Content-Type': 'text/html' });
                 resp.write(pgResp);
             }
              
             resp.end();
         });
 });

// mongoose.connect('mongodb://localhost:27017/');
// var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Speakers',(err, db) => {
    if(err) {
    return   console.log('Unable to connect to mongodb server');
    }
console.log('Connected to Mongodb server')
});
console.log('above morgon');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin","*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept, Authorization"
		);
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.get('/speaker/:id', (req, res, next)=>{
	Speaker.find().then((data) => {
    // res.send(doc);
    res.render('speaker/speaker_list',{data:data , dateFormat:dateFormat})

    // next(doc);
  }, (e) => {
    res.status(400).send(e);
  });
	
});
app.post('/speaker', (req, res, next)=>{
	const speaker = new Speaker({
         _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        company:req.body.company,
        title:req.body.title,
        description:req.body.description ,
        picture:req.body.picture,
        schedule:req.body.schedule,
    
	});
	
	speaker
	.save()
	.then((result) =>{
        console.log(result);
        // res.send(result);
	})
    .catch((err) => console.log(err));
    var id = req.body._id;
    res.redirect('/speaker/' + id );
    // res.render('speaker/success', {speaker:speaker});
	// res.status(201).json({
	// 	message: 'Handling POST request to /users',
	// 	speaker : speaker
    // });
});

app.listen(port, () => {
    console.log('server started on Port', port);
});
