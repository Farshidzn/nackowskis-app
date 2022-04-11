const AuctionReducer = (state, action) => {
  // console.log("reducer hit");
  // console.log(action.type);
  // console.log(action.payload);

  switch (action.type) {
    // Auction crud functions
    case "filterAuctions":
      return {
        ...state,
        auctions: action.payload,
      };
    case "create_auction":
      return {
        ...state,
        auctions: [],
      };
    case "update_auction":
      const newAuctions = [];
      state.auctions.forEach((ele) => {
        if (ele.AuktionID !== action.payload.AuktionID) {
          newAuctions.push(ele);
        } else {
          newAuctions.push(action.payload);
        }
      });
      return {
        ...state,
        // auctions: state.auctions.filter((x) =>
        //   x.AuktionID !== action.payload.AuktionID ? x : action.payload
        // ),
        auctions: newAuctions,
        current_auction: null,
        isUpdateMode: false,
      };
    case "delete_auction":
      return {
        ...state,
        auctions: state.auctions.filter((x) => x.AuktionID !== action.payload),
        current_auction: null,
        isUpdateMode: false,
      };
    // Auction Detail functions
    case "set_current_auction":
      return {
        ...state,
        current_auction: action.payload,
      };
    case "remove_current_auction": {
      return {
        ...state,
        current_auction: null,
        isUpdateMode: false,
      };
    }
    case "set_update_mode_true":
      return {
        ...state,
        isUpdateMode: true,
      };
    case "reset_update_mode": {
      return {
        ...state,
        isUpdateMode: false,
      };
    }
    // BID ACTIONS
    case "create_bid":
      console.log(action.payload);
      return {
        ...state,
        bids: [action.payload, ...state.bids],
      };
    case "set_bids_current":
      return {
        ...state,
        bids: action.payload,
      };

      case "set_alert":
        return {
          ...state,
          isAlert: action.payload,
        }

    default:
      return state;
  }
};

export default AuctionReducer;
