const { ENUM_USER_ROLE } = require('../../enums/user');
const auth = require('../../middlewares/auth');
const { uploadSingle } = require('../../middlewares/upload');
const UserController = require('./user.controller');
const router = require('express').Router();

// Define routes
router.post('/login', UserController.login);
router.post('/register', uploadSingle, UserController.register);
router.get('/', UserController.getAllFromDB); // This gets all users
router.get('/:id',  UserController.getUserById); // Use :id to get a user by ID
router.delete('/:id', UserController.deleteUserFromDB);
router.put('/:id', uploadSingle, UserController.updateUserFromDB);
router.put('/change-password/:id',  UserController.updateUserPasswordFromDB);

// Export the router
const UserRoutes = router;
module.exports =  UserRoutes ;
