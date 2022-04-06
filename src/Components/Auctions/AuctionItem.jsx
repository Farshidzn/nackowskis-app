import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const AuctionItem = ({ auction }) => {
  const [highestBid, setHighestBid] = useState(0);
  useEffect(() => {
    const getAuctions = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/bud/2460/${auction.AuktionID}`
      );
      if (response.data.length > 0) {
        const highestBid = response.data.reduce(function (prev, current) {
          return prev.Summa > current.Summa ? prev : current;
        });
        setHighestBid(highestBid.Summa);
      }
    };
    getAuctions();
  }, [auction.AuktionID]);

  const dateConverter = (d) => {
    return new Date(d);
  };

  const statusChecker = (endDate) => {
    let currentDate = new Date();

    if (currentDate > dateConverter(endDate)) {
      return "Avslutad";
    } else {
      return "Slut Datum: " + new Date(endDate).toISOString().split("T")[0];
    }
  };

  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{auction.Titel}</Card.Title>
        <Card.Text>{auction.Beskrivning}</Card.Text>
        <Card.Text>
          {highestBid > 0 ? (
            <span>Högsta bud: {highestBid}</span>
          ) : (
            <span>Inga bud lagda</span>
          )}
        </Card.Text>
        <Card.Text>
          Slut Datum: {new Date(auction.SlutDatum).toISOString().split("T")[0]}
        </Card.Text>
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
