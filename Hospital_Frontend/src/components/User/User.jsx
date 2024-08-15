import React from 'react'
import Home from './Home'
import Navbar from './Navbar'
import About from './About'
import Services from './Services'
import Doctors from './Doctors'
import Footer from './Footer'

const User = () => {
  return (
    <div>
        <Navbar/>
    <main>
      <div id="home">
        <Home/>
      </div>
      <div id="about">
        <About/>
      </div>
      <div id="services">
        <Services/>
      </div>
      <div id="doctors">
        <Doctors/>
      </div>
    </main>
    <Footer />
    </div>
  )
}

export default User