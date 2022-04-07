import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, InputGroup } from "react-bootstrap";
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
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(formData);
    const response = await api.post("Auktion/2460", formData);
    
  };

  return (
    //<div><h1>Create auction view</h1></div>
    <>
      {/* <form onSubmit={onSubmitHandler}>
        <div className="newAuction">
          <h3>Add a new auction</h3>
          <div className="seller">
            <label htmlFor="SkapadAv">Sold by:</label>
            <br />
            <input type="text" id="SkapadAv" onChange={onchange} />
          </div>
          <div className="title">
            <label htmlFor="Title">Titel:</label>
            <br />
            <input type="text" id="Titel" onChange={onchange} />
          </div>
          <br />
          <div className="description">
            <label htmlFor="Beskrivning">Description:</label>
            <br />
            <input type="text" id="Beskrivning" onChange={onchange} />
          </div>
          <br />
          <div className="startDate">
            <label html for="StartDatum">
              Start date:
            </label>
            <br />
            <input type="date" id="StartDatum" onChange={onDateChanged} />
          </div>
          <br />
          <div className="dueDate">
            <label html for="dueDate">
              End date:
            </label>
            <br />
            <input type="date" id="SlutDatum" onChange={onDateChanged} />
          </div>
          <br />
          <div className="acceptedPrice">
            <label html for="acceptedPrice">
              Starting price:
            </label>
            <br />
            <input type="number" id="Utropspris" onChange={onPriceChange} />
          </div>
          <br />
          <br />
          <br />
          <div className="createAuction">
            <button className="createAuctionbtn" type="submit">
              Add
            </button>
          </div>
        </div>
      </form> */}
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
