import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="MealPlanner"
              className="h-10 w-10 object-contain"
            />
            <span className="font-extrabold text-2xl text-gradient bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 bg-clip-text text-transparent">
              MealPlanner
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-between items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition text-lg hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/planner"
              className="text-gray-700 hover:text-green-600 font-medium transition text-lg hover:scale-105"
            >
              Weekly Meal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="bg-white border-t shadow-md animate-slideDown">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 font-medium text-lg transition hover:scale-105"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/planner"
              className="block text-gray-700 hover:text-green-600 font-medium text-lg transition hover:scale-105"
              onClick={() => setOpen(false)}
            >
              Meal Planner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
