import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const AuctionItem = ({ auction }) => {

  const dateConverter = (d) => {
    return new Date(d);
  }

  const statusChecker = (endDate) => {
    let currentDate = new Date();

    if(currentDate > dateConverter(endDate))
    {
      return "Avslutad"
    }
    else{
      return "Slut Datum: " + new Date(endDate).toISOString().split("T")[0]
    }
  }

  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{auction.Titel}</Card.Title>
        <Card.Text>{auction.Beskrivning}</Card.Text>
          <Card.Text>{statusChecker(auction.SlutDatum)}</Card.Text>
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
