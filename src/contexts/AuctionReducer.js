const AuctionReducer = (state, action) => {
  console.log(action.payload + "reducer");
  switch (action.type) {
    case "filterAuctions":
      return {
        ...state,
        auctions: action.payload,
      };
    case "create_auction":
      return {
        ...state,
        auctions: [action.payload, ...state.acutions],
      };
    case "delete_auction":
      return {
        ...state,
        auctions: state.auctions.filter((x) => x.AuktionID !== action.payload),
      };
      // BID ACTIONS
    case "create_bid":
      return {
        ...state,
        bids: [action.payload, ...state.bids],
      };
    case "get_all_bids":
      return {
        ...state,
        bids: action.payload,
      };

    default:
      return state;
  }
    switch (action.type) {
        case "filterAuctions": return{
                ...state, auctions: action.payload
            }

        default : return state

    }



};

export default AuctionReducer;
