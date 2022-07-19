const Route = require('../library/router');
const loginController = require('../controller/LoginCotroller.js');
const { verify } = require('../service/authenticate.js');

const route = new Route();

route.use('/api/v1/login/user', 'post', loginController.loginUser);
route.use('/api/v1/login/admin', 'post', loginController.loginAdmin);
route.use('/api/v1/logout', 'post', verify, loginController.logout);


module.exports = route;