import React from 'react'

// Order Item component
export default function OrderItem(props) {

    // Define price
    const price = props.product.price * props.product.quantity
  
    return(
    <div className='d-flex flex-row bg-light border justify-content-start align-items-center p-3 m-1 bg-light rounded-2'>
      <img className="rounded-2 border m-1 me-2" src={props.product.imageUrl} alt={props.product.name} width='100' height='100'/>
      <div className='d-flex flex-column align-items-start justify-content-between'>
        <h3 className='fs-6 fw-bold h-100'>{props.product.name}</h3>
        <p className='m-0'>£{price.toFixed(2)}</p>
        <p>Quantity: {props.product.quantity}</p>
      </div>
    </div>
    );
}
