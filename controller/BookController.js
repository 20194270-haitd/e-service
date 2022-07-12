const Books = require ('../model/Books');
const mongoose = require ('mongoose');

async function getBooks(req, res, next) {
    try{
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
        
        if(!await Books.findById(new mongoose.Types.ObjectId(body._id))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }
        await Books.findByIdAndUpdate(new mongoose.Types.ObjectId(body._id), body);
        res.write(JSON.stringify(body));
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.write(JSON.stringify(err));
        res.end();
    }
}

async function deleteBook(req, res, next) {
    try{
        const { body } = req;
        if(!await Books.findById(new mongoose.Types.ObjectId(body._id))){
            res.write(JSON.stringify(
                {
                    err: 'not exit',
                    code: 300,
                }
            ));
            res.end();
            return;
        }

        const books  = await Books.findByIdAndDelete( new mongoose.Types.ObjectId(body._id));
        res.write(JSON.stringify(books));   
        res.end();
    }
    catch(err) {
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
