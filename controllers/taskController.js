const AppError = require('../utils/AppError');
const APIFeature = require('../utils/APIFeature');
const catchAsync = require('../utils/catchAsync');
const Task = require('../models/taskModel');
const List = require('../models/listModel');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  // api/v1/lists/ds254sdf6s84f/tasks
  // api/v1/tasks
  const filter = {};
  if (req.params.listId) {
    filter.list = req.params.listId;
  }

  const tasks = await Task.find(filter);

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    message: 'tasks are found successfully!',
    data: {
      tasks,
    },
  });
});

exports.getOneTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new AppError('task is not found!', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'task is found successfully!',
    data: {
      task,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  if (!listId) {
    throw new AppError('please enter the list which task belongs to in params', 400);
  }

  const list = await List.findById(listId);

  if (!list) {
    throw new AppError('list you have entered is not exist!', 404);
  }

  const data = {
    list: listId,
    title: req.body.title,
    status: req.body.status,
  };

  const task = await Task.create(data);

  if (!task) {
    throw new AppError('task is not created!', 500);
  }

  res.status(201).json({
    status: 'success',
    message: 'task is created successfully!',
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  // check if list is exist in case user entered listId
  if (req.body.list) {
    const list = await List.findById(req.body.list);

    if (!list) {
      throw new AppError('the list you have entered is not exist!', 404);
    }
  }

  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    runValidators: true,
    new: true,
  });

  if (!task) {
    throw new AppError('task is not found!', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'task is updated successfully!',
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const removedTask = await Task.findByIdAndDelete(req.params.taskId);

  if (!removedTask) {
    throw new AppError('task is not found!', 404);
  }

  res.status(204).json({
    status: 'success',
    message: 'task is removed successfully!',
    data: {
      removedTask,
    },
  });
});
