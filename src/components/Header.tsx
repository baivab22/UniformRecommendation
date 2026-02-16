import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 px-8">
      <nav className="container  px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/pickp-logo.png" alt="Pickp" className="h-14 w-14 object-contain" />
          <span className="text-2xl font-bold text-orange-600">
            Pickp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 font-bold hover:text-orange-600 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200">
            Home
          </Link>
          <Link to="/student-form" className="text-gray-700 font-bold hover:text-orange-600 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200">
            Get Sized
          </Link>
          <Link to="/admin" className="text-gray-700 font-bold hover:text-orange-600 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200">
            Admin
          </Link>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/student-form">Start Now</Link>
          </Button>
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-1 py-4 space-y-3 flex flex-col">
            <Link
              to="/"
              className="text-gray-700 font-bold hover:text-orange-600 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/student-form"
              className="text-gray-700 font-medium hover:text-orange-600 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Get Sized
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 font-medium hover:text-orange-600 transition-colors py-2 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-200"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link to="/student-form">Start Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
export default Header;
