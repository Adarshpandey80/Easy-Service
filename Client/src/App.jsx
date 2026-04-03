import { useState } from 'react'
import axios from 'axios';
import React from 'react'
import Nav from './Component/Nav.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import UserLayout from './UserLayout.jsx';
import ShopOwnerLayout from './ShopOwnerLayout.jsx';
import AdminLayout from './AdminLayout.jsx';

import Home from './Component/Home.jsx'
import Career from './Component/Career.jsx'
import UserSignupForm from './Component/UserSignupForm.jsx';
import UserLoginForm from './Component/UserLoginForm.jsx';
import UserProfileDash from './Component/UserProfileDash.jsx';
import ShowShopDetails from './Component/ShowShopDetails.jsx';
import Chat from './Component/Chat.jsx';

import Footer from './Component/Footer.jsx'
import ShopkeeperSignup from './Shopkeeper/ShopkeeperSignup.jsx'; 
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
import Kyc from './Shopkeeper/Kyc.jsx';

import AdminDashboard from './SuperAdmin/AdminDashboard.jsx';
import AdminUsers from './SuperAdmin/AdminUsers.jsx';


function App() {
  return (
    <>
    {/* <Router>
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
      </Routes>
      <Footer />
    </Router> */}



 <BrowserRouter>
 <Routes>
   <Route path='/' element={<UserLayout/>}>
   <Route index element={<Home/>} />
   <Route path="career" element={<Career />} />
      <Route path="login" element={<UserLoginForm />} />
      <Route path="signup" element={<UserSignupForm />} />
      <Route path="userprofile" element={<UserProfileDash />} />
      <Route path="shop/:id" element={<ShowShopDetails />} />
      <Route path="chat/:id" element={<Chat />} />
   </Route> 
   

  {/* Shop Owner Layout */}
    <Route path="/owner" element={<ShopOwnerLayout />}>
      <Route index element={<ShopOwnerLoginForm/>} />
      <Route path="ShopOwnerLoginForm" element={<ShopOwnerLoginForm/>} />
      <Route path="shopkeeperSignup" element={<ShopkeeperSignup />} />
      <Route path="dashboard" element={< Dashboard />} />
      <Route path="addworkerform" element={<Addworkerform />} />
      <Route path="workerlist" element={<WorkerList />} />
      <Route path="workereditform" element={<WorkerEditForm />} />
      <Route path="orders" element={<ShopOrder />} />
      <Route path="services" element={<ShopOwnerServices />} />
      <Route path="payment" element={<Payments />} />
      <Route path="messages" element={<Messages />} />
      <Route path="profile" element={<ShopOwnerProfile />} />
      <Route path="kyc" element={<Kyc />} />
    </Route>


    <Route path='/superadmin' element={<AdminLayout/>}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
    </Route>
 </Routes>
 </BrowserRouter>

 


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
