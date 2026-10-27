import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#181818] border-b border-white/10 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo matching original site */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gold/40 bg-black/40 shadow-inner group-hover:border-gold transition-colors">
            {/* Lightbulb brain stylized icon */}
            <svg
              className="w-6 h-6 text-gold transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-base font-semibold tracking-wide uppercase font-serif">
              Insightful Precision Solutions
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
            Upcoming Events
          </Link>
          <Link
            to="/about"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Contact
          </Link>
          <Link
            to="/feedback"
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-gold transition-colors font-medium [&.active]:text-gold"
          >
            Feedback
          </Link>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 rounded-sm bg-[#c9a050] hover:bg-[#b88f3f] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book a Consulting Appointment
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="rounded-sm bg-[#c9a050] px-3 py-1.5 text-[11px] font-bold uppercase text-black"
          >
            Book
          </button>
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
            Upcoming Events
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            About Dee
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Contact
          </Link>
          <Link
            to="/feedback"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider text-gray-200 hover:text-gold font-medium"
          >
            Feedback
          </Link>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center rounded-sm bg-[#c9a050] hover:bg-[#b88f3f] px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all"
            >
              Book a Consulting Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
