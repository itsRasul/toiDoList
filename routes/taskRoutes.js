const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router({ mergeParams: true });

router.route('/').get(taskController.getAllTasks).post(taskController.createTask);

router
  .route('/:taskId')
  .get(taskController.getOneTask)
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);

module.exports = router;
