const {Router} = require('express');
const membershipController = require('../controllers/membershipController.cjs');

const membershipRouter = Router();

membershipRouter.get('/join', membershipController.getMembershipPage);
membershipRouter.post('/join', membershipController.postJoinMembership);

module.exports = membershipRouter;