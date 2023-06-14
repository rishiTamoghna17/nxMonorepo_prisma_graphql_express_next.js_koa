'use client';
import './Products.css';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { get_LoginUser } from '../Graphql/queries/Queries';
import CreateProduct from '../CreateProduct/CreateProduct.tsx';
// import Allproducts from '../All products/Allproducts';
function Products() {
  const { loading, error, data } = useQuery(get_LoginUser, {
    fetchPolicy: 'no-cache', // Doesn't check cache before making a network request
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) router.push('/signIn');
      // if (!data) {
      //   <p>Loading...</p>;
      // }
    }
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  if (loading) return <p className="loading">Loading ....</p>;
  if (error && !data) return <p className="error">{error.message}</p>;

  // const addProduct = () => {
  //   // Logic to handle creating a product goes here

  // };
  return (
    <>
      <div className="navbar-style">
        <p className="styles-title">my products</p>
        <div className="create-product-button-container">
          {showCreateForm ? (
            <CreateProduct toggleCreateForm={toggleCreateForm} />
          ) : (
            <button className="btn-class" onClick={toggleCreateForm}>
              Create product
            </button>
          )}
        </div>
      </div>
      <div className="my-products">
        {data.loginUser.products.map((product) => (
          <div key={product.id} className="styles-card">
            <h3 className="styles-name">{product.title}</h3>
            <p className="styles-description">{product.description}</p>
            <p className="styles-price">{product.price}</p>
            {product.thumbsUp ? (
                <p className="styles-thumbsUp">👍</p>
              ) : (
                <p className="styles-thumbsUp">👎</p>
              )}
          </div>
        ))}
      </div>
     
    </>
  );
}

export default Products;
