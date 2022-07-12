const Route = require('../library/router');
const userController = require('../controller/UserController');

route = new Route();
route.use('/api/v1/users', 'get', userController.getUsers);
route.use('/api/v1/users', 'post', userController.addUser);
route.use('/api/v1/users', 'put', userController.updateUser);
route.use('/api/v1/users', 'delete', userController.deleteUser);


module.exports = route;