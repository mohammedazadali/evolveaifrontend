import React from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/home/Hero'
import Mens from '../components/home/Mens'
import Women from '../components/home/Women'

const Home = () => {
  return (
    <>
    <section>
        <Hero/>
        <Mens/>
        <Women/>
    </section>
    </>
  )
}

export default Home