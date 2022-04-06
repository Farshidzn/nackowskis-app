import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <Pagination>
      {range.map((el, index) => (
        <Pagination.Item key={index} onClick={() => setPage(el)}>
          {el}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default TableFooter;
