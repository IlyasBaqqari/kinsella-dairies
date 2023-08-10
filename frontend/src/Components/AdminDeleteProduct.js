import React from 'react';
import axios from 'axios';

export default function AdminDeleteProduct(props) {

  // Define API URL
  const REST_API_URL = 'http://localhost:5000/admin/products/' + props.productID;

  // Delete product method
  const deleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product?\n\nThis operation cannot be undone.') === true)
      // DELETE request
      axios.delete(REST_API_URL)
      //Successful response
      .then(response => {
        alert('The product has been deleted successfully.');
      })
      .catch(error => {
        alert('An error has occurred and the product could not be deleted.\n\nCheck that the backend and database are functional and try again.')
        console.error(error);
      });
  }

  return <button className='btn btn-outline-danger m-2 mt-0 me-0' id='delete' onClick={deleteProduct}>✕</button>;
}