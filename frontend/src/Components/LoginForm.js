import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Pages/App.css';
import CryptoJS from 'crypto-js';

export default function LoginForm() {

  // Navigation
  const navigate = useNavigate();

  // Define API URL
  const REST_API_URL = 'http://localhost:5000/login';

  // Define form useState
  const [form, setForm] = useState({
    number: '',
    password: ''
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
      number: form.number,
      password: hashedPassword
    });

    // POST request
    axios.post(REST_API_URL, requestJSON, {
      headers: {'Content-Type':'application/json'}
    })
    // Successful response
    .then(response => {
      // Set data
      localStorage.setItem('accountID',response.data[0]);
      localStorage.setItem('accountType',response.data[1]);
      alert("You have logged in successfully!");
      navigate('/');
      window.location.reload();
    })
    // Error handling
    .catch(error => {
      alert("Sorry, an error has occurred\n\n"+error.response.data.message);
    });
  };


  return (
    <div className='split-area d-flex justify-content-evenly'>

      <div className='w-50 p-lg-5 d-flex flex-column align-items-center justify-content-center form-area'>

        <h2 className='mx-3 mt-3 fw-bold'>Log in</h2>
        <form className='w-100 px-xl-5' onSubmit={submitForm}>

          <div className='p-3 d-flex flex-column'>

            <div className='w-100 d-flex flex-column mb-1'>
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
            
            <div className='password d-flex flex-column'>
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
                <button className="btn btn-secondary rounded-1 ms-2 p-0 px-md-3 w-25 text-center" type='button' onClick={() => setPasswordVisible(passwordVisible ? false : true)}>{passwordVisible ? "hide" : "show"}</button>
              </div>
            </div>

          </div>
          
          

          <div className='p-3 py-1 d-flex justify-content-start'>
            <button type='submit' className='btn w-100 btn-primary fw-bold'>
              Log In
            </button>
          </div>
        </form>
        <p className='text-right ms-3 mt-2'>
          Don't have an account yet? <Link to='/Signup'>sign up</Link>
        </p>
      </div>

      <div className='info-area w-50 p-5'>

        <h2>Welcome back!</h2>
        <p>
          To get into your account, follow these easy steps.
        </p>

        <h3>Enter your credentials</h3>
        <p>
        Fill in the phone number, and password that you used when you signed up for your online Kinsella Dairies account.
        You can do this by clicking on each field using your cursor and entering your details with the keyboard.
        Make sure that you enter the correct information before submiting your details.
        </p>
        <p>
          You can view your password by clicking the <b>show</b> button next to the password field.
          Clicking it again will hide your password.
        </p>

        <h3>Submit your details</h3>
        <p>
          Once you have entered the phone number and password tied to your Kinsella Dairies online account, click the <b>Log In</b> button to proceed.
        </p>

        <h3>Don't have an account yet?</h3>
        <p>
          If you have do not yet have a Kinsella Dairies online account, proceed to the <b>Sign Up</b> page to register yourself for one.
        </p>
      </div>
    </div>
  );
}
