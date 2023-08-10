import React, { useState } from 'react'
import axios from 'axios';
import '../Pages/App.css';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

// SignupForm component
export default function SignupForm() {

  // Navigation
  const navigate = useNavigate();

  // Define API URL
  const REST_API_URL = 'http://localhost:5000/accounts';

  // Define form useState
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    number: '',
    address1: '',
    address2: '',
    town: '',
    postcode: '',
    password: '',
    role: 'user'
  });

  // Define password visible useState
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Form submission method
  const submitForm = async (e) => {
    e.preventDefault();

    // Hash password
    const hashedPassword = CryptoJS.SHA256(form.password).toString();

    // Format object as JSON
    const requestJSON = JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      number: form.number,
      address1: form.address1,
      address2: form.address2,
      town: form.town,
      postcode: form.postcode,
      password: hashedPassword,
      role: form.role
    });

    // POST request
    axios.post(REST_API_URL, requestJSON, {
      headers: {'Content-Type':'application/json'}
    })
    // Successful response
    .then(response => {
      // Success prompt
      alert('You have signed up successfully!');
      // Store session data in localStorage
      localStorage.setItem('accountID', response.data.accountID);
      localStorage.setItem('accountType', response.data.role);
      navigate('/');
      window.location.reload();
    })
    // Error handling
    .catch(error => {
      // Error prompt
      alert("Sorry, an error has occurred\n\n"+error.response.data.message);
    });
  }

  return (
    <div className='split-area d-flex justify-content-evenly'>

      <div className='w-50 p-lg-5 d-flex flex-column align-items-center justify-content-center form-area'>

        <h2 className='mx-3 mt-3 fw-bold'>Registration</h2>
        <form className='w-100 px-xl-5' onSubmit={submitForm}>

          {/* Section 1 - Name, Phone Number */}
          <div className='p-3 d-flex flex-column'>

            <div className='d-flex my-1'>
              <div className='firstName d-flex flex-column m-1 w-100'>
                <label>First Name</label>
                <input
                  className='w-100'
                  value={form.firstName}
                  required={true}
                  maxLength='20'
                  onChange={(e) => {
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='d-flex flex-column m-1 w-100'>
                <label>Last Name</label>
                <input
                  className='w-100'
                  value={form.lastName}
                  required={true}
                  maxLength='20'
                  onChange={(e) => {
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className='d-flex flex-column m-1'>
              <label>Phone Number</label>
              <input
                className='w-100'
                value={form.number}
                required={true}
                minLength='11'
                maxLength='14'
                type='tel'
                onChange={(e) => {
                  // Validation
                  if (e.target.value.match('^[0-9]+$') || e.target.value === '')
                    setForm({
                      ...form,
                      number: e.target.value,
                    });
                }}
              />
            </div>
          </div>
          
          {/* Section 2 - Address */}
          <div className='address-entry p-3'>

            <div className='addresses d-flex flex-column m-1'>
              <div className='mb-2'>
                <label>Address Line 1</label>
                <input
                  className='w-100'
                  value={form.address1}
                  required={true}
                  maxLength='50'
                  onChange={(e) => {
                    setForm({
                      ...form,
                      address1: e.target.value,
                    });
                  }}
                />
              </div>

              <label>Address Line 2 <small className='text-gray'>(Optional)</small></label>
              <input
                className='w-100'
                value={form.address2}
                maxLength='50'
                onChange={(e) => {
                  setForm({
                    ...form,
                    address2: e.target.value,
                  });
                }}
              />
            </div>
            
            <div className='d-flex justify-content-start'>
              <div className='d-flex flex-column m-1 w-50'>
                <label>Town</label>
                <input
                  className='w-100'
                  value={form.town}
                  required={true}
                  maxLength='25'
                  onChange={(e) => {
                    setForm({
                      ...form,
                      town: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='d-flex flex-column m-1 w-50'>
                <label>Postcode</label>
                <input
                  className='w-100'
                  value={form.postcode}
                  required={true}
                  maxLength='9'
                  onChange={(e) => {
                    setForm({
                      ...form,
                      postcode: e.target.value.toUpperCase(),
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className='password d-flex flex-column m-1 p-3'>
            <label>Password</label>
            <div className='d-flex justify-content-between'>
            <input
              className='w-100'
              type={passwordVisible ? 'text' : 'password'}
              value={form.password}
              required={true}
              minLength='8'
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
          <button className='btn btn-secondary rounded-1 ms-2 p-0 px-md-3 w-25' type='button' onClick={() => setPasswordVisible(passwordVisible ? false : true)}>{passwordVisible ? 'hide' : 'show'}</button>
          </div>

          </div> 
          <div className='p-3 py-1 d-flex justify-content-start'>
            <button type='submit' className='btn w-100 btn-primary m-1 fw-bold'>
              Sign Up
            </button>
          </div>
        </form>
        <p className='text-right ms-3 mt-2'>
          Already registered? <Link to='/Login'>log in</Link>
        </p>
      </div>

      <div className='info-area w-50 p-5'>

        <h2>Fill your information here to get started!</h2>
        <p>
          We're thrilled to have you join us. To get started, follow these easy steps.
        </p>

        <h3>Provide your details</h3>
        <p>
        Fill in your first and last name, phone number, and address. You can do this by clicking on each field using your cursor and entering your details with the keyboard.
        Make sure that the details entered are accurate before you proceed.
        </p>

        <h3>Create a password</h3>
        <p>
          Create a secure password for your account. 
          This should be 8 characters or longer. 
          Try to use a mix of uppercase and lowercase letters, numbers, and symbols.
          Write it down somewhere safe as you will need it to log in.
        </p>
        <p>
          You can view your password by clicking the show button next to the password field.
          Clicking it a second time will hide your password.
        </p>
        
        <h3>Submit your details</h3>
        <p>
          Once you have filled in all of the required information, click the <b>Sign Up</b> button to create your account.
        </p>

        <h3>Already have an account?</h3>
        <p>
          If you have already created a Kinsella Dairies online account, simply proceed to the <b>Log in</b> page to sign in.
        </p>
      </div>
    </div>
  );
}