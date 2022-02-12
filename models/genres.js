const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const genreSchema=new Schema({
    book_id:{
        type:Array,
        required:true
    },
    genre_name:{
        type:String,
        required:true
    }
    
},{timestamps:true});

const Genre=mongoose.model('Genre',genreSchema);
module.exports=Genre;