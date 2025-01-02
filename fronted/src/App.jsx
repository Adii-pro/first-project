import React from 'react';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Welcome to First Project!
      </h1>
      <TaskList />
    </div>
  );
}

export default App;