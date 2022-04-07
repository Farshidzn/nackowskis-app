import axios from 'axios';
import {usestate} from 'react';

const api = axios.create({baseURL: "http://nackowskis.azurewebsites.net/api/"})

const dateConverter = (d) => {
    return new Date(d);
}
export const getAuctionById = async (id) =>{
    const {data} = await api.get(`/Auktion/2460/${id}`);
    return data;
}
export const searchFilter = async (condition, status) => {
    
    condition = condition.toLowerCase();
    console.log(condition);
    const response = await api.get("Auktion/2460");
    const {data} = response;

    data.forEach(auctionItem => {
       auctionItem.Titel = auctionItem.Titel.toLowerCase();
    })

    let currentDate = new Date();
    let filteredList = []

    switch(status){
        
        case "active": 
           data.forEach(auctionItem => {
               if(auctionItem.Titel.includes(condition) && dateConverter(auctionItem.SlutDatum) > currentDate) {
                   filteredList.push(auctionItem)
               }
           });
           filteredList.sort((auction1, auction2) => dateConverter(auction1.SlutDatum) - dateConverter(auction2.SlutDatum))
           break;
            
        case "closed":
            data.forEach(auctionItem => {
                if(auctionItem.Titel.includes(condition) && dateConverter(auctionItem.SlutDatum) < currentDate) {
                    filteredList.push(auctionItem)
                } 
                
            });
            filteredList.sort((auction1, auction2) => dateConverter(auction1.SlutDatum) - dateConverter(auction2.SlutDatum))
            break;
        
        /*case "all":
                data.forEach(auctionItem => {
                    if(auctionItem.Titel.includes(condition)){
                        filteredList.push(auctionItem)
                    }
                    filteredList.sort((auction1, auction2) => dateConverter(auction1.SlutDatum) - dateConverter(auction2.SlutDatum))
                }); break;*/
        default:
            data.forEach(auctionItem => {
                if(auctionItem.Titel.includes(condition)){
                    filteredList.push(auctionItem)
                }   
            });
            filteredList.sort((auction1, auction2) => dateConverter(auction1.SlutDatum) - dateConverter(auction2.SlutDatum))
            
                let closedList = [];
                let activeList = [];
                filteredList.forEach(auctionItem => {
                    if(dateConverter(auctionItem.SlutDatum) < currentDate)
                    {
                        closedList.push(auctionItem)
                    }
                    else
                    {
                        activeList.push(auctionItem)
                    }            
                })
                filteredList = activeList.concat(closedList);
            break;
    }
    return filteredList;
}
export const getAllActiveAuctions = async()=>{
    const currentDate = new Date()
   const response =  await api.get("Auktion/2460");
   let filteredList = [];
   response.data.forEach(auctionItem => {
    if(dateConverter(auctionItem.SlutDatum) > currentDate) {
        filteredList.push(auctionItem)
    } 
});
return filteredList;
}
export const createAuction = async(formData)=>{
    const response = await api.post("Auktion/2460", formData);
    return response;
}
export const deletAuction = async(id) => {
    await api.delete(
        `Auktion/2460/${id}`
      );
}


// BID ACTONS
const sortBidBySum = (bids) => {
    return( bids.sort((a, b) => b.Summa - a.Summa))
}
export const createBid = async (id,formData) => {
      const response = await api.post(`bud/2460/${id}`,formData);
      
      console.log(response.data)
      return response;
}
export const getBidForAuction = async (id) =>{
    const response = await api.get(`bud/2460/${id}`)
    const sortedBids = sortBidBySum(response.data);
    return sortedBids;
}