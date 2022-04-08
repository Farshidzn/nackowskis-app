import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center text-dark mt-3">
      <Container fluid>
        <Row
          className="visable py-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Col>
            <a
              href="https://www.facebook.com/nackorad"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebookSquare className="footer-icons" />
            </a>
            <a
              href="https://www.instagram.com/pawe_n/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaInstagramSquare className="footer-icons" />
            </a>
          </Col>
        </Row>

        <Row
          className="footer-text"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Col>
            {" "}
            © 2022 Copyright:
            <a
              className="footer-link"
              href="https://mdbootstrap.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Githublänk här
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
