import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
const CreateAuctionsView = () => {
  const [formData, setFormData] = useState({
    Titel: "",
    SkapadAv: "",
    Beskrivning: "",
    StartDatum: "2022-04-04T12:00:00",
    SlutDatum: "2022-05-02T15:00:00",
    Gruppkod: 2460,
    Utropspris: 200,
  });
  const api = axios.create({
    baseURL: "http://nackowskis.azurewebsites.net/api/",
  });
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const onDateChanged = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };
  const onPriceChange = (e) => {
    setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
  };
  const onSubmitHandler = async (e) => {
    await api.post("Auktion/2460", formData);
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="SkapadAv">Seller</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            id="SkapadAv"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Title">Titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            id="Titel"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Beskrivning">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            id="Beskrivning"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Utropspris">Starting price:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            id="Utropspris"
            onChange={onPriceChange}
          />
        </Form.Group>

        <div className="col-md-4">
          <Form.Group>
            <Form.Label htmlFor="StartDatum">start date</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="start date"
              id="StartDatum"
              onChange={onDateChanged}
            />
          </Form.Group>
        </div>

        <div className="col-md-4">
          <Form.Group>
            <Form.Label htmlFor="SlutDatum">End date</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="start date"
              id="SlutDatum"
              onChange={onDateChanged}
            />
          </Form.Group>
        </div>
        <br />
        <br />
        <Button className="createAuctionbtn" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
};

export default CreateAuctionsView;
