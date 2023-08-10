import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasketItem from './BasketItem';
import PaymentForm from './PaymentForm';

// Basket component
export default function Basket() {
    
  // Navigation
  const navigate = useNavigate();

  // Define API URLs
  const PAYMENT_REST_API_URL = 'http://localhost:5000/payments';
  const ORDER_REST_API_URL = 'http://localhost:5000/orders';

  // Define order useState
  const [order, setOrder] = useState({
    orderDetails: '',
    date: '',
    total: 0,
    accountID: {
      accountID: 0
    }
  });
  
  // Define other useStates
  const [basket, setBasket] = useState([]);
  const [paying, setPaying] = useState(false);
  const [payingCash, setPayingCash] = useState(false);
  const [payingCard, setPayingCard] = useState(false);

  // Get basket useEffect
  useEffect(() => {
    // Get basket from session storage if exists
    if (localStorage.getItem('basket') !== null)
      setBasket(JSON.parse(localStorage.getItem('basket')));
  }, []);

  // Calculate total price + £1 delivery fee
  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    1
  );

  // Modify stock method
  const modifyStock = async () => {
    for (let i = 0; i < basket.length; i++) {
      // Define API URL
      let STOCK_REST_API_URL = 'http://localhost:5000/admin/products/stock/' + basket[i].productID;
      
      // Get new stock value
      let newStock = basket[i].stock - basket[i].quantity;
      
      // Format request JSON
      let requestJSON = JSON.stringify({
        stock: newStock
      });

      // PUT request
      axios.put(STOCK_REST_API_URL, requestJSON, {
        headers: {'Content-Type':'application/json'}
      })
      // Error handling
      .catch(error => {
        alert('An error occurred and your order could not be placed.\n\nPlease try again later.')
        console.error(error);
      });
    }
  }

  // Start order method
  const startOrder = () => {
    // Prompt user if not logged in
    if (localStorage.getItem('accountID') === null || localStorage.getItem('accountType') === null) {
      alert('You must be logged in to make an order.');
      navigate('/login');
      return;
    }
    // Propmt user if they already have an order
    else if (localStorage.getItem('orderPlaced') === 'true')
      return alert('You already have an existing order, please cancel it or wait until it arrives before making a new one.');

    // Get user data from localStorage
    const accountID = localStorage.getItem('accountID');
    const items = localStorage.getItem('basket');

    // Get date
    const fullDate = new Date();
    const day = fullDate.getDate() < 10 ? 0 + fullDate.getDate().toString(): fullDate.getDate().toString();
    const month = (fullDate.getMonth() + 1) < 10 ? 0 + (fullDate.getMonth() + 1).toString(): (fullDate.getMonth() + 1).toString();
    const year = fullDate.getFullYear().toString();
    const orderDate = day + month + year;

    // Update order useState
    setOrder({
      orderDetails: items,
      date: orderDate,
      total: total,
      accountID: {
        accountID: accountID
      }
    });

    // Start payment process
    setPaying(true);
  }

  // Submit payment method
  const submitCashPayment = async () => {

    // Format object as JSON
    const requestJSON = {
      paymentType: 'cash',
      cardDetails: ''
    }

    // POST request
    axios.post(PAYMENT_REST_API_URL, requestJSON, {
      headers: {
        'Content-Type':'application/json'
      }
    })
    // Successful response
    .then(response => {
      const paymentID = response.data.paymentID;
      submitOrder(paymentID);
    })
    // Error handling
    .catch(error => {
      alert('An error occurred and your order could not be placed.\n\nPlease try again later.')
      console.error(error);
    });
  }

  // Submit order method
  const submitOrder = async (paymentID) => {

    // Create request JSON
    const requestJSON = JSON.stringify({
      orderDetails: order.orderDetails,
      date: order.date,
      total: order.total,
      accountID: {
        accountID: order.accountID.accountID,
      },
      paymentID: {
        paymentID: paymentID
      }
    })
    
    //POST request
    axios.post(ORDER_REST_API_URL, requestJSON, {
      headers: {
        'content-type':'application/json',
        'Access-Control-Allow-Origin': '*'
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
    });
  }

  // Cancel order method
  const stopOrder = () => {
    setPaying(false);
    setPayingCash(false);
    setPayingCard(false);
  } 

  // If the user is not logged in
  if (localStorage.getItem('accountID') === null || localStorage.getItem('accountType') === null)
    return (
      <div className='basket border d-flex flex-column justify-content-start align-middle bg-light p-3 rounded-3 w-100'>
        <h2>Basket</h2>
        <p className='mt-1 pt-2'>You are not logged in. Please <a href='/signup'>Sign up</a> for an account, or <a href='/login'>Log in</a> to your existing account to add items to your basket.</p>
      </div>
    );

  // If the basket has contents and the user is not paying
  else if (basket.length && paying === false) 
    return (
      <div className='basket border d-flex flex-column justify-content-start align-middle bg-light p-3 rounded-3 w-100'>
        <h2 className='fw-bold'>Basket</h2>
        <div className='basket-list bg-white p-2 rounded-3 border '>
          {basket.map(item => (
            <BasketItem product={item} basket={basket} setBasket={setBasket} />
          ))}
        </div>
        <p className='mt-1 mb-0 pt-2'>Delivery Fee: £1.00</p>
        <b className='mb-1 pb-2 fs-5'>Total: £{total.toFixed(2)}</b>
        <button className='btn btn-primary fw-bold' onClick={() => startOrder()}>Place Order</button>
      </div>
    );

  // If paying
  else if (basket.length && paying === true)
    return(
      <div className='basket border d-flex flex-column justify-content-between align-middle bg-light p-3 rounded-3 w-100'>
        <div>
          <div className='d-flex justify-content-between'>
            <h2 className='fw-bold'>Payment</h2>
            <button className='btn btn-outline-secondary fw-bold p-2 py-1' onClick={() => stopOrder()}>Go Back</button>
          </div>
          <p className='mb-1 pb-2 fs-5'>Total: £{total.toFixed(2)}</p>
          <h3 className='fs-5 mt-3'>Select a payment method</h3>
          <div className='d-flex mt-2'>
            <button 
              className={
                payingCash
                ? 'btn btn-secondary me-1 w-50'
                : 'btn btn-outline-secondary me-1 w-50'
              }
              onClick={() => {
                setPayingCash(true)
                setPayingCard(false)
              }}>Cash</button>
            <button 
              className={
                payingCard
                ? 'btn btn-secondary me-1 w-50'
                : 'btn btn-outline-secondary me-1 w-50'
              }
              onClick={() => {
                setPayingCard(true);
                setPayingCash(false);
              }}>Card</button>
          </div>
          {
            payingCash
            ? <button className='btn btn-success mt-3 w-100' onClick={() => submitCashPayment()}>Confirm Payment</button>
            : null
          }
          {
            payingCard
            ? <PaymentForm order={order} basket={basket} modifyStock={modifyStock} />
            : null
          }
        </div>
        <button className='btn btn-danger mt-2' onClick={() => stopOrder()}>Cancel</button>
      </div>
    );
  
  // If the basket is empty
  else return(
    <div className='basket border d-flex flex-column justify-content-start align-middle bg-light p-3 rounded-3 w-100'>
      <h2>Basket</h2>
      <p className='mt-1 pt-2'>Your basket is empty.</p>
    </div>
  );
}
