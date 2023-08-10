import React from 'react';
import confused from '../Images/confused.png';

// Error message component
export default function ErrorMessage(props) {
    
    // Initialise imported properties
    const title = props.title;
    const subtitle = props.subtitle;

    return (
      <div className='p-3 d-flex'>
        <img src={confused} width='130' height='130' className='rounded-2' />
        <div className='d-flex flex-column mx-3 align-self-center'>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
    );

}