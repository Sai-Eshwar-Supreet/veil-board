const {Router} = require('express');
const signupController = require('../controllers/signupController.cjs');

const signupRouter = Router();


signupRouter.get('/', signupController.getSignup);
signupRouter.post('/', signupController.postSignup);

module.exports = signupRouter;