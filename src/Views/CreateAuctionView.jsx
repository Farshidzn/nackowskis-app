import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const CreateAuctionsView = () => {
  const [formData, setFormData] = useState({
    Titel: "Från browser",
    SkapadAv: "Mattias Åkerström",
    Beskrivning: "Begangnad Iphone",
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

  const onSubmitHandler = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    e.preventDefault();
    console.log(formData);
    const response = await api.post("Auktion/2460", formData);
  };

  return (
    //<div><h1>Create auction view</h1></div>
    <form onSubmit={onSubmitHandler}>
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
        {/* <div className="startDate">
            <label html for="StartDatum">Start date:</label><br />
            <input type="date" id='StartDatum' onChange={ onchange
            } />
        </div> */}
        <br />
        {/* <div className="dueDate">
            <label html for="dueDate">End date:</label><br />
            <input type="date" id='SlutDatum' onChange={ onchange
              } />
        </div> */}
        <br />
        {/* <div className="acceptedPrice">
            <label html for="acceptedPrice">Starting price:</label><br />
            <input type="number" id='Utropspris' onChange={ onchange
            } />
        </div> */}
        <br />
        <br />
        <br />
        <div className="createAuction">
          <button className="createAuctionbtn" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateAuctionsView;
