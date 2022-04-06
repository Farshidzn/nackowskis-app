import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from './Views/HomeView';
import { Container } from "react-bootstrap";
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer';
import DetailsView from './Views/DetailsView';
import {AuctionProvider} from './contexts/AuctionContext'
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
      </Routes>
      </Container>
      </main>
      <Footer/> 
    </Router>
    </AuctionProvider>
  );
}

export default App;
