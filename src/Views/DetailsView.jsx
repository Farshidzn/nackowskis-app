import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import BidForm from "../Components/Bids/BidForm";
import AuctionContext from "../contexts/AuctionContext";
import {
  deletAuction,
  getAuctionById,
  getBidForAuction,
} from "../contexts/AuctionAction";
import AuctionDetail from "../Components/Auctions/AuctionDetail";
import BidTable from "../Components/Bids/BidTable";
const DetailsView = () => {
  const { bids, dispatch } = useContext(AuctionContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  const [auction, setAuction] = useState({});
  const [loading, setLoading] = useState(true);
  const auctionIsActive = (auction) => {
    return new Date(auction.SlutDatum) > new Date();
  };
  useEffect(() => {
    const getAuction = async () => {
      const response = await getAuctionById(params.id);
      
      dispatch({
        type: "set_current_auction",
        payload: response,
      });
      setAuction(response);
      setIsActive(auctionIsActive(response));
    };
    const getBids = async () => {
      const response = await getBidForAuction(params.id);
      dispatch({
        type: "set_bids_current",
        payload: response,
      });
    };
    getAuction();
    getBids();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUpdate = () => {
    dispatch({
      type: "set_update_mode_true",
    });
  };
  const handleDelete = async () => {
    dispatch({
      type: "delete_auction",
      payload: parseInt(params.id),
    });
    await deletAuction(params.id);
    navigate("/");
  };
  const handleBack = () => {
    dispatch({
      type: "remove_current_auction",
    });
  };
  return (
    <>
      <Link to="/" className="btn btn-primary my-2" onClick={handleBack}>
        Tillbaka
      </Link>
      {!loading ? (
        <>
          <Row>
            <Col md={6}>
              <AuctionDetail auction={auction} />
            </Col>
            <Col md={6}>
              <Row md={10} className="h80">
                {bids.length > 0 ? (
                  <BidTable />
                ) : (
                  <>
                    <h2>Inga aktuella bud</h2>
                    {isActive && (
                      <Link
                        to={`/upsert`}
                        className="btn btn-primary"
                        onClick={handleUpdate}
                      >
                        Uppdatera
                      </Link>
                    )}
                    <Button
                      onClick={handleDelete}
                      variant="danger"
                      className="my-2"
                    >
                      Ta bort
                    </Button>
                  </>
                )}
              </Row>
            </Col>
          </Row>
          {isActive && (
            <Row>
              <Col>
                <BidForm startPrice={auction.Utropspris} id={params.id} />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DetailsView;
