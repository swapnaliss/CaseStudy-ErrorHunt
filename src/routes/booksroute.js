const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');



//router to render books page
booksRouter.get('/',function(req,res){

    bookdata.find() 
    .then(function (books) {

    res.render('books',{
        books
    });

    })
})



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{});

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    })



//router for singlebook
booksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    book
                })

            })
    
});




 //router to delete book
 booksRouter.post('/delete', function (req, res) {
    const id = req.body.id;
    bookdata.findOneAndDelete({ _id: id }, //Part #2 Point 9
        { useFindAndModify: false },
        function (err, book) {
            if (err) {
                console.log(err);
            } else {
                console.log('Deleted : ' + book)
                res.redirect('/books')
            }
        }
    )
})



//router to edit book
booksRouter.post('/edit', function (req, res) {

    bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {data})
        }
    })
})



//router to update book
booksRouter.post('/update', function (req, res) {
    bookdata.findOne({ _id: req.body.id }) //Part #2 Point 9
        .then(function (book) {
            if (req.body.image != "")
                book.image = req.body.image;
            book.title = req.body.title;
            book.author = req.body.author;
            book.about = req.body.about;
            book.save( function (err) {
                if (err) {
                    res.json({ status: "Failed" });
                }
                else {
                    res.redirect("/books")
                }
            })
        })
})







module.exports = booksRouter;