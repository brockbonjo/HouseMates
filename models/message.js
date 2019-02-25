const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const commentSchema = new Schema({
    content: String,
    author: String,
})


const msgSchema = new Schema({
   title: String,
   content: String,
   author: String, 
   comments: [commentSchema]
}, {timestamps: true});



module.exports = mongoose.model('Message', msgSchema);