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
import WorkerEditForm from './Shopkeeper/ShopOwnerWorkers/WorkerEditForm.jsx';
import ShopOrder from './Shopkeeper/ShopOrder.jsx';
import Dashboard from './Shopkeeper/ShopOwnerDashboard.jsx';
import ShopOwnerServices from './Shopkeeper/ShopOwnerServices.jsx';
import Payments from './Shopkeeper/Payments.jsx';
import Messages from './Shopkeeper/Messages.jsx';
import ShopOwnerProfile from './Shopkeeper/Profile.jsx';



function App() {
  return (
    <>
    <Router>
      <ShopkeeperNavbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addworkerform" element={<Addworkerform />} />
        <Route path="/workerlist" element={<WorkerList />} />
        <Route path="/workereditform" element={<WorkerEditForm />} />
        <Route path="/orders" element={<ShopOrder />} />
        <Route path="/services" element={<ShopOwnerServices />} />
        <Route path="/payment" element={<Payments/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/profile" element={<ShopOwnerProfile/>} />
        <Route path="/logout" element={<h1>Logout Page</h1>} />
      </Routes>
      <Footer />
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
