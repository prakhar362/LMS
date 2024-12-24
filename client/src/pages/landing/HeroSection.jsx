import headerimg from "../../assets/image.png"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero from '../../assets/hero.png'
const HeroSection = () => {
    return (
      <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
        <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
          
        <h1 className="mb-8 -mt-10 text-4xl ml-4 font-bold leading-tight lg:text-6xl text-dark-grey-900">
  You <span className="text-red-600"> learn </span>  today &  <br />
  <span className="text-blue-900"> Earn </span> 
  tomorrow
</h1>

<h2 class="text-3xl font-semibold text-dark-grey-900 ml-4">
  <span class="text-dark-grey-900">Level up your career</span> with <span class="text-yellow-400">skills that matter</span><br />
  Get access to the <span class="text-purple-600">courses</span> that will give you the <span class="text-dark-grey-900">edge</span> you need.
</h2>

          
          <div className="flex flex-col items-center gap-4 ml-5 mt-5 lg:flex-row">
            <Link to='/auth'>
            <Button className="flex items-center  py-6 text-sm font-bold text-white px-7 bg-blue-950 hover:bg-slate-300 hover:text-blue-950 focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl">Get started now</Button>
            </Link>
            
            <Button className="flex items-center py-6 text-sm font-medium px-7 bg-purple-900 text-white transition duration-300 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 ">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 7.5V4.5z" clipRule="evenodd" />
              </svg>
              Want to Become a Instructor??
            </Button>
          </div>
        </div>
        <div className="col-span-1 mt-10 md:mt-0">
          <img src={headerimg} alt="hero image" />
        </div>
      </div>
      
    );
  };

  export default HeroSection;