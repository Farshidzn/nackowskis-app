import { useRef, useState, useContext } from "react";
import { searchFilter } from "../contexts/AuctionAction";
import AuctionContext from "../contexts/AuctionContext";
import { Button, Container } from "react-bootstrap";
import "../App.css";

const SearchBarr = () => {
  const { dispatch } = useContext(AuctionContext);

  let searchParam = useRef("");
  let statusParam = useRef("");
  const [status, setStatus] = useState();

  const SearchWithEnter = (evt) => {
    if (evt.key === "Enter") {
      handleOnClick();
    }
  };

  const handleOnClick = async () => {
    let condition = searchParam.current.value;
    const response = await searchFilter(condition, status);
    dispatch({ type: "filterAuctions", payload: response });
  };

  const handleOnChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Container className="search-box h-a">
      <input
        type="text"
        placeholder="Sök på något!"
        ref={searchParam}
        className="search-input"
        onKeyPress={SearchWithEnter}
      />
      <Button onClick={handleOnClick} className="search-button">
        Sök
      </Button>
      <input
        type="radio"
        value="active"
        name="status"
        ref={statusParam}
        onChange={handleOnChange}
        className="radio-button-search"
      />{" "}
      Pågående auktioner
      <input
        type="radio"
        value="closed"
        name="status"
        ref={statusParam}
        onChange={handleOnChange}
        className="radio-button-search"
      />{" "}
      Avslutade auktioner
      <input
        type="radio"
        value="all"
        name="status"
        ref={statusParam}
        onChange={handleOnChange}
        className="radio-button-search"
      />{" "}
      Alla auktioner
    </Container>
  );
};

export default SearchBarr;
