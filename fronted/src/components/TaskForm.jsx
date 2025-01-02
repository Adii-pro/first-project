import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';

function TaskForm({ onTaskCreated, editingTask, onTaskUpdated, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDeadline(editingTask.deadline ? editingTask.deadline.split('T')[0] : '');
      setPriority(editingTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('Medium');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, description, deadline, priority };
      if (editingTask) {
        const updatedTask = await taskService.updateTask(editingTask._id, taskData);
        onTaskUpdated(updatedTask); // Notify parent component
      } else {
        const newTask = await taskService.createTask(taskData);
        onTaskCreated(newTask); // Notify parent component
      }
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('Medium');
      setError(null);
    } catch (error) {
      setError('Failed to save task. Please try again.');
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;