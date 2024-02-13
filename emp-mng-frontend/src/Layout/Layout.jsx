import React from 'react'
import Header from '../componenets/Header'
import Footer from '../componenets/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Outlet } = require('react-router-dom');

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default Layout
