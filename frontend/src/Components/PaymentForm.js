import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

// Payment form component
export default function PaymentForm(props) {

  // Navigation
  const navigate = useNavigate();

  // Define API URLs
  const PAYMENT_REST_API_URL = 'http://localhost:5000/payments';
  const ORDER_REST_API_URL = 'http://localhost:5000/orders';

  // Get order details
  let order = props.order;

  // Get basket details
  let basket = props.basket;
  const modifyStock = props.modifyStock;

  // Define form useState
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Submit payment method
  const submitCardPayment = async (e) => {
    e.preventDefault();

    // Format expiry date
    const expiry = form.expiry.substring(5) + form.expiry.substring(2,4);

    // Make card details string
    const cardDetails = form.cardNumber + expiry + form.cvv;
    
    // Format object as JSON
    const requestJSON = {
      paymentType: 'card',
      cardDetails: cardDetails
    }

    // POST request
    axios.post(PAYMENT_REST_API_URL, requestJSON, {
      headers: {'Content-Type':'application/json'}
    })
    // Successful response
    .then(response => {
      submitOrder(response.data.paymentID);
    })
    // Error handling
    .catch(error => {
      alert('An error occurred and your order could not be placed.\n\nPlease try again later.')
      console.error(error);
    });
  }

  // Submit order method
  const submitOrder = async (paymentID) => {

    // Format object as JSON
    const requestJSON = JSON.stringify({
      orderDetails: order.orderDetails,
      date: order.date,
      total: order.total,
      accountID: order.accountID,
      paymentID: {
        paymentID: paymentID
      }
    });

    // POST request
    axios.post(ORDER_REST_API_URL, requestJSON, {
      headers: {
        'Content-Type':'application/json'
      }
    })
    // Successful response
    .then(response => {
      // Prompt user and manage data
      alert("Your order has been placed successfully!");
      modifyStock(basket);
      localStorage.setItem('orderPlaced','true');
      localStorage.removeItem('basket');
      navigate('/order');
    })
    // Error handling
    .catch(error => {
      alert('An error occurred and your order could not be placed.\n\nPlease try again later.')
      console.error(error);
    })
  }

  return (
    <div>
      <form onSubmit={submitCardPayment}>
        <div className='d-flex flex-column m-0'>
          <label className='mt-4 mb-1'>Card Number</label>
          <input
            className='w-100'
            required
            minLength='16'
            maxLength='16'
            value={form.cardNumber}
            onChange={e => {
              if (e.target.value.match('^[0-9]+$') || e.target.value === '')
                setForm({
                  ...form,
                  cardNumber: e.target.value
                });
            }}
            />
        </div>
        <div className='d-flex justify-content-start m-0 p-0'>
          <div className='d-flex flex-column w-50 me-2'>
            <label className='mt-2 mb-1'>Expiry Date</label>
            <input
              className='h-100'
              required
              type="month"
              value={form.expiry}
              onChange={e => {
                setForm({
                  ...form,
                  expiry: e.target.value
                });
              }}
            />
          </div>

          <div className='d-flex flex-column w-25'>
            <label className='mt-2 mb-1'>CVV</label>
            <input 
              required
              minLength='3'
              maxLength='4'
              value={form.cvv}
              onChange={e => {
                if (e.target.value.match('^[0-9]+$') || e.target.value === '')
                  setForm({
                    ...form,
                    cvv: e.target.value
                  });
              }}
              />
          </div>
        </div>
        <button className='btn btn-success w-100 mt-3' type='submit'>Confirm Payment</button>
      </form>
    </div>
  );
}
