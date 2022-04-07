export const getHighestBid = (bids) =>{
    let highestBid = 0;
    if(bids.length > 0){
        highestBid = bids.reduce((prev, current) => (prev.Summa > current.Summa) ? prev.Summa : current.Summa)
    }  
    return highestBid; 
}
export const getHighestBidder = (bids) =>{
    let highestBidder = {}
    if(bids.length > 0){
        highestBidder = bids.reduce(function(prev, current) {
            return (prev.y > current.y) ? prev : current
        }) 
    }  
    return highestBidder; 
}
        
