import axios from 'axios';
import {usestate} from 'react';

const api = axios.create({baseURL: "http://nackowskis.azurewebsites.net/api/"})

const dateConverter = (d) => {
    return new Date(d);
}

export const searchFilter = async (condition, status) => {

    console.log(status)
    const response = await api.get("Auktion/2460");
    const {data} = response;
    const currentDate = new Date()
    let filteredList = []

    switch(status){

        case "active": 
           data.forEach(auctionItem => {
               if(auctionItem.Titel.includes(condition) && dateConverter(auctionItem.SlutDatum) > currentDate) {
                   filteredList.push(auctionItem)
               } 
           }); break;
            
        case "closed":
            data.forEach(auctionItem => {
                if(auctionItem.Titel.includes(condition) && dateConverter(auctionItem.SlutDatum) < currentDate) {
                    filteredList.push(auctionItem)
                } 
            }); break;
        
        case "all":
                data.forEach(auctionItem => {
                    if(auctionItem.Titel.includes(condition)){
                        filteredList.push(auctionItem)
                    } 
                }); break;
        default:
            data.forEach(auctionItem => {
                if(auctionItem.Titel.includes(condition)){
                    filteredList.push(auctionItem)
                } 
            }); break;
    }

    // Uppdatera state på auktionslista

    console.log(filteredList)

}
