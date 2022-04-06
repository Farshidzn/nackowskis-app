import React, { useState, useEffect } from "react";
import axios from "axios";
import AuctionItem from "./AuctionItem";
import { ListGroup, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    const getAuctions = async () => {
      const response = await axios.get(
        "http://nackowskis.azurewebsites.net/api/Auktion/2460"
      );
      setAuctions(response.data);
    };
    getAuctions();
  }, []);
  return (
    <>
      <h1>Auctions</h1>
      <Row>
        {auctions.length > 0 ? (
          auctions.map((a) => (
            <Col sm={8} md={6} lg={4} key={uuidv4()}>
              <AuctionItem auction={a} />
            </Col>
          ))
        ) : (
          <h2>No Auctions found</h2>
        )}
      </Row>
    </>
  );
};

export default AuctionList;
