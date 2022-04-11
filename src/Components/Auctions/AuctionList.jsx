import React, { useEffect, useContext } from "react";
import AuctionItem from "./AuctionItem";
import { Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AuctionContext from "../../contexts/AuctionContext";
import { searchFilter } from "../../contexts/AuctionAction";
const AuctionList = () => {
  const { auctions, dispatch } = useContext(AuctionContext);
  useEffect(() => {
    dispatch({type:"remove_current_auction"});
    if (auctions.length < 1) {
      const getAuctions = async () => {
        // const response = await getAllActiveAuctions();
        const response = await searchFilter("", "active");
        dispatch({ type: "filterAuctions", payload: response });
      };
      getAuctions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
