const AppError = require('../utils/AppError');
const APIFeature = require('../utils/APIFeature');
const catchAsync = require('../utils/catchAsync');
const List = require('../models/listModel');
const { RuleTester } = require('eslint');

exports.getAllLists = catchAsync(async (req, res, next) => {
  const feature = new APIFeature(List.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limit()
    .fields()
    .populate();

  const lists = await feature.query;

  res.status(200).json({
    status: 'success',
    results: lists.length,
    message: 'lists are found successfully!',
    data: {
      lists,
    },
  });
});
exports.getOneList = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const list = await List.findById(id);
  // .populate('tasks');

  if (!list) {
    throw new AppError('list is not found with this id!', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'list is found successfully!',
    data: {
      list,
    },
  });
});

exports.createList = catchAsync(async (req, res, next) => {
  const list = await List.create(req.body);

  if (!list) {
    throw new AppError('list is not created!', 400);
  }

  res.status(201).json({
    status: 'success',
    message: 'list is created successfully!',
    data: {
      list,
    },
  });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const removedList = await List.findByIdAndDelete(id);

  if (!removedList) {
    throw new AppError('list is not found!', 404);
  }

  res.status(204).json({
    status: 'success',
    message: 'list is deleted successfully!',
    data: {
      removedList,
    },
  });
});
exports.updateList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const list = await List.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!list) {
    throw new AppError('list is not found with this id!', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'list is updated successfully!',
    data: {
      list,
    },
  });
});
