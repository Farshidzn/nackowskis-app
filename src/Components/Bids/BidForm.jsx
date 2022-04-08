import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Alert, Toast } from "react-bootstrap";
import AuctionContext from "../../contexts/AuctionContext";
import { createBid } from "../../contexts/AuctionAction";
const BidForm = ({ id, startPrice }) => {
  const { bids, dispatch } = useContext(AuctionContext);
  const [postComplete, setPostComplete] = useState(false);
  const [bidStatus, setBidStatus] = useState(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setBidStatus(false);
    const newBid = { ...formData, AuktionID: id };
    await createBid(id, newBid);

    dispatch({
      type: "create_bid",
      payload: newBid,
    });
    resetState();
    setBidStatus(true);
    setPostComplete(true);
  };
  return (
    <>
      {postComplete && (
        <Toast
          className="bid-toast"
          onClose={() => setPostComplete(false)}
          show={postComplete}
          delay={2000}
          autohide
        >
          <Alert variant="success">
            <Alert.Heading>Bud lagt</Alert.Heading>
          </Alert>
        </Toast>
      )}
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
            <Button type="submit" disabled={bidStatus.value}>
              Lägg bud
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default BidForm;
