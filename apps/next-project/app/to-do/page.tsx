'use client';
import './todo.css';
import React, { useState } from 'react';
import Tasks from '../components/Tasks';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/client';
import { Create_Tasks } from '../components/Graphql/mutations';


// const DynamicTasks = dynamic(() => import('../components/Tasks'), {
//   loading: () => <p className="loading">Loading...</p>,
// });
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
  if (!data && loading) {
    return <p className="loading">Loading...</p>;
  }
  if (error) return <p className="error">{error.message}</p>; 


  return (
    <div>
      <h1 className='myStyle'>Task List</h1>
      {!showCreateForm ? (
        <button
        className="shadow__btn"
        type="button"
        onClick={toggleCreateForm}>
          Create Task
        </button>
      ) : (
        <form className='myStyle' onSubmit={handleSubmit}>
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
      )}
  <Tasks/>

  {/* <DynamicTasks /> */}

    </div>
  );
}

export default index;
