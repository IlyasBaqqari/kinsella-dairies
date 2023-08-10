import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderItem from '../Components/OrderItem';
import ErrorMessage from '../Components/ErrorMessage';
import './App.css';

// Order page
export default function Order() {
  
  // Navigation
  const navigate = useNavigate();

  // Define API URL
  const accountID = localStorage.getItem('accountID');
  const REST_API_URL = 'http://localhost:5000/orders/' + accountID;

  // useQuery request
  const {isLoading, error, data} = useQuery(REST_API_URL);
  
  // Cancel order method
  const cancelOrder = () => {
    // Confirm cancelation
    if (window.confirm('Do you really want to cancel your order?') === true) {
      // Define API URL for DELETE request
      const ORDER_REST_API_URL = 'http://localhost:5000/orders/' + data.orderID;
      axios.delete(ORDER_REST_API_URL)
      // Successful request
      .then(response => {
        alert('Your order has been cancelled successfully.');
        localStorage.removeItem('orderPlaced');
        navigate('/');
      })
      // Error handling
      .catch(error => {
        alert('An error has occurred.\n\nYour order could not be cancelled. Please try again.');
      });
    }
  }

  // Loading
  if (isLoading) return "Loading...";

  // Not logged in
  if (localStorage.getItem('accountID') === null || localStorage.getItem('accountType') === null) {
    // Remove any remaining session data
    localStorage.clear();
    // Return error message
    return (
      <ErrorMessage
        title='You are not logged in'
        subtitle={
          <p>
            Please either <a href='/login'>Log in</a> or <a href='/signup'>Sign up</a>.
          </p>
        }
      />
    );
  }

  // Error handling
  if (!data || error) {
    return (
      <ErrorMessage 
        title='There was a problem loading your order'
        subtitle='Please try again later.'
      />
    );
  }

  // Return orders
  return (
    <>
      <h1 className='fw-bolder text-center mt-2 p-2'>Your Order</h1>
      <div className='border order-page m-4 p-3 d-flex flex-column justify-content-start bg-light rounded-3 shadow-sm'>
        <div className='d-flex justify-content-between'>
          <h3 className='fs-5'>Order #{data.orderID}</h3>
          <p>Payment Method: {data.paymentID.paymentType.toUpperCase()}</p>
        </div>
        <div className='basket-list bg-white p-2 rounded-3 border h-100'>
          {JSON.parse(data.orderDetails).map((item, i) => (
            <OrderItem product={item} index={i} />
          ))}
        </div>
        <div>
          <div className='mb-3 border-bottom py-2'>
            <p className='mb-0 pt-2'>Delivery Fee: £1.00</p>
            <b className='fs-5'>Total: £{data.total.toFixed(2)}</b>
          </div>
          <div className='d-flex flex-column'>
            <small className='fine-print mb-1'>
              After making an order, you have two days in which you are able to cancel your order.
              Once two days have passed, you will be charged for your order.
            </small>
            <div>
              <small className='delete-link' onClick={() => cancelOrder()}>Cancel your order</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
