const { resolveSoa } = require('dns');
const express = require('express');
const router = express.Router();
const Task = require('../models/Task')

router.get('/', async(req,res)=>{
    const tasks = await Task.find();
    console.log(tasks)
    res.json(tasks);
});



router.get('/:id', async(req, res)=>{
   const task = await Task.findById(req.params.id);
   res.json(task);

})

router.post('/', async (req, res)=>{
     const {taskName, taskImge, taskPriority, limitDate} = req.body;
     const task = new Task({taskName, taskImge, taskPriority, limitDate});
     console.log(task);
     await task.save();
     res.json({status:'Tarea guardada'});
});

router.put('/:id', async(req, res)=>{
    const {taskName, taskImge, taskPriority, limitDate} = req.body;
    const newTask = {taskName, taskImge, taskPriority, limitDate};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Tarea actualizada'});
})

router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Tarea eliminada'})
})

module.exports = router;