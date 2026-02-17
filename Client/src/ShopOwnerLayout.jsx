import React from 'react'
import ShopkeeperNavbar from './Shopkeeper/ShopkeeperNavbar'
import Footer from './Component/Footer'
import { Outlet } from 'react-router-dom'

function ShopOwnerLayout() {
  return (
   <>
    <ShopkeeperNavbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default ShopOwnerLayout