import React from 'react';
import {
  Container,
  Col,
  Row
} from 'react-bootstrap';
import { ImFacebook2, FaInstagramSquare } from "react-icons/gr";

export default function App() {
  return (
    <footer className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <Container className='pt-4'>
        <section className='mb-4'>
          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <ImFacebook2 fab className='fab fa-facebook-f' />
          </a>

          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <FaInstagramSquare fab className='fa-instagram' />
          </a>
        </section>
      </Container>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}