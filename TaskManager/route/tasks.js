const express = require('express')
const router= express.Router()
const taskController= require('../controller/tasksController')


router.route('/')
.get(taskController.getAllTasks)
.post(taskController.createTasks)


router.route('/:id')
.get(taskController.getSingleTasks)
.put(taskController.updateTasks)    // can be patch
.delete(taskController.deleteTask)

module.exports= router;