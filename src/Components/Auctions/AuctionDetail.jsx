import React, { useContext } from "react";
import { Card, Spinner } from "react-bootstrap";
import AuctionContext from "../../contexts/AuctionContext";
const AuctionDetail = () => {
  const { current_auction } = useContext(AuctionContext);
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
  return (
    <>
      {current_auction ? (
        <Card>
          <Card.Body>
            <Card.Title>{current_auction.Titel}</Card.Title>
            <Card.Text>{current_auction.Beskrivning}</Card.Text>
            <Card.Text>
              Start Datum: {dateBuilder(current_auction.StartDatum)}
            </Card.Text>
            <Card.Text>
              Slut Datum: {dateBuilder(current_auction.SlutDatum)}
            </Card.Text>
            <Card.Text>Utropspris: {current_auction.Utropspris} kr</Card.Text>
            <Card.Text>Skapad Av: {current_auction.SkapadAv}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AuctionDetail;
