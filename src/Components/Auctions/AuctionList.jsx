import React, { useEffect, useContext } from "react";
import AuctionItem from "./AuctionItem";
import { Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AuctionContext from "../../contexts/AuctionContext";
import {getAllActiveAuctions} from "../../contexts/AuctionAction"
const AuctionList = () => {
  const { auctions, dispatch } = useContext(AuctionContext);
  useEffect(() => {
    if(auctions.length < 1){
        const getAuctions = async() => {
            const response = await getAllActiveAuctions();
            dispatch({type: "filterAuctions", payload: response})
        }
        getAuctions();
    }
  }, [auctions]);
  return (
    <>
      <h1>Auctions</h1>
      <Row>
        {auctions.length > 0 ? (
          auctions.map((a) => (
            <Col sm={8} md={6} lg={4} key={uuidv4()}>
              <AuctionItem auction={a} />
            </Col>
          ))
        ) : (
          <h2>No Auctions found</h2>
        )}
      </Row>
    </>
  );
};

export default AuctionList;
