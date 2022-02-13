const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId= Schema.ObjectId;
const genreSchema=new Schema({
    book_id:[ObjectId],
    genre_name:{
        type:String,
        required:true
    }
    
    
},{timestamps:true});

const Genre=mongoose.model('Genre',genreSchema);
module.exports=Genre;