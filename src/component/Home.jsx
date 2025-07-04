import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";
export default function Home() {
   useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    <>
  <section id="hero" className="hero section light-background">
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          
          {/* Left Side Text */}
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">
             Welcome to  <br /> DigiMenu
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
            Order your favorite meals with ease!
            </p>

            {/* Buttons */}
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
             <a href="#menu" className="btn-get-started">See Menu</a>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
            <img
              // src="/assets/img/hero-img.png"
              src="/assets/img/food-img.avif"
              className="img-fluid animated"
              alt="Delicious Food"
            />
          </div>
        </div>
      </div>
    </section>

   {/* SCROLLABLE SECTIONS */}
      <section id="menu" className="section-scroll">
        <Menu />
      </section>

      <section id="about" className="section-scroll">
        <About />
      </section>

      <section id="contact" className="section-scroll">
        <Contact />
      </section>
  
    </>
  );
}

