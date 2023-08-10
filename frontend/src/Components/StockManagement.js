import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Stock management component
export default function StockManagement(props) {
  
  // Get product
  const product = props.product;

  // Define modal form useState
  const [form, setForm] = useState({
    stock: product.stock
  });
  
  // Define show useState
  const [show, setShow] = useState(false);

  // Modal handler methods
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Define API URL
  const REST_API_URL = 'http://localhost:5000/admin/products/stock/' + product.productID;

  // Update stock method
  const updateStock = async (e) => {
    e.preventDefault();

    // Format object as JSON
    const requestJSON = JSON.stringify(form);

    // PUT request
    axios.put(REST_API_URL, requestJSON, {
      headers: {'Content-Type':'application/json'}
    })
    // Successful response
    .then(response => {
      alert('You have updated the stock level of this product successfully!')
    })
    .catch(error => {
      alert('An error has occurred and the stock level of this product could not be updated.\n\nCheck that the backend and database are functional and try again.');
      console.error(error);
    });

    // Close the modal
    handleClose();
  }

  return (
    <>
      <button className='btn btn-secondary w-100 mt-2 py-0' onClick={handleShow}>Set Stock Level</button>
      <Modal style={{opacity: 1}} animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Set Stock Level</Modal.Title>
        </Modal.Header>
        <form onSubmit={updateStock}>
          <Modal.Body>
            <label className='d-flex flex-column m-2'>Stock Level
              <input 
                className='w-25'
                required
                type='number'
                step='1'
                min='0'
                max='10000'
                value={form.stock}
                onChange={e => {
                  setForm({
                    ...form,
                    stock: e.target.value
                  });
                }}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='primary'>
              Save Changes
            </Button>
            <Button variant='outline-secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );

}
