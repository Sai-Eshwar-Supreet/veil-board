const {Router} = require('express');
const profileController = require('../controllers/profileController.cjs');


const profileRouter = Router();

profileRouter.get('/:username', profileController.getProfile);

module.exports = profileRouter;
