const Books = require ('../model/Books');
const mongoose = require ('mongoose');

async function getBooks(req, res, next) {
    try{
        const { bookId, name, type, author, page, top } = req.url.query;
        if(bookId) {
            const books = await Books.findById(new mongoose.Types.ObjectId(bookId));
            res.write(JSON.stringify(books));
            res.end();
            return;
        }
        else if(top) {
            const books = await Books.find().limit(top);
            res.write(JSON.stringify(books));
            res.end();
            return;
        }
        else if(name) {
            const books = await Books.find({ name: name});
            res.write(JSON.stringify(books));
            res.end();
            return;
        }
        else if(author) {
            const books = await Books.find({ author: author});
            res.write(JSON.stringify(books));
            res.end();
            return;
        }
        else if(type) {
            const books = await Books.find({ type: type});
            res.write(JSON.stringify(books));
            res.end();
            return;
        }
        const books = await Books.find();
        res.write(JSON.stringify(books));
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.end(JSON.stringify(err));
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
            res.write(JSON.stringify(
                {
                    err: 'bad request',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        if(body._id !== bookId){
            res.write(JSON.stringify(
                {
                    err: 'Query id doesnt match body id',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        if(!await Books.findById(new mongoose.Types.ObjectId(bookId))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        await Books.findByIdAndUpdate(new mongoose.Types.ObjectId(bookId), body);
        res.write(JSON.stringify(body));
        res.end();
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
            res.write(JSON.stringify(
                {
                    err: 'bad request',
                    code: 400,
                }
            ));
            res.end();
            return;
        }
        if(!await Books.findById(new mongoose.Types.ObjectId(bookId))){
            res.write(JSON.stringify(
                {
                    err: 'Book does\'nt exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }

        const books  = await Books.findByIdAndDelete( new mongoose.Types.ObjectId(bookId));
        res.write(JSON.stringify(books));
        res.end();
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
