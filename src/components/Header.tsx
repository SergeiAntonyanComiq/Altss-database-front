import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (user) {
      navigate("/cabinet3");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 lg:px-10",
        {
          "bg-white/80 backdrop-blur-md shadow-sm": isScrolled,
          "bg-transparent": !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/lovable-uploads/f0e39660-fbf7-43b0-a89f-e3a346681785.png"
              alt="Altss Logo"
              className="h-10"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
          >
            Pricing
          </a>
          <Button asChild variant="outline" className="ml-2">
            <a href="#contact">Contact</a>
          </Button>
          {user ? (
            <>
              <Button
                asChild
                className="bg-altss-deep-blue hover:bg-altss-blue transition-all duration-300"
              >
                <a href="/cabinet3">Dashboard</a>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="bg-altss-deep-blue hover:bg-altss-blue transition-all duration-300"
            >
              <a href="/auth">Sign In</a>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-24 px-6",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <a
            href="#features"
            className="text-lg text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-lg text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-lg text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-lg text-altss-slate hover:text-altss-deep-blue transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          {user ? (
            <>
              <Button
                onClick={() => {
                  navigate("/cabinet3");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-altss-deep-blue hover:bg-altss-blue transition-all duration-300 w-full"
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                navigate("/auth");
                setIsMobileMenuOpen(false);
              }}
              className="bg-altss-deep-blue hover:bg-altss-blue transition-all duration-300 w-full mt-4"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
