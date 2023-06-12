'use client';
import React,{useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { get_LoginUser } from '../Graphql/queries/Queries';
function Products() {
  const { loading, error, data } = useQuery(get_LoginUser, {
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
  if (error) return <p className="loading">{error.message}</p>;
  

  return (
    <div className='my products'>
      <p className='styles-title'>my products</p>
      {data.loginUser.products.map((product) => (
        <div key={product.id} className="styles-card">
          <h3 className="styles-name">{product.title}</h3>
          <p className="styles-description">{product.description}</p>
          <p className="styles-price">{product.price}</p>
          <p className="styles-thumbsUp">{product.thumbsUp}</p>
        </div>
      ))}
    </div>

  );
}

export default Products;
