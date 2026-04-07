import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Sparkles, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/student-form", label: "Get Sized", icon: Sparkles },
    { to: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      style={{
        background:
          "linear-gradient(135deg, rgba(244,101,48,0.98) 0%, rgba(234,88,12,0.96) 50%, rgba(194,65,12,0.98) 100%)",
        backdropFilter: "blur(18px)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/pickp-logo.png"
            alt="Pickp"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1 shadow-inner shadow-orange-950/10 backdrop-blur-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-white/90 hover:bg-white/12 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/12 text-white shadow-lg shadow-orange-950/20 backdrop-blur-sm transition-colors hover:bg-white/18"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#d85a1c]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="mb-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white shadow-lg shadow-orange-950/10 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Navigation
              </div>
              <div className="mt-1 text-sm font-semibold">
                Find your perfect fit in seconds
              </div>
            </div>

            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-semibold shadow-sm transition-colors ${
                      isActive
                        ? "border-white/25 bg-white text-orange-600"
                        : "border-white/10 bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                      Open
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
export default Header;
