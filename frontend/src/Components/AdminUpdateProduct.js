import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Admin update product component
export default function AdminUpdateProduct(props) {

  // Get product
  const product = props.product;

  // Define modal form useState
  const [form, setForm] = useState({
    name: product.name,
    price: product.price
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

  // Update product method
  const updateProduct = async (e) => {
    e.preventDefault();

    // Create request body
    let requestBody = new FormData();
    requestBody.append('image', image);
    requestBody.append('productID', product.productID);
    requestBody.append('name', form.name);
    requestBody.append('price', form.price);

    // PUT request
    axios.put(REST_API_URL, requestBody, {
      headers: {'Content-Type':'multipart/form-data'}
    })
    // Successful response
    .then(response => {
      alert('The product has been updated successfully!')
    })
    // Error handling
    .catch(error => {
      alert('An error has occurred and the product could not be updated.\n\nCheck that the backend and database are functional and try again.');
      console.error(error);
    });

    // Close the modal
    handleClose();
  }

  return (
    <>
      <button className='btn btn-primary w-100 fw-bold mt-2' onClick={handleShow}>Update Product</button>
      <Modal style={{opacity: 1}} animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Update Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={updateProduct}>
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
