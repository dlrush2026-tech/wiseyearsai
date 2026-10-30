import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#181818] border-b border-white/10 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo matching original site */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 shrink-0">
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-gold/0 blur-md transition-colors duration-500 group-hover:bg-gold/25"
            />
            <span
              aria-hidden="true"
              className="logo-glow absolute -inset-1 rounded-full border border-gold/40"
            />
            <img
              src="https://vibe.filesafe.space/1793048052107408140/attachments/fcaa638e-49b2-49a4-8361-13fa359f817d.png"
              alt="Wise Years AI Logo"
              className="relative w-12 h-12 rounded-full object-cover border border-gold/40 group-hover:border-gold transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-base font-semibold tracking-wide uppercase font-serif">
              Wise Years Ai
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-medium">
              CLARITY • CONFIDENCE • SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Services
          </Link>
          <Link
            to="/events"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Upcoming Classes
          </Link>
          <Link
            to="/about"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1f1f1f] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Services
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Upcoming Classes
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
