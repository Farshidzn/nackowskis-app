import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const AuctionItem = ({ auction }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{auction.Titel}</Card.Title>
        <Card.Text>{auction.Beskrivning}</Card.Text>
        <Card.Text>
          Slut Datum: {new Date(auction.SlutDatum).toISOString().split("T")[0]}
        </Card.Text>
      </Card.Body>
      <Link
        to={`/auction/${auction.AuktionID}`}
        className="my-1 mx-2 btn btn-primary"
      >
        Details
      </Link>
    </Card>
  );
};

export default AuctionItem;
