const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })  // es6 property task:task
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  console.log(req.body)
  res.status(201).json({ task ,amount:task.length}); // es6 property task:task
})

//more understandable for me
// const createTask = async (req, res) => {
//   try{
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   }
//   catch(error)
//   {
//     res.status(500).json({error})
//   }
// };

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params; //req.params.id
  const task = await Task.findOne({ _id: taskID });   // if not match any then it return NULL not an error
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task }); // es6 property task:task
})

// to don't do it manually everywhere  we create a new class    custom_error_class and will extend it from javascript error and create new instance..  instance is like  struct node n1  ;;  struct node n2;; 

//const error=new Error('new error')   creates an error type object (inbuilt)
//error.status(404)
// return next(error)   goes to error-handler middleware

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task }); // es6 property task:task
})


const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body  //updated data
  , {
    new: true,     // return new item in response not the old one
    runValidators: true,  // runs the validator   default not run
    //owerite:true                  //
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task }); // es6 property task:task
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
