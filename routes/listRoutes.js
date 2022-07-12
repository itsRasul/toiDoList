const express = require('express');
const listController = require('../controllers/listController');
const taskRouter = require('./taskRoutes');

const router = express.Router();

router.route('/').get(listController.getAllLists).post(listController.createList);

router
  .route('/:id')
  .get(listController.getOneList)
  .patch(listController.updateList)
  .delete(listController.deleteList);

router.use('/:listId/tasks', taskRouter);

module.exports = router;
