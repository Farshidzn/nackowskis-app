import React from 'react';
import { Container} from 'react-bootstrap';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className='text-center text-dark'  style={{ backgroundColor: '#f1f1f1' }}>
      <Container className='pt-4'>
        <section className='mb-4'>
            <a href="https://www.facebook.com/nackorad"><FaFacebookSquare className="footer-icons"/></a>
            <a href="https://www.instagram.com/pawe_n/"><FaInstagramSquare className="footer-icons"/></a>
        </section>
      </Container>

      <div className='footer-text' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright:
        <a className='footer-link' href='https://mdbootstrap.com/'>
          Githublänk här
        </a>
      </div>
    </footer>
  );
}
export default Footer;