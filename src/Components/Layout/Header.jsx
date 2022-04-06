import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const header = () => {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Nackowskis</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>
              <span className="visually-hidden">(current)</span>
            
          </li>
          <li className="nav-item">
          <LinkContainer to="/CreateAuctionView">
            <Nav.Link>Create Auction</Nav.Link>
            </LinkContainer>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )

}

export default header;