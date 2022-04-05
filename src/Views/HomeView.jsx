import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
const HomeView = () => {
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
    <div><h1>Home view</h1>
        {auctions.length > 0 ? auctions.map(a => (
            <h2 key={uuidv4()}>{a.Titel}</h2>
        )) : <h2>No Auctions found</h2>}
    
    </div>
  )
}

export default HomeView