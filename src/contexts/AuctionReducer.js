


const AuctionReducer = (state, action) => {

    console.log(action.payload + "reducer")
    switch (action.type) {
        case "filterAuctions": return{
                ...state, auctions: action.payload
            }

        default : return state

    }



};

export default AuctionReducer;