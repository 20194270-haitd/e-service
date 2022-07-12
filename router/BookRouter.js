const Route = require('../library/router');
const BookController = require('../controller/BookController');

route = new Route();

route.use('/api/v1/books', 'get', BookController.getBooks);
route.use('/api/v1/books', 'post', BookController.addBook);
route.use('/api/v1/books', 'put', BookController.updateBook);
route.use('/api/v1/books', 'delete', BookController.deleteBook);


module.exports = route;