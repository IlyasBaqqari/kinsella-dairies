import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import './App.css';
import hero1 from '../Images/hero1.png';
import hero2 from '../Images/hero2.jpg';
import image1 from '../Images/home1.jpg';
import image2 from '../Images/home2.jpg';
import image3 from '../Images/home3.jpg';
import image4 from '../Images/home4.jpg';

// Home page
export default function Home() {

  return (
    <>
      {/* Hero Image Carousel */}
      <Carousel className='carousel' controls={false}>
        
        {/* Carousel 1 */}
        <Carousel.Item>
          <img 
            className='carouselImage d-block'
            src={hero1}
            alt='Kinsella Dairies'
            height='400'
          />
          <Carousel.Caption className='caption p-3 mb-3 text-black rounded-4'>
            <h3>We are Kinsella Dairies</h3>
            <p>Welcome to Kinsella Dairies. We are a family run business based in Galston, Ayrshire. This is our online platform where you can buy our amazing, fresh produce.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Carousel 2 */}
        <Carousel.Item>
          <img
            className='carouselImage d-block'
            src={hero2}
            alt='First slide'
            height='400'
          />
          <Carousel.Caption className='caption p-3 mb-3 text-black rounded-4'>
            <h3>Join, Shop, and More</h3>
            <p>
              Welcome to our new online presence where you can create an account, access our storefront, order your favourite fresh produce, and more in the future!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>

      { // Display different home page depending on if user is logged in.
      localStorage.getItem('accountID') === null || localStorage.getItem('accountType') === null
      ? <div className='button-area pb-5 border-bottom'>
          <p className='mb-2'>
            If you have not made an account yet, click the <b>Sign up</b> button
          </p>
        <Link to='/signup'>
          <Button className='home-button btn-primary shadow m-2 fw-bold'>Sign up</Button>
        </Link>

        <p className='m-2 mt-4'>
          If you have already made an online account, click the <b>Login</b> button
        </p>
        <Link to='/login'>
          <Button className='home-button home-login-button btn-secondary shadow m-2 mb-4'>
            Login
          </Button>
        </Link>
      </div>
      : <div className='button-area text-center pb-5 border-bottom'>
          <h2 className='mb-1'>See what we have to offer!</h2>
          <p className='mb-3'></p>
          <Link to='/store' className='shadow btn btn-primary px-5 fs-5 py-2 fw-bold'>
            Visit our Store
          </Link>
        </div>
      }

      <div className='bg-light p-5'>

        <div className='mb-5 pb-5 border-bottom'>
        <h1 className='text-center fw-bold mb-5'>Welcome to Kinsella Dairies</h1>
          <p className='fs-5 text-center me-4'>
            At Kinsella Dairies, we're not just about delivering products; we're about delivering tradition, quality, and the essence of a family-run business.
            Nestled in the heart of Galston, Ayrshire, we have been serving Scotland with farm-fresh dairy and produce for generations.
            Our commitment to excellence and our deep-rooted connection to our community have made us a household name, cherished by families across the country.
          </p>
        </div>

        <h2 className='my-5 text-center'>Our Story: A Legacy of Nurturing Goodness</h2>
        <div className='border-bottom'>
          <div className='d-flex justify-content-betwee align-items-center my-5'>
            <p className='fs-5 ps-0 me-4'>
              Founded on principles that have stood the test of time, Kinsella Dairies has been nourishing homes with the purest dairy produce for over half a century.
              What began as a humble endeavor has blossomed into a cherished institution, where every glass of milk carries with it the love and care of generations past and present.
            </p>
            <img className='col-3 h-100 rounded-pill shadow' src={image1} alt='Kinsella Farm'/>
          </div>

          <div className='d-flex justify-content-betwee align-items-center my-5'>
            <img className='col-3 h-100 rounded-pill shadow' src={image2} alt='Kinsella Cow'/>
            <p className='fs-5 ms-4 ps-4 pe-0'>
              Martin James, our CEO and Head Dairy Farmer, and Craig Panton, our CFO and Head Poultry Farmer, are the driving forces behind Kinsella Dairies. 
              Their unwavering dedication and passion for quality have been instrumental in shaping our journey. 
              With the wisdom of experience and the vision for a brighter future, they continue to guide our path toward excellence.
            </p>
          </div>
        </div>

        <h2 className='my-5 text-center'>From Farm to Doorstep: The Kinsella Experience</h2>
        <div className='border-bottom pb-5 d-flex justify-content-betwee align-items-center my-5'>
          <div>
            <p className='fs-5 ps-0 me-4'>
              Imagine waking up to the wholesome goodness of dairy products right at your doorstep. 
              Our handpicked selection of dairy delights, and other farm-fresh produce will take you on a sensory journey like no other.
              Each product is brought to you with the utmost care, ensuring that you experience the true essence of nature's bounty.
            </p>
            <p className='fs-5 ps-0 me-4'>
              At Kinsella Dairies, we're more than a dairy delivery service – we're a part of your daily routine, a glass of comfort that you can rely on.
              Our dedication to personalized service ensures that each delivery is a seamless experience, bringing the warmth of tradition right to your doorstep. 
              As a family-run business, the spirit of Kinsella Dairies is woven into every interaction, ensuring that you're not just a customer, but a valued member of our extended family.
            </p>
          </div>
          <img className='w-25 h-100 rounded-1 shadow' src={image3} alt='Kinsella Cow'/>
        </div>

        <div className='my-3 rounded-4'>
          <h1 className='text-center'>Join the Kinsella Family Today</h1>
          <div className=' d-flex justify-content-betwee align-items-center my-5'>
            <img className='w-25 h-100 rounded-1 shadow' src={image4} alt='Kinsella Cow'/>
            <div className='d-flex flex-column justify-content-between'>
              <p className='fs-5 ps-0 ms-4'>
                Join us in celebrating the richness of tradition and the joy of quality produce. 
                Whether you're a seasoned connoisseur or someone embarking on a journey of discovery, Kinsella Dairies welcomes you with open arms.
              </p>
              <p className='fs-5 ps-0 ms-4'>
                Experience the Kinsella difference – where tradition meets innovation, and every bite tells a story. 
                Place your order today and let us bring the freshness of the farm to your home.
              </p>
              <p className='fs-5 fw-bold ps-0 ms-4'>
                Your journey to exceptional taste starts here.
              </p>
              <div className='ps-0 ms-4'>
              </div>
            </div>
          </div>
          <a className='btn btn-primary fs-3 w-100 py-2 rounded-3 shadow' href='/'>Let's go!</a>
        </div>


      </div>
    </>
  );
}
