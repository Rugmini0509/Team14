import React from 'react'
import MainBanner from '../components/MainBanner'
import { Route } from 'react-router-dom'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
// import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
  
    <div className='m-10 '>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <BottomBanner/>
     
      
      
    </div>
  )
}

export default Home
