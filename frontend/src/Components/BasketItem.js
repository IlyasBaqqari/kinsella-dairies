import React from 'react';

// Basket increment function
function incrementQuantity(basket, name) {
  // If item exists, get its index
  const existingItemIndex = basket.findIndex(
    item => item.name === name
  );
  // Prompt user if limit is reached
  if (basket[existingItemIndex].quantity >= 10 || basket[existingItemIndex].stock < basket[existingItemIndex].quantity + 1) {
    alert('You can\'t add any more of that item to your basket.')
    return [...basket];
  }
  // If within limit, add to basket
  basket[existingItemIndex].quantity++;
  return [...basket];
}

// Basket decrement function
function decrementQuantity(basket, name) {
  // Get item index
  const existingItemIndex = basket.findIndex(
    item => item.name === name
  );
  // If quantity is 1, remove from basket
  if (basket[existingItemIndex].quantity === 1)
    basket.splice(existingItemIndex, 1);
  // If quantity > 1, decrement
  else basket[existingItemIndex].quantity--;
  return [...basket];
}

// Basket item component
export default function BasketItem({product, basket, setBasket}) {
   
  // Assign values
  const {imageUrl, name, quantity} = product;

  // Remove item method
  const removeItem = name => {
    const newBasket = decrementQuantity(basket, name);
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  }

  // Add item method
  const addItem = name => {
    const newBasket = incrementQuantity(basket, name);
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  }

  // Set the price
  const price = (product?.price * product?.quantity).toFixed(2);

  return (
    <div className='d-flex flex-row bg-light border justify-content-between align-items-center p-3 m-1 bg-light rounded-2 w-100'>
      <div className='d-flex flex-column align-items-start w-50'>
        <div className='d-flex justfy-content-between w-100'>
          <div className='d-flex flex-column justify-content-end'>
            <h3 className='fs-6 h-100'>{name}</h3>
            <p className='m-0'>£{price}</p>
            <p>Quantity: {quantity}</p>
          </div>
        </div>
        <div className='d-flex justify-content-start w-100'>
          <button className='btn btn-danger m-1 py-1 px-3 fw-bold' onClick={() => removeItem(name)}> - </button>
          <button className='btn btn-success m-1 py-1 px-3 fw-bold' onClick={() => addItem(name)}> + </button>
        </div>
      </div>
      <img className="rounded-2 border m-1 w-25 h-25" src={imageUrl} alt={name}/>
    </div>
  );
}