import axios from 'axios';
import {usestate} from 'react';

const api = axios.create({baseURL: "http://nackowskis.azurewebsites.net/api/"})

const dateConverter = (d) => {
    return new Date(d);
}



export const searchFilter = async (condition, status) => {

    const response = await api.get("Auktion/2460");
    const {data} = response;
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
