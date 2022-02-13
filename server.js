const express=require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
const Book=require('./models/books');
const Genre=require('./models/genres');
const bodyparser=require('body-parser');
const app=express();
const dbURI='mongodb+srv://abcd:abcd@cluster0.cvbxr.mongodb.net/bookdb?retryWrites=true&w=majority';

// db and port connection
mongoose.connect(dbURI,{useNewUrlParser:true})
.then(result=>app.listen(8000,()=>{
    console.log('Server is running on port 8000');
    console.log('Database connected');
}))
.catch(err=>console.log(err));
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
// routes




app.get('/',(req,res )=>{
   
    return res.render('index.html');
    
});


app.get('/book',(req,res )=>{
   
    return res.render('book.html');
    
});

app.post('/book',(req,res)=>{
    console.log(req.body);
    Book.find({$or:[{book_name:{$regex:req.body.book,$options:'i'}},{book_desc:{$regex:req.body.book,$options:'i'}},{book_author:{$regex:req.body.book,$options:'i'}}]})
    .then(result=>{
        console.log(result);
        res.render('gerne_add',{data:result});
    })
    .catch(err=>console.log(err));
});








app.post('/',(req,res)=>{
    console.log(req.body);
    const book=new Book(
    {
        book_name:req.body.name,
        book_desc:req.body.desc,
        book_author:req.body.author,
        gernra:req.body.age
    }

);
book.save()
.then(result=>{
    console.log(result);
    res.send(result);
})
.catch(err=>{
    console.log(err);
});

});





app.get('/all_books_genre',(req,res)=>{
    Book.find()
    .then(result=>{
        console.log(result);
        res.render('all_books_genre',{data:result});
    })
    .catch(err=>console.log(err));
});
    

app.post('/add_genre',(req,res)=>{
    Genre.updateOne({genre_name:req.body.genre},{$addToSet:{book_id:req.body.id}},{upsert:true})
    .then(result=>{
        console.log(result);
    }
    )
    .catch(err=>console.log(err));
});

app.get('/get_gener',(req,res)=>{
    Genre.find({},{genre_name:1})
    .then(result=>{
        console.log(result);
        res.render('get_gener',{data:result});
    })
    .catch(err=>console.log(err));
});

app.post('/get_gener',(req,res)=>{
    Genre.aggregate([{$match:{genre_name:{$regex:req.body.genre_name,$options:'i'}}},{$lookup:{from:'books','let':{'id':'$book_id'},'pipeline':[{$match:{$expr:{$in:['$_id','$$id']}}}],as:'book_name'}},{$project:{book_name:1}}])
    .then(result=>{
        var y=[];
        for(x in result[0].book_name){
            y.push(result[0].book_name[x].book_name);
        }
        console.log(y);
        return res.send({data: y });
    })
    .catch(err=>console.log(err));
}
);



app.post('/get_book_genra',(req,res)=>{
    Book.aggregate([{$match:{book_name:{$regex:req.body.book_name,$options:'i'}}},
    {$lookup:{from:'genres','let':{'id':'$gernra'},
    'pipeline':[{$match:{$expr:{$in:['$_id','$$id']}}}],as:'genra_name'}},{$project:{genra_name:1}}])
    .then(result=>{
        var y=[];
        console.log(result);
        
        return res.send({data: result[0].genra_name });
    })
    .catch(err=>console.log(err));
}
);
