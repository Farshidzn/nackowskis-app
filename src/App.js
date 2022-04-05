import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from './Views/HomeView';
import { Container } from "react-bootstrap";
import Header from './Components/Layout/Header'
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
    </Router>
    </>
  );
}

export default App;
