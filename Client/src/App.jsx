import { useState } from 'react'
import axios from 'axios';
import React from 'react'
import Nav from './Component/Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Component/Home.jsx'
import Career from './Component/Career.jsx'
import UserSignupForm from './Component/UserSignupForm.jsx';
import UserLoginForm from './Component/UserLoginForm.jsx';
import Footer from './Component/Footer.jsx'
import ShopkeeperForm from './Shopkeeper/ShopkeeperForm.jsx'; 
import ShopOwnerLoginForm from './Shopkeeper/ShopOwnerLoginForm.jsx';
import ShopkeeperNavbar from './Shopkeeper/ShopkeeperNavbar.jsx';
import Addworkerform from './Shopkeeper/ShopOwnerWorkers/Addworkerform.jsx';
import WorkerList from './Shopkeeper/ShopOwnerWorkers/WorkerList.jsx';
import WorkerCard from './Shopkeeper/ShopOwnerWorkers/WorkerCard.jsx';



function App() {
  return (
    <>
    
    <Router>
      <ShopkeeperNavbar/>
      <Routes>
        <Route path="/addworkerform" element={<Addworkerform />} />
        <Route path="/workerlist" element={<WorkerList />} />
        <Route path="/workercard" element={<WorkerCard />} />
      </Routes>
    </Router>








   {/* <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/career" element={<Career />} />
      <Route path="/login" element={<UserLoginForm />} />
      <Route path="/signup" element={<UserSignupForm />} />
      <Route path="/shopkeeperForm" element={<ShopkeeperForm />} />
      <Route path="/shopOwnerLogin" element={<ShopOwnerLoginForm />} />
      
    </Routes>
    <Footer />
   </Router> */}
      
    </>
  )
}

export default App
