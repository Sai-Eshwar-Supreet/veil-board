const {Router} = require('express');
const logoutController = require('../controllers/logoutController.cjs');


const logoutRouter = Router();

logoutRouter.post('/', logoutController.postLogout);

module.exports = logoutRouter;
