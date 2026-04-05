import React from 'react'
import {useNavigate , useLocation} from 'react-router-dom'

function ShopkeeperAuth( {children} ) {
  const token = localStorage.getItem("shopowner");
  const location = useLocation();

  // Not logged in → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/owner/ShopOwnerLoginForm"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Logged in → allow access
  return children;
  
}

export default ShopkeeperAuth