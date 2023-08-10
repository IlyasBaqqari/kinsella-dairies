import React from 'react';
import '../Pages/App.css';
import { useNavigate } from 'react-router-dom';

// Product List Item component
export default function ProductListItem(props) {

  // Navigation
  const navigate = useNavigate();
    
  // Get imported product
  const product = props.product

  // Add to basket method
  const addToBasket = product => {
    
    // Add quantity property to product object
    product.quantity = 1;

    // Create basket in session storage if it does not exist
    if (localStorage.getItem('basket') === null)
      localStorage.setItem('basket', JSON.stringify([]));

    // Get current basket
    let basket = JSON.parse(localStorage.getItem('basket'));

    // If there are items in the basket
    if (basket.length > 0) {
      // Check variable
      let inBasket = false

      // Loop for all items in basket
      for (let i = 0; i < basket.length; i++) {
        // If current item is in the basket, add 1 to quantity
        if (basket[i].name === product.name) {
          if (basket[i].quantity < 10 && basket[i].quantity < product.stock) {
            basket[i].quantity += 1;
            localStorage.setItem('basket', JSON.stringify(basket));
          } 
          // Max limit prompt
          else {
            alert('You can\'t add any more of that item to your basket.')
            return;
          }
          inBasket = true;
        }
      }

      // If item not in basket, add to basket
      if (!inBasket) {
        basket.push(product);
        localStorage.setItem('basket', JSON.stringify(basket));
      }
    }
    // If basket is empty, add item to basket
    else {
      basket.push(product);
      localStorage.setItem('basket', JSON.stringify(basket));
    }

    // Refresh window
    window.location.reload();
  }

  // Return component
  return (
    // Different display for in stock and not in stock
    product.stock >= 1 
    // In stock
    ? <div 
        className='product-listing bg-light border d-flex flex-column justify-content-between p-3 m-2 rounded-3 col-1'
        key={product.productID}
      >
        <h2 className='fs-5 h-100 w-100'>{product.name}</h2>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex flex-column justify-content-end mb-2 pb-1 me-1'>
            <p className='m-0 fw-bold'>£{product.price.toFixed(2)}</p>
            <small className='m-0'>{product.stock} in stock</small>
          </div>
          <img className='product-image border rounded-1 mb-2' src={product.imageUrl} alt={product.name}/>
        </div>
        {// Only display the add to cart button if user is logged in
        localStorage.getItem('accountID') !== null && localStorage.getItem('accountType') !== null
        // Logged in
        ? <button
            className='btn btn-secondary'
            onClick={() => addToBasket(product)}
          >Add to Cart</button> 
        // Not loged in
        : <button className='btn btn-outline-secondary' onClick={() => navigate('/login')}>
            Log in to buy
          </button>
        }
      </div>
    // Not in stock
    : <div 
        className='product-listing bg-light border d-flex flex-column justify-content-between bg-light p-3 m-2 rounded-3'
        key={product.productID}
      >
        <h2 className='fs-5 h-100 w-100'>{product.name}</h2>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex flex-column justify-content-end mb-2 pb-1 me-1'>
            <p className='m-0 fw-bold'>£{product.price.toFixed(2)}</p>
          </div>
          <img className='product-image border rounded-1 mb-2' src={product.imageUrl} alt={product.name}/>
        </div>
        <button className='btn btn-outline-secondary' disabled>
          Sold Out
        </button>
      </div> 
  );
}