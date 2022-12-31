const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],    // or just required : true    this is to provide a custom message
    trim: true,   //trim away spaces from edges
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,  
  },
})


// or   with no validation
// const TaskSchema = new mongoose.Schema({
//   name: String,
//   completed:boolean,
// })

module.exports = mongoose.model('Task', TaskSchema)
