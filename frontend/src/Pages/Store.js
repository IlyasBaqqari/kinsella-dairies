import React from 'react'
import ProductList from '../Components/ProductList';
import Basket from '../Components/Basket';

// Store page
export default function Store() {
  return (
    <div className='w-100'>
      <h1 className='mx-3 mt-3 fw-bold text-center pb-2'>Shop</h1>
      <div className='d-flex justify-content-start align-items-start'>
        <div className='d-flex w-100 justify-content-center'>
          <ProductList />
        </div>
        <div className='col-4 m-2 mt-0 pt-2'>
          <Basket />
        </div>
      </div>
    </div>
  );
}