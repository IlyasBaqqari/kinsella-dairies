import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './NavigationBar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Images/logo.png';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Navigation Bar Component
export default function NavigationBar() {
  
  // Get user login status
  const accountID = localStorage.getItem('accountID');
  const accountType = localStorage.getItem('accountType');
  
  // If logged in as user...
  if (accountID !== null && accountType === 'user') {
    return (
      <>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
        />
      
        {/* Navbar */}
        <Navbar bg='dark' variant='dark'>
          <Container>
        
            {/* Logo */}
            <Navbar.Brand href='/'>
              <img
                alt='logo'
                src={logo}
                width='30'
                height='30'
                className='d-inline-block align-top mx-2'
              />
              Kinsella Dairies
            </Navbar.Brand>
        
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
        
            <Navbar.Collapse id='basic-navbar-nav'>
        
              {/* Navbar Items */}
              <Nav className='me-auto'>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/store'>Store</Nav.Link>
              </Nav>
          
              {/* Dropdown Items */}
              <Nav>
                <NavDropdown
                  className='nav-dropdown'
                  eventKey={1}
                  title={
                    <div>
                      <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'>
                        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                        <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
                      </svg>
                    </div>
                  }
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                  <NavDropdown.Item href='/order'>Orders</NavDropdown.Item>
                </NavDropdown>
              </Nav>
        
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      );
    }
    // If logged in as admin...
    else if (accountID !== null && accountType === 'admin') {
      return (
        <>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
          />
        
          {/* Navbar */}
          <Navbar bg='dark' variant='dark'>
            <Container>
          
              {/* Logo */}
              <Navbar.Brand href='/'>
                <img
                  alt='logo'
                  src={logo}
                  width='30'
                  height='30'
                  className='d-inline-block align-top mx-2'
                />
                Kinsella Dairies
              </Navbar.Brand>
          
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
          
              <Navbar.Collapse id='basic-navbar-nav'>
          
                {/* Navbar Items */}
                <Nav className='me-auto'>
                  <Nav.Link href='/'>Home</Nav.Link>
                  <Nav.Link href='/store'>Store</Nav.Link>
                  <Nav.Link href='/admin'>Admin</Nav.Link>
                </Nav>
            
                {/* Dropdown Items */}
                <Nav>
                  <NavDropdown
                    className='nav-dropdown'
                    eventKey={1}
                    title={
                      <div>
                        <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'>
                          <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                          <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
                        </svg>
                      </div>
                    }
                    id='basic-nav-dropdown'
                  >
                    <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
          
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        );
      }
      // If not logged in...
      else {
        return (
          <>
            <link
              rel='stylesheet'
              href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
            />
          
            {/* Navbar */}
            <Navbar bg='dark' variant='dark'>
              <Container>
            
                {/* Logo */}
                <Navbar.Brand href='/'>
                  <img
                    alt='logo'
                    src={logo}
                    width='30'
                    height='30'
                    className='d-inline-block align-top mx-2'
                  />
                  Kinsella Dairies
                </Navbar.Brand>
            
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
            
                <Navbar.Collapse id='basic-navbar-nav'>
            
                  {/* Navbar Items */}
                  <Nav className='me-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/store'>Store</Nav.Link>
                  </Nav>
              
                  {/* Dropdown Items */}
                  <Nav>
                    <NavDropdown
                      className='nav-dropdown'
                      eventKey={1}
                      title={
                        <div>
                          <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'>
                            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                            <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
                          </svg>
                        </div>
                      }
                      id='basic-nav-dropdown'
                    >
                      <NavDropdown.Item href='/login'>Log in</NavDropdown.Item>
                      <NavDropdown.Item href='/signup'>Sign up</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
            
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
          );
        }
      }
      