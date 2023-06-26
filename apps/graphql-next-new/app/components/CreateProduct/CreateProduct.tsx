'use client';
import './CreateProduct.css'
import React, { useState } from 'react';
import { Create_Product } from '../Graphql/mutations/Mutation';
import { useMutation } from '@apollo/client';

function CreateProduct({toggleCreateForm,refetch}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbsUp, setThumbsUp] = useState(false);

  const [createProduct, { data, loading, error }] = useMutation(Create_Product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '' || description === '' || price === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createProduct({
        variables: { title, description, price, thumbsUp },
      });
      alert('Product created successfully');
      // Reset form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setThumbsUp(false);
      toggleCreateForm(); 
      refetch()
    } catch (err) {
      alert(err.message);
    }
  };
  if (loading) return <p className="loading">Loading ....</p>;
  if (error) return <p className="error">{error.message}</p>;

  const handleCancel = () => {
    toggleCreateForm(); // Hide the create product form
  };

  return (
    <div className="create-product-container">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description : </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price : </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Thumbs Up</label>
          <input
            type="checkbox"
            checked={thumbsUp}
            onChange={(e) => setThumbsUp(e.target.checked)}
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          x
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
