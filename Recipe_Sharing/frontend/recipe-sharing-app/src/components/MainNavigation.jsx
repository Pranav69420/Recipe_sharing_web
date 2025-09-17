import React from 'react'
import Navbar from './navBar'
import { Outlet } from 'react-router-dom'
import Footer from "../components/footer";

export default function MainNavigation() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
