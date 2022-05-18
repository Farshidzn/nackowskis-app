import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./Views/HomeView";
import { Container } from "react-bootstrap";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import DetailsView from "./Views/DetailsView";
import { AuctionProvider } from "./contexts/AuctionContext";
import CreateAuctionsView from "./Views/CreateAuctionView";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import LoginView from "./Views/Auth/LoginView";
import RegisterView from "./Views/Auth/RegisterView";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
function App() {
  return (
    <AuthProvider>
      <AuctionProvider>
        <Router>
          <Header />
          <main>
            <Container>
              <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route exact path="/" element={<HomeView />} />
                <Route exact path="/auction/:id" element={<DetailsView />} />

                <Route
                  exact
                  path="/upsert"
                  element={
                    <RequireAuth>
                      <CreateAuctionsView />
                    </RequireAuth>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </AuctionProvider>
    </AuthProvider>
  );
}

export default App;
