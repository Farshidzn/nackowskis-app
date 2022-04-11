import React, { useEffect, useContext } from "react";
import AuctionItem from "./AuctionItem";
import { Row, Col, Alert, Toast } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AuctionContext from "../../contexts/AuctionContext";
import { searchFilter } from "../../contexts/AuctionAction";
const AuctionList = () => {
  const { auctions, dispatch, isAlert } = useContext(AuctionContext);
  useEffect(() => {
    console.log(isAlert);
    console.log("isalert");
    dispatch({ type: "remove_current_auction" });
    if (auctions.length < 1) {
      const getAuctions = async () => {
        // const response = await getAllActiveAuctions();
        const response = await searchFilter("", "active");
        dispatch({ type: "filterAuctions", payload: response });
      };
      getAuctions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctions, isAlert]);
  return (
    <>
      <Row>
        <Col>
          {isAlert && (
            <Toast
              className="bid-toast"
              onClose={() =>
                dispatch({
                  type: "set_alert",
                  payload: false,
                })
              }
              show={isAlert}
              delay={2000}
              autohide
            >
              <Alert variant="success">
                <Alert.Heading>Auktion skapad</Alert.Heading>
              </Alert>
            </Toast>
          )}
        </Col>
        <Col>
          <h1>Auktioner</h1>
        </Col>
      </Row>

      <h1>Auktioner</h1>
      <Row>
        {auctions.length > 0 ? (
          auctions.map((a) => (
            <Col sm={8} md={6} lg={4} key={uuidv4()}>
              <AuctionItem auction={a} />
            </Col>
          ))
        ) : (
          <h2>Inga auktioner matchade din sökning</h2>
        )}
      </Row>
    </>
  );
};

export default AuctionList;
