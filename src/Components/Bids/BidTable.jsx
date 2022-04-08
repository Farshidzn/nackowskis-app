import React, { useState, useContext, useEffect } from "react";
import AuctionContext from "../../contexts/AuctionContext";
import useTable from "../../Hooks/useTable";
import TableFooter from "../Layout/TableFooter";
import { Row, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
const BidTable = () => {
  const { bids, current_auction } = useContext(AuctionContext);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(bids, page, 4);
  const [highestBidder, setHighestBidder] = useState({});
  const [isActive, setIsActive] = useState(false);
  const auctionIsActive = (auction) => {
    return new Date(auction.SlutDatum) > new Date();
  };
  useEffect(() => {
    if (bids > 0) {
      const highestBid = bids.reduce(function (prev, current) {
        return prev.Summa > current.Summa ? prev : current;
      });
      setHighestBidder(highestBid);
    }
    if (current_auction) {
      setIsActive(auctionIsActive(current_auction));
    }
  }, [bids, current_auction]);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Budgivare</th>
            <th>Bud</th>
          </tr>
        </thead>
        <tbody>
          {isActive ? (
            slice.map((a, i) => (
              <tr key={uuidv4()}>
                <td>{page > 1 ? i + 4 : i + 1}</td>
                <td>{a.Budgivare}</td>
                <td>{a.Summa}</td>
              </tr>
            ))
          ) : (
            <tr key={uuidv4()}>
              <td>{1}</td>
              <td>{highestBidder.Budgivare}</td>
              <td>{highestBidder.Summa}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Row md={2} className="h20">
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default BidTable;
