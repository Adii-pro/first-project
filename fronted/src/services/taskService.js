import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Create a task
const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Get all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update a task
const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/${taskId}`, taskData);
  return response.data;
};

// Delete a task
const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;