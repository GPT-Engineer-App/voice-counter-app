import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";
import History from "./pages/History";
import Contact from "./pages/Contact";
import LockScreen from "./pages/LockScreen";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      {/* Header component renders the top navigation bar */}
      <Header />
      {/* Navigation component renders the side navigation menu */}
      <Navigation />
      <Routes>
        {/* Define the route for the Index page */}
        <Route path="/" element={<Index />} />
        {/* Define the route for the History page */}
        <Route path="/history" element={<History />} />
        {/* Define the route for the Contact page */}
        <Route path="/contact" element={<Contact />} />
        {/* Define the route for the LockScreen page */}
        <Route path="/lockscreen" element={<LockScreen />} />
        {/* Define the route for the Settings page */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {/* Footer component renders the bottom footer */}
      <Footer />
    </Router>
  );
}

export default App;