// import React, { useState, useEffect } from 'react';
// import api from '../api'; // Your Axios instance

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await api.get('/tasks');
//         setTasks(res.data);
//       } catch (err) {
//         console.error('Error fetching tasks:', err.response?.data || err.message);
//       }
//     };
//     fetchTasks();
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Title</th>
//           <th>Description</th>
//           <th>Assigned To</th>
//           <th>Deadline</th>
//           <th>Priority</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tasks.map((task) => (
//           <tr key={task._id}>
//             <td>{task.title}</td>
//             <td>{task.description || '-'}</td>
//             <td>{task.assignedTo?.name || 'Unassigned'}</td>
//             <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</td>
//             <td>{task.priority}</td>
//             <td>{task.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TaskList;

import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskList = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err.response?.data || err.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Deadline</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th></tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description || '-'}</td>
            <td>{task.assignedTo?.name || 'Unassigned'}</td>
            <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;