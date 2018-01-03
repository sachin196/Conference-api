
var mongoose = require('mongoose');
var Schema = mongoose.Schema ;

var speakerSchema = new Schema ({
    name:{ 
        type: String, 
        default: '' 
    },
    company: 
          { 
        type: String,
         default: '' 
        },
    title:
         {
        type: String,
         default: '' 
        },
    description:
     {
        type: String,
         default: '' 
        },
    picture: 
        { 
        type: String,
         default: '' 
        },
    schedule:
     { type: String,
         default: '' 
        },
},{
    timestamps:true
});

module.exports = mongoose.model('Speaker', speakerSchema );