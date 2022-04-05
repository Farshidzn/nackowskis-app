import React ,{useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
const DetailsView = () => {
  const params = useParams();
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  useEffect(() => {
   const getAuction = async () => {
     const response = await axios.get(`http://nackowskis.azurewebsites.net/api/Auktion/2460/${params.id}`)
     setAuction(response.data)
   }
   const getBids = async () =>{
    const response = await axios.get(`http://nackowskis.azurewebsites.net/api/bud/2460/${params.id}`)
    setBids(response.data)
   }
   getAuction();
   getBids();
  },[] );
  return (
    <div><h1>Detail view</h1></div>
  )
}

export default DetailsView