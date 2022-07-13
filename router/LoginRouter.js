const Route = require('../library/router');
const loginController = require('../controller/LoginCotroller.js');

route = new Route();
route.use('/api/v1/login', 'post', loginController.login);


module.exports = route;