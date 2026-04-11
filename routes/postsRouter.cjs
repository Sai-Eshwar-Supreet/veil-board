const {Router} = require('express');
const postsController = require('../controllers/postsController.cjs');


const postsRouter = Router();

postsRouter.get('/:id/details', postsController.getPost);
postsRouter.get('/create', postsController.getCreateForm);
postsRouter.post('/create', postsController.postCreateForm);
postsRouter.get('/:id/edit', postsController.getEditForm);
postsRouter.post('/:id/edit', postsController.postEditForm);
postsRouter.post('/:id/delete', postsController.postDelete);

module.exports = postsRouter;
