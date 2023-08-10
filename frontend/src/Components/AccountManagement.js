import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/App.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import ErrorMessage from '../Components/ErrorMessage';
import CryptoJS from 'crypto-js';

// Accounts management component
export default function AccountManagement() {

  // Navigation
  const navigate = useNavigate();
  
  // Define API URL
  const REST_API_URL = 'http://localhost:5000/accounts/' + localStorage.getItem('accountID');

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
    newPassword: ''
  });

  // Define password visible useStates
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  
  // Update account method
  const updateAccount = async (e) => {
    e.preventDefault();
    
    // Format object as JSON
    const requestJSON = JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      number: form.number,
      address1: form.address1,
      address2: form.address2,
      town: form.town,
      postcode: form.postcode
    });

    // PUT request
    axios.put(REST_API_URL, requestJSON, {
      headers: {'Content-Type':'application/json'}
    })
    // Successful response
    .then(response => {
      alert('Your account information has been updated successfully!');
      window.location.reload();
    })
    // Error handling
    .catch(error => {
      alert(error.response.data.message);
    });
  }

  // Update password method
  const updatePassword = async (e) => {
    e.preventDefault();

    // Hash passwords
    const hashedOldPassword = CryptoJS.SHA256(form.password).toString();
    const hashedNewPassword = CryptoJS.SHA256(form.newPassword).toString();

    // Create request body
    let requestBody = new FormData();
    requestBody.append('oldPassword',hashedOldPassword);
    requestBody.append('newPassword',hashedNewPassword);

    // Define password API URL
    const PASS_REST_API_URL = 'http://localhost:5000/accounts/pass/' + localStorage.getItem('accountID');

    // PUT request
    axios.put(PASS_REST_API_URL, requestBody, {
      headers: {'Content-Type':'multipart/form-data'}
    })
    // Successful response
    .then(response => {
      alert('Your password has been changed successfully!');
      window.location.reload();
    })
    // Error handling
    .catch(error => {
      alert(error.response.data.message);
    });
  }

  // Logout method
  const logOut = () => {
    if (window.confirm('Do you really want to log out?')) {
      localStorage.clear();
      alert('You have been logged out successfully.\n\nSee you later!');
      navigate('/');
      window.location.reload();
    }
  }

  // Delete account method
  const deleteAccount = async (e) => {
    e.preventDefault();

    // Ask the user twice to confirm deletion
    if (window.confirm('Do you really want to delete your account?\n\nAll your data will irreversibly be erased permanently') === true) {
      if (window.confirm('Are you really sure that you wish to PERMENANTLY DELETE your account along with all of the information tied to it.\n\nThis CANNOT BE UNDONE?') === true) {
        // DELETE request
        axios.delete(REST_API_URL)
        // Successful response
        .then(response => {
          alert('Your account has been deleted successfully.\n\nWe\'re sorry to see you go.');
          localStorage.clear();
          navigate('/');
          window.location.reload();
        })
        // Error handling
        .catch(error => {
          alert(error.response.data.message);
        });
      }
    }
  }
  
  // Get data method
  const GetData = () => {
    const {isLoading, error, data} = useQuery(REST_API_URL,
      {onSuccess: (data) => {
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          number: data.number,
          address1: data.address1,
          address2: data.address2,
          town: data.town,
          postcode: data.postcode
        })
      },
      retry: false});

    // Loading
    if (isLoading) return 'Loading...'

    // Error handling for request errors, or if user is not logged in
    if (error || !data || localStorage.getItem('accountID') === null || localStorage.getItem('accountType') === null) {

      // Remove any remaining session data
      localStorage.clear();

      return (
        <ErrorMessage
          title='You are not logged in'
          subtitle={
            <p>
              Please either <a href='/login'>Log in</a> or <a href='/signup'>Sign up</a>.
            </p>
          }
        />
      );
    }

    // If user is logged in
    return (
      <>
        <h1 className='mx-3 mt-3 fw-bold text-center mb-3'>Your Account</h1>
        <div className='d-flex flex-md-row flex-column justify-content-between align-items-center align-items-md-start m-4 m-md-2'>
          {/* Left Side */}
          <div className='mt-md-3 ms-md-3 col-md-8 d-flex flex-column align-items-center'>
            {/* Your details section */}
            <div className='bg-light p-3 pb-4 rounded-3 d-flex flex-column border w-md-75'>          
              <form className='m-2'onSubmit={updateAccount}>
                <div className='p-3 mx-1 pb-0'>
                  <h2>Your Details</h2>
                  <p>
                    Your personal details tied to your Kinsella Dairies online account are displayed below.
                    You can change any of these details by clicking the respective field, editing the contents, and then clicking the Update my Details button.
                  </p>
                  <p>
                    Please make sure your information is entered correctly and is accurate.
                  </p>
                </div>
                <div className='name-entry d-flex flex-column'>
                  
                  <div className='p-3 d-flex flex-column'>

                    <div className='d-flex my-1'>
                      <div className='firstName d-flex flex-column me-1 mt-1 w-100'>
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

                      <div className='d-flex flex-column mt-1 w-100'>
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

                      <div className='d-flex flex-column mt-1'>
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

                  
                <div className='address-entry p-3'>

                  <div className='addresses d-flex flex-column mt-1'>
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
                    <div className='d-flex flex-column me-1 mt-1 w-50'>
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

                    <div className='d-flex flex-column mt-1 w-50'>
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
                <button type='submit' className='mx-3 mt-3 rounded-1 btn btn-primary fw-bold'>Update my details</button>
              </div>
              </form>
            </div>
            {/* Update Password Section */}
            <div className='bg-light border rounded-3 m-3 d-flex flex-column w-100 w-md-75'>
              <form className='m-3' onSubmit={updatePassword}>
                <div className='p-3 mx-1 pb-0'>
                  <h2>Change your Password</h2>
                  <p>
                    If you would like to change your password, enter your current password in the first box, then enter a new password in the second box.
                    Once you have entered your old password and a new password, click the Change password button to confirm the change.
                  </p>
                  <p>
                    You can view the passwords as you enter them by clicking the show buttons next to each password field. Clicking them a second time will hide the passwords.
                  </p>
                  <p>
                    Ensure your new password is 8 characters or longer and try to use a mix of letters, numbers, and symbols.
                    Write down your new password somewhere safe as you will need it to log in.
                  </p>
                </div>
                <div className='p-3 d-flex flex-column'>
                  <label>Current Password</label>
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
                    <button className='btn btn-secondary rounded-1 ms-2 p-0 px-md-3 w-25 text-center' type='button' onClick={() => setPasswordVisible(passwordVisible ? false : true)}>{passwordVisible ? 'hide' : 'show'}</button>
                  </div>
                </div>
                <div className='px-3 d-flex flex-column'>
                  <label>New Password</label>
                  <div className='d-flex justify-content-between'>
                    <input
                      className='w-100'
                      type={newPasswordVisible ? 'text' : 'password'}
                      value={form.newPassword}
                      required={true}
                      minLength='8'
                      onChange={(e) => {
                        setForm({
                          ...form,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                    <button className='btn btn-secondary rounded-1 ms-2 p-0 px-md-3 w-25 text-center' type='button' onClick={() => setNewPasswordVisible(newPasswordVisible ? false : true)}>{newPasswordVisible ? 'hide' : 'show'}</button>
                  </div>
                </div>
                <div className='d-flex m-3 justify-content-center'>
                  <button type='submit' className='btn btn-primary fw-bold mt-3 w-100'>Change password</button>
                </div>
              </form>
            </div>
            
          </div>
          {/* Right Side */}
          <div className='m-3 d-flex flex-column justify-content-between w-100 w-md-25'>
            {/* Order Prompt */}
            <div className='bg-light rounded-3 p-4 mx-1 mb-2 border '>
              <h2>Your Order</h2>
              <p>
                {
                localStorage.getItem('orderPlaced') === 'true'
                ? "It looks like you have placed an order! To view it, you can click the View Order button."
                : "It looks like you have not placed an order yet. You can visit the store page using the Visit Store button to make one."
                }
              </p>
              <div className='d-flex flex-column align-items-center'>
                {
                localStorage.getItem('orderPlaced') === 'true'
                ? <button className='btn btn-primary fw-bold px-3 mt-3 w-100' onClick={() => navigate('/order')}>View Order</button>
                : <button className='btn btn-primary fw-bold px-3 mt-3 w-100' onClick={() => navigate('/store')}>Visit Store</button>
                }
              </div>
            </div>
            {/* Account Management */}
            <div className='bg-light rounded-3 p-4 mx-1 m-2 border '>
              <h2>Account Management</h2>
              <p>
                These options allow you to manage your Kinsella Dairies online account.
                You can click the Log out button to sign out of your account. {localStorage.getItem('accountType') === 'admin' ? '' : 'You are also able to permanently delete your account.'}
              </p>
              <div className='d-flex flex-column align-items-center'>
                <button className='btn fw-bold btn-secondary px-3 my-3 w-100' onClick={logOut}>
                  Log out
                </button>
                {/* Only show delete account option for normal users */}
                {
                  localStorage.getItem('accountType') === 'admin'
                  ? null
                  : <small className='delete-link' onClick={deleteAccount}>Delete my account</small>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Return the Get Data result
  return GetData();
}
