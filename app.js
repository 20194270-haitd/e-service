require("dotenv").config();
const BookRoute = require('./router/BookRouter.js');
const UserRoute = require('./router/UserRouter.js');

const db = require('./config/connect');
db.connect();

const app = require('./library/application');

app.addRoute(BookRoute);
app.addRoute(UserRoute);

app.use(function errorHandler(req, res, next) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write('404 not found');
    res.end();
})

module.exports = app.submit;