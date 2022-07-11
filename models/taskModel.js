const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter title'],
  },
  status: {
    type: String,
    enum: ['done', 'undone', 'processing'],
    default: 'undone',
  },
});

const Task = mognoose.model('Task', taskSchema);

module.exports = Task;
