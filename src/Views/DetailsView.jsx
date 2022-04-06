import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4} from 'uuid'
const DetailsView = () => {
  const params = useParams();
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAuction = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/Auktion/2460/${params.id}`
      );
      setAuction(response.data);
    };
    const getBids = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/bud/2460/${params.id}`
      );
      setBids(response.data);
    };
    getAuction();
    getBids();
    setLoading(false)
  }, []);
  function msToTime(duration) {
     duration += 7200000;
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  const dateBuilder= (d) => {
    let months = ["Januari","Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
    let days =["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
    const newDate = new Date()
    let day = days[newDate.getDay()];
    let date =newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    let time = msToTime(newDate.getTime())
    return `${day} ${date} ${month} ${year} ${time}`
};

  return (
  <>
    <Link to="/" className="btn btn-primary">
    Back
  </Link>
  {!loading ? (
  <Row>
    <Col md={6}>
      <Card>
        <Card.Body>
          <Card.Title>{auction.Titel}</Card.Title>
          <Card.Text>{auction.Beskrivning}</Card.Text>
          <Card.Text>
          Start Datum:{" "}{dateBuilder(auction.StartDatum)}

          </Card.Text>
          <Card.Text>
            Slut Datum:{" "}{dateBuilder(auction.SlutDatum)}

          </Card.Text>
          <Card.Text>
            Utropspris: {auction.Utropspris} kr
          </Card.Text>
          <Card.Text>
            Utropspris: {auction.SkapadAv}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
    {bids.length > 0 ? bids.map(a => (
        <div key={uuidv4()}>{a.Summa} budgivare {a.Budgivare}</div>
    )) : <h2>No Auctions found</h2>}
    </Col>
  </Row>) : <h1>Laddar</h1>
  }
  </>
  )
};

export default DetailsView;
