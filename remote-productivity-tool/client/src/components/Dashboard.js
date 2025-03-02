// import React, { useState, useEffect } from 'react';
// import api from '../api';
// import TaskList from './TaskList';
// import TaskForm from './TaskForm';

// const Dashboard = () => {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get('/auth/me');
//         setProfile(res.data);
//       } catch (err) {
//         console.error('Error fetching profile:', err.response.data);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="dashboard">
//       {profile && <h2>Welcome, {profile.name}</h2>}
//       <TaskForm />
//       <TaskList />
//     </div>
//   );
// };

// export default Dashboard;

// Dashboard.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle edit button click
  const handleEdit = (task) => {
    setEditingTask(task); // Set the task to edit in the form
  };

  // Handle delete button click
  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId)); // Update state without full refresh
      } catch (err) {
        console.error('Error deleting task:', err.response?.data || err.message);
      }
    }
  };

  // Handle form submission (create or update)
  const handleFormSubmit = () => {
    setEditingTask(null); // Clear editing state
    fetchTasks(); // Refresh task list
  };

  return (
    <div className="dashboard">
      {profile && <h2>Welcome, {profile.name}</h2>}
      <TaskForm task={editingTask} onSubmit={handleFormSubmit} />
      <TaskList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;