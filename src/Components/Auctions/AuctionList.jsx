import React,{useState, useEffect} from 'react'
import axios from 'axios'
import AuctionItem from './AuctionItem';
import {Container, ListGroup } from 'react-bootstrap';
import { v4 as uuidv4} from 'uuid'
const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    useEffect(() => {
        const getAuctions = async ()=>{
            const response = await axios.get("http://nackowskis.azurewebsites.net/api/Auktion/2460"
            )
            setAuctions(response.data);
        }
        getAuctions();
    }, []);
  return (
    <Container><h1>Home view</h1>
    <ListGroup>
        {auctions.length > 0 ? auctions.map(a => (
            <AuctionItem key={uuidv4()} auction={a}/>
        )) : <h2>No Auctions found</h2>}
    </ListGroup>
    </Container>
  )
}

export default AuctionList
