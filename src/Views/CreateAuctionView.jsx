import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Col, Row, Alert, Toast } from "react-bootstrap";
import FormContainer from "../Components/Layout/FormContainer";
import AuctionContext from "../contexts/AuctionContext";
import { createAuction, updateAuction } from "../contexts/AuctionAction";
const CreateAuctionsView = () => {
  const navigate = useNavigate();
  const [postComplete, setPostComplete] = useState(false);
  const { current_auction, isUpdateMode, dispatch } =
    useContext(AuctionContext);
  const [formData, setFormData] = useState({
    Titel: "",
    SkapadAv: "",
    Beskrivning: "",
    StartDatum: new Date().toISOString(),
    SlutDatum: new Date().toISOString(),
    Gruppkod: 2460,
    Utropspris: 0,
  });
  const { Titel, SkapadAv, Beskrivning, Utropspris, StartDatum, SlutDatum } =
    formData;
  useEffect(() => {
    if (isUpdateMode && current_auction) {
      setFormData(current_auction);
      dispatch({
        type: "reset_update_mode",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const onDateChanged = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (current_auction) {
      await updateAuction(formData);
      dispatch({ type: "update_auction", payload: formData });
      navigate(`/auction/${current_auction.AuktionID}`);
    } else {
      const response = await createAuction(formData);
      console.log(response.data);
      dispatch({
        type: "create_auction",
        payload: formData,
      });
      dispatch({
        type: "set_alert",
        payload: true,
      });
      navigate("/");
      
    }
   
  };

  return (
    <>
    
      <FormContainer>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="SkapadAv">Säljare</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ange ditt namn"
              id="SkapadAv"
              onChange={onchange}
              value={SkapadAv}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Title">Titel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titel"
              id="Titel"
              onChange={onchange}
              value={Titel}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Beskrivning">Beskrivning</Form.Label>
            <Form.Control
              type="text"
              placeholder="Beskrivning"
              id="Beskrivning"
              onChange={onchange}
              value={Beskrivning}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Utropspris">Startpris:</Form.Label>
            <Form.Control
              type="number"
              id="Utropspris"
              onChange={onchange}
              value={Utropspris}
              required
            />
          </Form.Group>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="StartDatum">StartDatum</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="start date"
                id="StartDatum"
                onChange={onDateChanged}
                value={new Date(StartDatum)
                  .toISOString()
                  .slice(0, 10)
                  .replace("T", " ")}
                min={new Date()}
                max={SlutDatum}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="SlutDatum">SlutDatum</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="start date"
                id="SlutDatum"
                onChange={onDateChanged}
                value={new Date(SlutDatum)
                  .toISOString()
                  .slice(0, 10)
                  .replace("T", " ")}
                min={StartDatum}
                required
              />
            </Form.Group>
          </Col>
          <br />
          <br />
          <Row className="d-flex justify-content-between align-items-center">
            <Col md={4} className="my1 mx-2">
              <Button variant="primary" type="submit">
                {current_auction ? "Uppdatera" : "Skapa"}
              </Button>
            </Col>
            <Col md={4} className="align-self-end">
              {current_auction && (
                <Link
                  to={`/auction/${current_auction.AuktionID}`}
                  className="my-1 mx-2 btn btn-secondary"
                >
                  Återvänd
                </Link>
              )}
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateAuctionsView;
