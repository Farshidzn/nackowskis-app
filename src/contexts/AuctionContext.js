import { createContext, useReducer } from "react";
import AuctionReducer from "./AuctionReducer";

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const initialState = {
    auctions: [],
    current_auction: null,
    isUpdateMode: false,
    bids: [],
    isAlert: false,
  };

  const [state, dispatch] = useReducer(AuctionReducer, initialState);

  return (
    <AuctionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionContext;
