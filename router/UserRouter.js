const Route = require('../library/router');
const userController = require('../controller/UserController');
const { verifyUser, verifyAdmin, verify } = require('../service/authenticate.js');
const route = new Route();


route.use('/api/v1/users/by-email', 'get', verify, userController.getUsersByEmail);
route.use('/api/v1/users', 'get', verifyAdmin, userController.getUsers);
route.use('/api/v1/users', 'post', userController.addUser);
route.use('/api/v1/users', 'put', verifyUser, userController.updateUser);
//route.use('/api/v1/users', 'delete', verifyUser, userController.deleteUser);


module.exports = route;