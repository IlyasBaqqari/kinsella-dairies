import React from "react";
import '../Pages/App.css';
import { useQuery } from 'react-query';
import ProductListItem from './ProductListItem';
import ErrorMessage from "./ErrorMessage";

// Product List component
export default function ProductList() {
  
  // Define API URL
  const REST_API_URL = 'http://localhost:5000/products';

  // Get data method
  const GetData = () => {
    const {isLoading, error, data} = useQuery(REST_API_URL, {retry: false});

    // Loading
    if (isLoading) return "Loading...";

    // Error handling
    if (!data?.[0] || error) {
      return (
        <ErrorMessage
          title='There is a problem with our store at the moment...'
          subtitle='Please try again later.'
        />
      );
    }

    // Successful request
    return (
      <div className='d-flex justify-content-end'>
        <div className='product-list d-flex flex-wrap justify-content-start'>
          {data?.map(product => (
            <ProductListItem product={product}/>
          ))}
        </div>
      </div>
    );
  }

  // Return the Get Data result
  return GetData();
}
