import React from 'react';
import './products.css';
import Products from '../components/LogInUserProducts/Products';
import Allproducts from '../components/All products/Allproducts';
function page() {
  return (
    <div>
    <Products  />
    <div className='gap' />
    <Allproducts  />
    <div className='gap' />

  </div>
  
  );
}

export default page;
