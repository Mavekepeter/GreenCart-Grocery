import React from 'react'
import Navbr from './components/Navbr'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { useAppContext } from './context/AppContent'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const App = () => {
  const isSellerpath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppContext();
  return (
    <div>
      {isSellerpath ?null :<Navbr/>}
      {showUserLogin ? <Login/> : null}
      <Toaster/>
      <div className={`${isSellerpath ? "":"px-6 md:px-16 lg:px-24 xl:px-32"}`} >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>


        </Routes>
      </div>
      {!isSellerpath && <Footer/>}
    </div>
  )
}

export default App
