const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a task
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;

    // Check if title is provided
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = new Task({ title, description, deadline, priority });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

    // Check if task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;