import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import AuctionContext from "../../contexts/AuctionContext";
import { createBid } from "../../contexts/AuctionAction";
const BidForm = ({ id, startPrice }) => {
  const { bids,dispatch } = useContext(AuctionContext);
  const [formData, setFormData] = useState({
    Summa: 0,
    Budgivare: "",
  });
  const [highestBidder, setHighestBidder] = useState(0);
  const [minBid, setMinBid] = useState(0);
  useEffect(() => {
    if (bids.length > 0) {
      const highestBidder = bids.reduce(function (prev, current) {
        return prev.Summa > current.Summa ? prev : current;
      });
      setHighestBidder(highestBidder);
    }
    setMinBid(
      highestBidder.Summa > startPrice
        ? highestBidder.Summa + 1
        : startPrice + 1
    );
  }, [bids]);
  const { Summa, Budgivare } = formData;
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const resetState = () => {
    setFormData({ Summa: 0, Budgivare: "" });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newBid = { ...formData, AuktionID: id };
    const response = await createBid(id, newBid);
    dispatch({
        type:"create_bid",
        payload:response.data
    })
    resetState();
    console.log(response.data);
  };
  return (
    <Form className="my-2" onSubmit={handleOnSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Summa:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            id="Summa"
            type="number"
            placeholder="Summa"
            onChange={handleOnChange}
            min={minBid}
            value={Summa}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Budgivare
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            id="Budgivare"
            type="text"
            onChange={handleOnChange}
            placeholder="Budgivare"
            value={Budgivare}
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Lägg bud</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default BidForm;
