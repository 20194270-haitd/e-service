const Route = require('../library/router');
const loginController = require('../controller/LoginCotroller.js');

const route = new Route();

route.use('/api/v1/login/user', 'post', loginController.loginUser);
route.use('/api/v1/login/admin', 'post', loginController.loginAdmin);


module.exports = route;