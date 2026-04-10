const {Router} = require('express');
const loginController = require('../controllers/loginController.cjs');


const loginRouter = Router();

loginRouter.get('/', loginController.getLogin);
loginRouter.post('/', loginController.postLogin);

module.exports = loginRouter;
