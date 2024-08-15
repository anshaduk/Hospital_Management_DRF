
import React from "react";
// import "./App.css";
import Navbar from "./components/User/Navbar";
import Home from "./components/User/Home";
import About from "./components/User/About";
import Services from "./components/User/Services";
import Doctors from "./components/User/Doctors";
import Footer from "./components/User/Footer";
import AppRouter from "./route/AppRouter";

function App() {
  return(
    <>
    {/* <Navbar/>
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
    <Footer /> */}

    <AppRouter/>
    </>
  )
}

export default App;
