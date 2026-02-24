import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="shadow-lg sticky top-0 z-50 px-0"
      style={{ background: "rgb(244,101,48)", backdropFilter: "blur(8px)" }}
    >
      <nav className="container px-4 py-3 flex items-center justify-between">
        {/* Logo Only */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img src="/pickp-logo.png" alt="Pickp" className="h-20 w-20 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white font-bold hover:text-orange-100 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200">
            Home
          </Link>
          <Link to="/student-form" className="text-white font-bold hover:text-orange-100 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200">
            Get Sized
          </Link>
          <Link to="/admin" className="text-white font-bold hover:text-orange-100 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200">
            Admin
          </Link>
          {/* Start Now button removed as requested */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-orange-500 to-orange-300 border-t border-orange-200">
          <div className="container mx-auto px-1 py-4 space-y-3 flex flex-col">
            <Link
              to="/"
              className="text-white font-bold hover:text-orange-100 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/student-form"
              className="text-white font-medium hover:text-orange-100 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Get Sized
            </Link>
            <Link
              to="/admin"
              className="text-white font-medium hover:text-orange-100 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/80 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            {/* Start Now button removed as requested */}
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
export default Header;
