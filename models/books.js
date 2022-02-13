const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId= Schema.ObjectId;
const bookSchema=new Schema({
    book_name:{
        type:String,
        required:true
    },
    book_desc:{
        type:String,
        required:true
    },
    book_author:{
        type:String,
        required:true
    },
    gernra:[ObjectId]

},{timestamps:true});

const Book=mongoose.model('Book',bookSchema);
module.exports=Book;

