import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

// Admin Create Product component
export default function AdminCreateProduct() {

  // Define modal form useState
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: ''
  });

  // Define image useState
  const [image, setImage] = useState(null);
  
  // Define show useState
  const [show, setShow] = useState(false);

  // Modal handler methods
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Define API URL
  const REST_API_URL = 'http://localhost:5000/admin/products';

  // Create product method
  const createProduct = async (e) => {
    e.preventDefault();

    // Create request body
    let requestBody = new FormData();
    requestBody.append('image', image);
    requestBody.append('name', form.name);
    requestBody.append('price', form.price);
    requestBody.append('stock', form.stock);

    // POST request
    axios.post(REST_API_URL, requestBody, {
      headers: {'Content-Type':'multipart/form-data'}
    })
    // Successful response
    .then(response => {
      alert('The product has been added successfully!');
    })
    // Error handling
    .catch(error => {
      alert('An error has occurred and the product could not be added.\n\nCheck that the backend and database are functional and try again.');
      console.error(error);
    });

    // Reset useStates
    setForm({
      name: '',
      price: '',
      stock: ''
    });
    setImage(null);
    
    // Close the modal
    handleClose();
  }

  return (
    <>
      <button className='btn btn-success fw-bold fs-4 px-5 mt-3 shadow' onClick={handleShow}>Add a Product</button>
      <Modal style={{opacity: 1}} animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Add a Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={createProduct}>
          <Modal.Body>
            <label className='d-flex flex-column m-2'>Product Name
              <input 
                required
                maxLength='100'
                value={form.name}
                onChange={e => {
                  setForm({
                    ...form,
                    name: e.target.value
                  });
                }}
              />
            </label>
            <label className="d-flex flex-column m-2 w-25">Price (£)
              <input
                required
                max='999.99'
                value={form.price}
                type='number'
                min='0.01'
                step='0.01'
                onChange={e => {
                  setForm({
                    ...form,
                    price: e.target.value
                  });
                }}
              />
            </label>
            <label className='d-flex flex-column m-2 py-3 col-6'>Image
              <p className='text-secondary mb-1'>(Drag and drop or select a file)</p>
              <div>
                <input 
                  required
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
            </label>
            <label className='d-flex flex-column m-2'>Initial Stock Level
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
              Add Product
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
