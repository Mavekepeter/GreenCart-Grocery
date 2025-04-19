import React from 'react'
import Navbr from './components/Navbr'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
const App = () => {
  const isSellerpath = useLocation().pathname.includes("seller");

  return (
    <div>
      {isSellerpath ?null :<Navbr/>}
      <Toaster/>
      <div className={`${isSellerpath ? "":"px-6 md:px-16 lg:px-24 xl:px-32"}`} >
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
      {!isSellerpath && <Footer/>}
    </div>
  )
}

export default App
