import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from './Views/HomeView';
import { Container } from "react-bootstrap";
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer';
import DetailsView from './Views/DetailsView';
import {AuctionProvider} from './contexts/AuctionContext'
import CreateAuctionsView from './Views/CreateAuctionView'
function App() {
  return (
    <AuctionProvider>
    <Router>
    <Header/>
    <main>     
    <Container>
      <Routes>       
        <Route exact path="/" element={<HomeView/>}/>
        <Route exact path="/auction/:id" element={<DetailsView/>}/>   
        <Route exact path='/CreateAuctionView' element={<CreateAuctionsView/>} />    
      </Routes>
      </Container>
      </main>
      <Footer/> 
    </Router>
    </AuctionProvider>
  );
}

export default App;
