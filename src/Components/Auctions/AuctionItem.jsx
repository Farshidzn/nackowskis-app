import React from 'react'
import {ListGroup,Card,Button} from 'react-bootstrap';
import { v4 as uuidv4} from 'uuid'
import { Link } from "react-router-dom";
const AuctionItem = ({auction}) => {

  return (
    <ListGroup.Item as="li" key={uuidv4()}><Card>
    <Card.Body>
      <Card.Title>{auction.Titel}</Card.Title>
      <Card.Text>
      {auction.Beskrivning}
      </Card.Text>
      <Card.Text>
      Slut Datum: {new Date(auction.SlutDatum).toISOString().split('T')[0]}
      </Card.Text>
    </Card.Body>
    {/* <Link className='my-1 mx-2'>Details</Link> */}
  </Card></ListGroup.Item>
  )
}

export default AuctionItem