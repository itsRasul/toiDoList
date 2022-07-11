const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter the title of list'],
    minLength: [3, 'title has to be more than 3 charecter'],
    maxLength: [100, 'title has to be less than 100 charecter'],
  },
  description: {
    type: String,
    minLength: [3, 'description has to be more than 3 charecter'],
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const List = mongoose.model('List', listSchema);

module.exports = List;
