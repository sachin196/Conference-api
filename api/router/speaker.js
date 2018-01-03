const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Speaker = require('./../models/speaker');
var fs = require('fs');
const path = require('path');



//router.get('/', function(req, resp) {
//    fs.readFile("../index.html", function (error, pgResp) {
//             if (error) {
//                 resp.writeHead(404);
//                 resp.write('Contents you are looking are Not Found');
//             } else {
//                 resp.writeHead(200, { 'Content-Type': 'text/html' });
//                 resp.write(pgResp);
//             }
             
//             resp.end();
//         });
// });
router.get('/speaker', (req, res, next)=>{
	Speaker.find().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
	
});
router.post('/speaker', (req, res, next)=>{
	const users = new Speaker({
		_id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        company:req.body.company,
        company:req.body.company,
        title:req.body.title,
        description:req.body.description        ,
        picture:req.body.picture,
        schedule:req.body.schedule,
        createdOn:req.body.createdOn,
	});
	
	Speaker
	.save()
	.then((result) =>{
        console.log(result);
        res.send(doc);
	})
	.catch((err) => console.log(err));
	res.status(201).json({
		message: 'Handling POST request to /users',
		Speaker : Speaker
	});
});

module.exports = router;