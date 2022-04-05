import React from 'react';
import {
  Container,
  Col,
  Row
} from 'react-bootstrap';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='text-center text-dark'  style={{ backgroundColor: '#f1f1f1' }}>
      <Container className='pt-4'>
        <section className='mb-4'>
        
            <FaFacebookSquare/>
        
            <FaInstagramSquare/>

        </section>
      </Container>

      <div className='text-center text-dark p-3 display-6' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-dark' href='https://mdbootstrap.com/'>
          Githublänk här
        </a>
      </div>
    </footer>
  );
}
export default Footer;