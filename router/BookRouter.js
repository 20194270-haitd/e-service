const Route = require('../library/router');
const BookController = require('../controller/BookController');
const { verifyAdmin } = require('../service/authenticate.js');
const route = new Route();

route.use('/api/v1/books', 'get', BookController.getBooks);
route.use('/api/v1/books', 'post', verifyAdmin, BookController.addBook);
route.use('/api/v1/books', 'put', verifyAdmin, BookController.updateBook);
route.use('/api/v1/books', 'delete', verifyAdmin, BookController.deleteBook);


module.exports = route;