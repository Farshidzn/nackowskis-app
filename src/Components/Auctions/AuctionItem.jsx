import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {getBidForAuction} from "../../contexts/AuctionAction";
const AuctionItem = ({ auction }) => {
  const [highestBid, setHighestBid] = useState(0);
  useEffect(() => {
    const getBids = async () => {
      const response = await getBidForAuction(auction.AuktionID);
      if (response.length > 0) {
        const highestBid = response.reduce(function (prev, current) {
          return prev.Summa > current.Summa ? prev : current;
        });
        setHighestBid(highestBid.Summa);
      }
    };
    getBids();
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
