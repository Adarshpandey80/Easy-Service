import React from 'react'
import SuperAdminNav from './SuperAdmin/SuperAdminNav';
import { Outlet } from 'react-router-dom';
function AdminLayout() {
  return (
    <>
<SuperAdminNav/>

<Outlet/>
    </>
  )
}

export default AdminLayout