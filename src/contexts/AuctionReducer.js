


const AuctionReducer = (state, action) => {

    switch (action.type) {
        case "filterAuctions": return{
                ...state, auctions: action.payload
            }

        default : return state

    }



};

export default AuctionReducer;