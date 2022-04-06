import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Card, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useTable from "../Hooks/useTable";
import TableFooter from "../Components/Layout/TableFooter";
const DetailsView = () => {
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [highestBidder, setHighestBidder] = useState({});
  const params = useParams();
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slice, range } = useTable(bids, page, 4);
  const auctionIsActive = (auction) => {
    return new Date(auction.SlutDatum) > new Date();
  };
  useEffect(() => {
    const getAuction = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/Auktion/2460/${params.id}`
      );
      setAuction(response.data);
      setIsActive(auctionIsActive(response.data));
    };
    const getBids = async () => {
      const response = await axios.get(
        `http://nackowskis.azurewebsites.net/api/bud/2460/${params.id}`
      );
      setBids(response.data);
      if (response.data.length > 0) {
        const highestBid = response.data.reduce(function (prev, current) {
          return prev.Summa > current.Summa ? prev : current;
        });
        setHighestBidder(highestBid);
      }
    };
    getAuction();
    getBids();
    setLoading(false);
  }, [params.id]);
  function msToTime(duration) {
    duration += 7200000;
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  const dateBuilder = (d) => {
    let months = [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    let days = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];
    const newDate = new Date(d);
    let day = days[newDate.getDay()];
    let date = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    let time = msToTime(newDate.getTime());
    return `${day} ${date} ${month} ${year} ${time}`;
  };
  const handleDelete = () => {};
  return (
    <>
      <Link to="/" className="btn btn-primary my-2">
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
                  Start Datum: {dateBuilder(auction.StartDatum)}
                </Card.Text>
                <Card.Text>
                  Slut Datum: {dateBuilder(auction.SlutDatum)}
                </Card.Text>
                <Card.Text>Utropspris: {auction.Utropspris} kr</Card.Text>
                <Card.Text>Utropspris: {auction.SkapadAv}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Row md={10} className="h80">
              {slice.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Budgivare</th>
                      <th>Bud</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isActive ? (
                      slice.map((a, i) => (
                        <tr key={uuidv4()}>
                          <td>{i + 1}</td>
                          <td>{a.Budgivare}</td>
                          <td>{a.Summa}</td>
                        </tr>
                      ))
                    ) : (
                      <tr key={uuidv4()}>
                        <td>{1}</td>
                        <td>{highestBidder.Budgivare}</td>
                        <td>{highestBidder.Summa}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              ) : (
                <>
                  <h2>No Bids Found</h2>
                  {isActive && (
                    <Link to="/" className="btn btn-primary">
                      Uppdatera
                    </Link>
                  )}
                  <Button
                    onClick={handleDelete}
                    variant="danger"
                    className="my-2"
                  >
                    Ta bort
                  </Button>
                </>
              )}
            </Row>
            <Row md={2} className="h20">
              <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
              />
            </Row>
          </Col>
        </Row>
      ) : (
        <h1>Laddar</h1>
      )}
    </>
  );
};

export default DetailsView;
