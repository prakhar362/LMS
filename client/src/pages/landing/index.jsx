// src/pages/LandingPage.js
import { Link } from "react-router-dom";
/* 
 <h1>Welcome to Our Learning Management System</h1>
      <div className="buttons">
        <Link to="/auth">
          <button>Login</button>
        </Link>
        <Link to="/auth">
          <button>Signup</button>
        </Link>
        import headerimg from "../assets/image.png"
        
*/

import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

function LandingPage() {
  return(
    <div className="bg-light-grey-100">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default LandingPage;
