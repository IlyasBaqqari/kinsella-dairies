import React from 'react'
import { useQuery } from 'react-query';
import AdminCreateProduct from '../Components/AdminCreateProduct';
import AdminDeleteProduct from '../Components/AdminDeleteProduct';
import AdminUpdateProduct from '../Components/AdminUpdateProduct';
import StockManagement from '../Components/StockManagement';
import ErrorMessage from '../Components/ErrorMessage';
import './App.css';

// Admin page
export default function Admin() {

  // Define Products API URL
  const PRODUCT_REST_API_URL = 'http://localhost:5000/products';

  // useQuery request
  const { isLoading, error, data } = useQuery(PRODUCT_REST_API_URL);

  // If loading
  if (isLoading) return 'Loading...';

  // Error handling
  if (!data || error) 
    return (
      <ErrorMessage 
        title='Error retrieving product data'
        subtitle='Check that the backend and database are functional and try again.'
      />
    );

  // Successful response
  return (
    <>
      <h1 className='mx-3 mt-3 fw-bold text-center pb-3 border-bottom'>Admin Dashboard</h1>
      <div className="d-flex mx-5 mb-4 px-5 justify-content-center">
        <AdminCreateProduct />
      </div>
      <div className="admin-product-area border d-flex flex-wrap justify-content-start w-100">
        {data?.map((product) => (
          <div className="col-3 d-flex flex-column justify-content-between" key={product.productID}>
            <div className='bg-white border d-flex flex-column justify-content-between m-2 p-3 h-100 rounded-2'>
              <div className="d-flex justify-content-between align-items-start">
                <h5> {product.name}</h5>
                <AdminDeleteProduct productID={product.productID} />
              </div>
              <div className='d-flex justify-content-start'>
                <img className="rounded-1 border " src={product.imageUrl} width='100' height='100' alt={product.name} />
                <div className='d-flex flex-column justify-content-between ms-2 ps-1'>
                  <p className='mt-0 fw-bold'>ID: {product.productID}</p>
                  <div>
                    <p className='my-0'>Price: £{product.price.toFixed(2)}</p>
                    <p className='my-0'>Stock: {product.stock}</p>
                  </div>
                </div>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <AdminUpdateProduct product={product} />
                <StockManagement product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
 
}
