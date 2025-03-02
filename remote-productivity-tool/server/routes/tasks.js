const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Create a task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, assignedTo, deadline, priority, status} = req.body;
    const task = new Task({
      title,
      description,
      createdBy: req.user.userId,
      assignedTo,
      deadline,
      priority,
      status,
    });
    await task.save();
    res.status(201).json(task);
    // const populatedTask = await Task.findById(task._id)
    //   .populate('assignedTo', 'username email');
    
    // res.status(201).json(populatedTask);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;