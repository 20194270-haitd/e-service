require('dotenv').config();
const BookRoute = require('./router/BookRouter.js');
const UserRoute = require('./router/UserRouter.js');

const db = require('./config/connect');
db.connect();

const app = require('./library/application');
// const cors = require('./library/cors.js');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next(req, res, next);
});

// const corsOptions = {
//     origin: '*',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }

app.use(cors(corsOptions)) // Use this after the variable declaration

app.addRoute(BookRoute);
app.addRoute(UserRoute);

app.use(function errorHandler(req, res, next) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write('404 not found');
    res.end();
})

module.exports = app.submit;