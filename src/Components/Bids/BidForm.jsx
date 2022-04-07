import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const BidForm = ({ id, startPrice }) => {
  const [formData, setFormData] = useState({
    Summa: 0,
    Budgivare: "",
  });
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  useEffect(() => {
    const getBids = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/bud/2460/${id}`
      );
      setBids(response.data);
      if (response.data.length > 0) {
        const highestBidder = response.data.reduce(function (prev, current) {
          return prev.Summa > current.Summa ? prev.Summa : current.Summa;
        });
        setHighestBid(highestBidder);
      }
    };
    getBids();
  }, []);
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
    const response = await axios.post(
      `http://nackowskis.azurewebsites.net/api/bud/2460/${id}`,
      newBid
    );
    resetState();
    console.log(newBid);
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
            min={highestBid > startPrice ? highestBid + 1 : startPrice + 1}
            value={Summa}
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
