import React, { useState } from "react";
import headerimg from "../../assets/image.png"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import body from "./body";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
    return (
      <div className="container flex flex-col mx-auto bg-white">
        <div className="relative flex flex-wrap items-center justify-between w-full bg-white group py-7 shrink-0">
          <div className="flex">
            <img src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png" alt=""  className="max-h-10 min-w-10"/>
            <h3 className="px-3 font-extrabold text-pretty text-2xl">CourseConvo</h3>
            
          </div>
          <div className="items-center justify-between hidden gap-12 text-black md:flex">
            <a className="text-md font-bold  rounded text-dark-grey-700 hover:text-dark-grey-900 hover:bg-slate-100" href="#features">Features</a>
            <a className="text-md font-bold  rounded text-dark-grey-700 hover:text-dark-grey-900 hover:bg-slate-100" href="#Products">Products</a>
            <a className="text-md font-bold rounded text-dark-grey-700 hover:text-dark-grey-900 hover:bg-slate-100" href="#Testimonials">Testimonials</a>
            <a className="text-md font-bold rounded text-dark-grey-700 hover:text-dark-grey-900 hover:bg-slate-100" href="#instructors">Instructors</a>
            <a className="text-md font-bold rounded text-dark-grey-700 hover:text-dark-grey-900 hover:bg-slate-100" href="#About">About Us</a>
          </div>
          <div className="items-center hidden  gap-8 md:flex">
            <Link to='/auth'>
            <Button className="flex items-center text-sm font-bold bg-blue-950 text-white hover:text-blue-950 hover:bg-slate-300 transition duration-300">Log In</Button>
            </Link>
           <Link to='/auth'>
           <Button className="flex items-center text-sm font-bold bg-blue-950 text-white hover:text-blue-950 hover:bg-slate-300 transition duration-300">
              Sign Up
            </Button>
           </Link>
            
          </div>

          {/* Hamburger Menu for smaller screens */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <Button
          onClick={toggleMenu}
          className="flex min-h-7 min-w-7 bg-slate-300 hover:bg-white rounded-md p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
              fill="black"
            />
          </svg>
        </Button>
      </div>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-80 w-64 rounded-sm bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <Button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-white bg-gray-800  hover:bg-gray-300 hover:text-black rounded-md">
          Close
        </Button>
        <div className="flex flex-col items-start p-6 gap-4">
          <a href="#features" className="text-sm font-medium text-dark-grey-700 hover:text-dark-grey-900">
           Features
          </a>
          <a href="#Products" className="text-sm font-medium text-dark-grey-700 hover:text-dark-grey-900">
            Product
          </a>
          <a href="#Testimonials" className="text-sm font-medium text-dark-grey-700 hover:text-dark-grey-900">
            Testimonials
          </a>
          <a href="#instructors" className="text-sm font-medium text-dark-grey-700 hover:text-dark-grey-900">
            Instructors
          </a>
          <a href="#About" className="text-sm font-medium text-dark-grey-700 hover:text-dark-grey-900">
            About Us
          </a>
          <Link to='/auth'>
          <Button className="px-4 py-2 text-sm font-medium text-white bg-gray-800  hover:bg-gray-300 hover:text-black ">
            Log In
          </Button>
          </Link>
          <Link to='/auth'>
          <Button className="px-4 py-0 -mt-1 text-sm font-medium text-white bg-gray-800  hover:bg-gray-300 hover:text-black ">
            Sign Up
          </Button>
          </Link>
          
        </div>
      </div>
        </div>
      </div>
    );
  };

  export default Navbar;