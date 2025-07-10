import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import AdminLogin from '../admin/AdminLogin'
import AdminPanel from '../admin/AdminPanel'

import './Sty.css';
function App() {

  return (
    <>
      <Router>
        <header id="header" className="header d-flex align-items-center sticky-top">
          <div className="container position-relative d-flex align-items-center justify-content-between">

            <a className="logo d-flex align-items-center me-auto me-xl-0">
              <img src="/assets/img/icon-img.png" /> 
              <h1 className="sitename">DigiMenu</h1>
            </a>

            <nav id="navmenu" className="navmenu">
              <ul>

                <li><a href="#hero">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>

              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i> 
            </nav>


          </div>
        </header>

        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          
          <Route path="/admin-panel" element={<AdminPanel />}></Route>
  
        </Routes>



        
      </Router>

    </>
  )
}

export default App
