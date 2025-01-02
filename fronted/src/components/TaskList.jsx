import React, { useEffect, useState } from 'react';
import taskService from '../services/taskService';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the list
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove the task from the list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const handleCancelEdit = () => {
    setEditingTask(null); // Cancel editing
  };

  if (loading) {
    return <p className="text-center">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-blue-600">Task List</h2>
      <TaskForm
        onTaskCreated={handleTaskCreated}
        editingTask={editingTask}
        onTaskUpdated={handleTaskUpdated}
        onCancelEdit={handleCancelEdit}
      />
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <p className="text-sm text-gray-500">Completed: {task.completed ? 'Yes' : 'No'}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;