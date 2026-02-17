import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Component/Nav'
import Footer from './Component/Footer'

function UserLayout() {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default UserLayout