const Books = require ('../model/Books');
const mongoose = require ('mongoose');

async function getBooks(req, res, next) {
    try{
        const { bookId, name, type, author, page, perPage , top } = req.url.query;
        if(bookId) {
            const books = await Books.findById(new mongoose.Types.ObjectId(bookId));
            res.write(JSON.stringify(books));
            res.end();
        }
        else if(top) {
            const books = await Books.find().limit(top);
            res.write(JSON.stringify(books));
            res.end();
        }
        else if(name) {
            const books = await Books.find({ name: name});
            res.write(JSON.stringify(books));
            res.end();
        }
        else if(author) {
            const books = await Books.find({ author: author});
            res.write(JSON.stringify(books));
            res.end();
        }
        else if(type) {
            const books = await Books.find({ type: type});
            res.write(JSON.stringify(books));
            res.end();
        }
        else if( page && perPage) {
            const skip = (page - 1) * perPage;
            if(skip >= 0){
                const books = await Books.find().limit(perPage).skip();
                res.write(JSON.stringify(books));
                res.end();
            }
            else throw({
                err: 'Page too small'
            })
        }
        else {
            const books = await Books.find();
            res.write(JSON.stringify(books));
            res.end();
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();

    }
}

async function addBook(req, res, next) {
    try{
        const newBook = req.body;
        const books  = await Books.create(newBook);
        res.write(JSON.stringify(books));
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function updateBook(req, res, next) {
    try{
        const { body } = req;
        const { bookId } = req.url.query;
        if(!bookId) {
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    err: 'Bad request, doesnt have bookId',
                }
            ));
            res.end();
            return;
        }
        if(body._id !== bookId){
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    err: 'Query id doesnt match body id',
                }
            ));
            res.end();
            return;
        }
        if(!await Books.findById(new mongoose.Types.ObjectId(bookId))){
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    err: 'Book doesnt exit',
                }
            ));
            res.end();
            return;
        }
        else {
            await Books.findByIdAndUpdate(new mongoose.Types.ObjectId(bookId), body);
            res.write(JSON.stringify(body));
            res.end();
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function deleteBook(req, res, next) {
    try{
        const { bookId } = req.url.query;
        if(!bookId) {
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    err: 'Bad request, doesnt have bookId',
                }
            ));
            res.end();
            return;
        }
        else if(!await Books.findById(new mongoose.Types.ObjectId(bookId))){
            res.statusCode = 400;
            res.write(JSON.stringify(
                {
                    err: 'Book does\'nt exit',
                }
            ));
            res.end();
            return;
        }
        else {
            const books  = await Books.findByIdAndDelete( new mongoose.Types.ObjectId(bookId));
            res.write(JSON.stringify(books));
            res.end();
        }
    }
    catch(err) {
        console.log(err);
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}



module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook

}
