import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Categories", href: "#categories" },
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <img src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png" alt="Logo" className="w-10 h-10" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">CourseConvo</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
              Log In
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-slate-900 hover:bg-indigo-600 text-white px-8 h-12 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/10">
              Sign Up Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Slide-over Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
      />

      {/* Mobile Slide-over Menu */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-80 bg-white z-[120] shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <span className="text-xl font-black text-slate-900">Menu</span>
            <button onClick={toggleMenu} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMenu}
                className="text-lg font-black text-slate-900 border-b border-slate-50 pb-4 flex justify-between items-center group"
              >
                {link.name}
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-indigo-600" />
              </a>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-50 flex flex-col gap-4">
            <Link to="/auth" className="w-full">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest border-slate-200">Log In</Button>
            </Link>
            <Link to="/auth" className="w-full">
              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700">Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;