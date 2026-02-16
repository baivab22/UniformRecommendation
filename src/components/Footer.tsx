import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/pickp-logo.png" alt="Pickp" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-white">Pickp</span>
            </div>
            <p className="text-sm text-gray-400">
              Perfect biometric sizing for shirts, pants, and shoes. Find your perfect fit today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/student-form" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Get Sized
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-orange-500" />
                <a href="mailto:support@pickp.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                  support@pickp.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-orange-500" />
                <a href="tel:+61426350292" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Udit Srivastava — +61 426 350 292
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">Worldwide</span>
              </div>
            </div>
          </div>

          {/* Newsletter removed per request */}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
     <div></div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
