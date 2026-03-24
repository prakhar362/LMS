import headerimg from "../../assets/image.png"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero from '../../assets/hero.png'
const HeroSection = () => {
  return (
    <div className="grid container mx-auto px-6 grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
      <div className="flex flex-col justify-center text-center lg:text-left">
        <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs mb-6 px-4 py-2 bg-indigo-50 rounded-full w-fit mx-auto lg:mx-0">Empower Your Future</span>
        <h1 className="mb-8 text-5xl lg:text-7xl font-black leading-[1.05] text-slate-900 tracking-tighter">
          You <span className="text-rose-500 underline decoration-indigo-200 underline-offset-[10px] decoration-8">learn</span> today & <br />
          <span className="text-indigo-600 italic">Earn</span> tomorrow
        </h1>

        <h2 className="text-xl lg:text-2xl font-bold text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
          <span className="text-slate-900">Level up your career</span> with skills that actually matter. Get the edge you need with our <span className="text-indigo-600">premium curriculum</span>.
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
          <Link to="/auth">
            <Button className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-8 rounded-2xl font-black uppercase tracking-widest text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20">
              Get Started Now
            </Button>
          </Link>

          <Button variant="outline" className="group bg-white border-2 border-slate-100 hover:border-indigo-200 px-10 py-8 rounded-2xl font-black uppercase tracking-widest text-slate-600 transition-all flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400 group-hover:text-indigo-600">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 7.5V4.5z" clipRule="evenodd" />
              </svg>
            </div>
            Become Instructor
          </Button>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-0  scale-150 rotate-12 -z-10 animate-pulse" />
        <img
          src={headerimg}
          alt="hero"
          className="w-full relative z-10  "
        />
      </div>
    </div>
  );
};

export default HeroSection;