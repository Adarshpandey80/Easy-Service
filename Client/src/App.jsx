import { useState } from 'react'
import React from 'react'
import Nav from './Component/Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Component/Home.jsx'
import Career from './Component/Career.jsx'

import Footer from './Component/Footer.jsx'
import ShopkeeperDashboard from './Shopkeeper/ShopkeeperDashboard.jsx';





function App() {
  

  return (
    <>
   <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/career" element={<Career />} />
      <Route path="/shopdash" element={<ShopkeeperDashboard />} />
    </Routes>
    <Footer />
   </Router>
      
    </>
  )
}

export default App
