import React from "react";
import { Card } from "react-bootstrap";
const AuctionDetail = ({ auction }) => {
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
    <Card>
      <Card.Body>
        <Card.Title>{auction.Titel}</Card.Title>
        <Card.Text>{auction.Beskrivning}</Card.Text>
        <Card.Text>Start Datum: {dateBuilder(auction.StartDatum)}</Card.Text>
        <Card.Text>Slut Datum: {dateBuilder(auction.SlutDatum)}</Card.Text>
        <Card.Text>Utropspris: {auction.Utropspris} kr</Card.Text>
        <Card.Text>Utropspris: {auction.SkapadAv}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AuctionDetail;
