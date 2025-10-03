// import { useEffect, useState } from "react"
// import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
// import { decryptToken } from "../util";
// import { useDispatch } from "react-redux";
// import { fetchUserFromToken } from "../store/authSlice";
// import Cookies from "js-cookie";

import { useState } from "react"
import { Outlet } from "react-router-dom"

const GlobalLayout = () => {
  // const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  // const navigate = useNavigate();
  // const key = import.meta.env.VITE_BASE_ENCRYPTION_KEY;
  // const isAuthenticated = Cookies.get("isAuthenticated");
  const [authenticating, _setAuthenticating] = useState(true)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     if (token) {
  //       const data = decryptToken(token, key)
  //       dispatch(fetchUserFromToken({
  //         data: JSON.parse(data)
  //       }) as any).then(() => {
  //         navigate('/')
  //         setAuthenticating(false)
  //       })
  //     } else {
  //       window.location.href = import.meta.env.VITE_BASE_AUTH_URL
  //     }
  //   } else {
  //     setAuthenticating(false)
  //   }
  // }, []);

  return (
    <>
      {
        !authenticating && <Outlet />
      }
      {
        authenticating && <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading ...</div>
      }
    </>
  )
}

export default GlobalLayout
