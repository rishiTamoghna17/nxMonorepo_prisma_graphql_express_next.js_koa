'use client';
import React, { useState } from 'react'
import Tasks from '../components/Tasks'
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/client';
import { Create_Tasks } from '../components/Graphql/mutations';
 
const DynamicTasks = dynamic(() => import('../components/Tasks'), {
  loading: () => <p>Loading...</p>,
});
function index() {
  const [CreateTasks, { data, loading, error }] = useMutation(Create_Tasks);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      await CreateTasks({
        variables: { title },
      });
      alert('Task created successfully');
      // Reset form fields
      setTitle('');
      toggleCreateForm();
    } catch (err) {
      alert(err.message);
    }
  };
  const myStyle = {
    "height": "100%",
    "width": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
  return (
    <div >
    <h1 style={myStyle}>Task List</h1>
      {showCreateForm ? (
        <form style={myStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <button type="submit">Create </button>
          <button type="button" onClick={toggleCreateForm}>
            Cancel
          </button>
        </form>
      ) : (
        <button type="button" onClick={toggleCreateForm}>
          Create Task
        </button>
      )}
    
    <DynamicTasks />
  </div>

  )
}

export default index