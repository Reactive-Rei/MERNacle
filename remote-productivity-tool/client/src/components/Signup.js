import React, { useState } from 'react';
import api from '../api'; // Import the Axios instance

const Signup = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member', // Default role
  });

  // Update state as users type
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', formData);
      console.log(res.data); // e.g., { msg: 'User created successfully' }
      // Optional: Redirect or show a success message here
    } catch (err) {
      console.error(err.response.data); // e.g., { msg: 'User already exists' }
      // Optional: Display error to user
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
      />
      <select name="role" value={formData.role} onChange={onChange}>
        <option value="member">Member</option>
        <option value="team_lead">Team Lead</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;