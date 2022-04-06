import {useRef, useState} from 'react'
import { searchFilter } from '../contexts/AuctionAction';


const SearchBarr = () => {

    let searchParam = useRef("");
    let statusParam = useRef("");


    const [resultList, setResultList] = useState([]);
    const [status, setStatus] = useState();

    const handleOnClick = () =>{
        let condition = searchParam.current.value;
        console.log(status)
        setResultList(searchFilter(condition, status));
        console.log(resultList);     // Ta bort sen
    }

    const handleOnChange = (e) => {
        setStatus(e.target.value)
    }

    return(<>
        <input type="radio" value="active" name="status" ref = {statusParam} onChange={handleOnChange}/> Pågående auktioner
        <input type="radio" value="closed" name="status" ref = {statusParam} onChange={handleOnChange}/> Avslutade auktioner
        <input type="radio" value="all" name="status" ref = {statusParam} onChange={handleOnChange}/> Alla auktioner
        <input type = 'text' placeholder = 'Sök på något!' ref ={searchParam}/>
        <button onClick={handleOnClick}>Sök</button>
    </>)

}

export default SearchBarr;