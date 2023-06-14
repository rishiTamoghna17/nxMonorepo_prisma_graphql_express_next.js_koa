import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Create_Tasks } from '../Graphql/mutations';
// import {Create_Task} from 
function CreateTask() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
              variables: { title, },
            });
            alert('Product created successfully');
            // Reset form fields
            setTitle('');
            toggleCreateForm(); 
          } catch (err) {
            alert(err.message);
          }
        };
        
  return (
   <button type="button" onClick={}>create</button>
  )
}

export default CreateTask