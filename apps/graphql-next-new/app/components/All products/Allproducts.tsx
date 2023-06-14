'use client';
import './Products.css';
import React, { useEffect } from 'react';
import {  useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { All_Products } from '../Graphql/queries/Queries';

function Allproducts() {
    const { loading, error, data } = useQuery(All_Products, {
        fetchPolicy: 'no-cache', // Doesn't check cache before making a network request
      });
    
      const router = useRouter();
    
      useEffect(() => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken');
          if (!token) router.push('/signIn');
          if (!data) {
            <p>Loading...</p>;
          }
        }
      }, []);
    
    

      if (loading) return <p className="loading">Loading ....</p>;
      if (error) return <p className="error">{error.message}</p>;
    
      return (
        <>
        <div className="navbar-style">
          <p className="styles-title">all products</p>
        </div>
        <div className="my-products">
          {data.getAllProducts.map((product) => (
            <div key={product.id} className="styles-card">
              <h3 className="styles-name">{product.title}</h3>
              <p className="styles-description">{product.description}</p>
              <p className="styles-price">{product.price}</p>
              {product.thumbsUp ? (
                <p className="styles-thumbsUp">👍</p>
              ) : (
                <p className="styles-thumbsUp">👎</p>
              )}
              {product.user && (
                <div className="styles-user">
                  <h4>User:</h4>
                  <p>{product.user.name}</p>
                  <p>{product.user.email}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
      
      
      );
}

export default Allproducts