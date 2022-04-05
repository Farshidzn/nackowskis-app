import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from './Views/HomeView';
import { Container } from "react-bootstrap";
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer';

function App() {
  return (
    <>
    <Router>
    <Header/>
    <main>
    <Container>
      <Routes>       
        <Route exact path="/" element={<HomeView/>}/>           
      </Routes>
      </Container>
      </main>
      <Footer/> 
    </Router>
    </>
  );
}

export default App;
