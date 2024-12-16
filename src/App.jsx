import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./pages/Home/Home";
import './App.css';
import Footer from "./Components/Footer";
import Layout from "./Components/Layout";
import AboutUs from './pages/About/AboutUs';
import Corporatebooking from './pages/CorporateBooking/Corporatebooking';
import Hotels from './pages/Hotels/Hotels'
import ContactUs from './pages/ContactUs/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout/>} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/corporate-booking" element={<Corporatebooking />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
