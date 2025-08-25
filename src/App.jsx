import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from "./Pages/Home"
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import AutoScroll from "./Components/AutoScroll";
import ServiceDetails from "./Pages/ServiceDetails";
import UserService from "./Pages/UserService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import CaliforniaPolicy from "./Pages/CaliforniaPolicy";
import ScrollUp from "./Components/ScrollUp";
import Cursor from "./Components/Cursor";
import ThankYou from "./Pages/ThankYou";
import ServiceProviders from "./Pages/ServiceProviders";

const App = () => {
  return (
    <Router>
        <AutoScroll/>
        <ScrollUp/>
        <Cursor/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Services" element={<Services/>}></Route>
          <Route path="/Contact" element={<Contact/>}></Route>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/Services/:title" element={<ServiceDetails/>}></Route>
          <Route path="/UserTerms" element={<UserService/>}></Route>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}></Route>
          <Route path="/CaliforniaPolicy" element={<CaliforniaPolicy/>}></Route>
          <Route path="/ThankYou" element={<ThankYou/>}></Route>
          <Route path="/PartnerCompanies" element={<ServiceProviders/>}></Route>
        </Routes>
        <Footer/>
    </Router>
  );
};

export default App;
