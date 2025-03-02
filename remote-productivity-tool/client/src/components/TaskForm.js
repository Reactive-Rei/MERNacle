// import React, { useState } from 'react';
// import api from '../api';

// const TaskForm = ({ onTaskCreated }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     deadline: '',
//     priority: 'medium',
//     status: 'pending',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/tasks', formData);
//       onTaskCreated(res.data); // Notify parent component of new task
//       setFormData({
//         title: '',
//         description: '',
//         assignedTo: '',
//         deadline: '',
//         priority: 'medium',
//         status: 'pending',
//       });
//     } catch (err) {
//       console.error('Error creating task:', err.response?.data || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Task Title"
//         required
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Description"
//       />
//       <input
//         type="text"
//         name="assignedTo"
//         value={formData.assignedTo}
//         onChange={handleChange}
//         placeholder="Assigned To (User ID)"
//       />
//       <input
//         type="date"
//         name="deadline"
//         value={formData.deadline}
//         onChange={handleChange}
//       />
//       <select name="priority" value={formData.priority} onChange={handleChange}>
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>
//       <select name="status" value={formData.status} onChange={handleChange}>
//         <option value="pending">Pending</option>
//         <option value="in_progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <button type="submit">Create Task</button>
//     </form>
//   );
// };

// export default TaskForm;

// TaskForm.js
import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskForm = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
    priority: 'low',
    status: 'pending',
  });

  // Pre-fill form if editing a task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        assignedTo: task.assignedTo?._id || '',
        deadline: task.deadline ? task.deadline.split('T')[0] : '',
        priority: task.priority || 'low',
        status: task.status || 'pending',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (task) {
  //       // Update existing task
  //       await api.put(`/tasks/${task._id}`, formData);
  //     } else {
  //       // Create new task
  //       await api.post('/tasks', formData);
  //     }
  //     onSubmit(); // Notify Dashboard to refresh
  //   } catch (err) {
  //     console.error('Error submitting form:', err.response?.data || err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = { ...formData };
      if (submissionData.assignedTo === '') {
        delete submissionData.assignedTo; // Remove if empty
      }
      if (task) {
        await api.put(`/tasks/${task._id}`, submissionData);
      } else {
        await api.post('/tasks', submissionData);
      }
      onSubmit();
    } catch (err) {
      console.error('Error submitting form:', err.response?.data || err.message);
    }
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <select name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
        <option value="">Unassigned</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;