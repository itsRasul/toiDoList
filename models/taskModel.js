const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter title'],
  },
  status: {
    type: String,
    enum: ['done', 'undone'],
    default: 'undone',
  },
  list: {
    type: mongoose.Types.ObjectId,
    ref: 'List',
    required: [true, 'the task has to belongs to a list'],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
