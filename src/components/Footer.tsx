import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="w-full bg-[#141414] text-white border-t border-white/10 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/40 bg-black/40">
                <svg
                  className="w-5 h-5 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold tracking-wide uppercase">
                  Insightful Precision Solutions
                </span>
                <span className="text-[9px] tracking-[0.2em] text-gold uppercase font-medium">
                  Wise Years AI
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI literacy training that meets you where you are — simple, practical, encouraging,
              and always hands-on.
            </p>
            <p className="text-[11px] font-semibold tracking-wider text-gold uppercase">
              Clarity • Confidence • Solutions
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-gold transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Dee
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-gold transition-colors text-left cursor-pointer"
                >
                  Book a Session
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-gold transition-colors text-left cursor-pointer"
                >
                  Request Custom Work
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-gold transition-colors text-left cursor-pointer"
                >
                  Custom Training
                </button>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="hover:text-gold transition-colors"
                >
                  Share Your Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Dee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-200">
              Contact Dee
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <a
                  href="tel:3176956863"
                  className="hover:text-gold transition-colors font-medium text-gray-300"
                >
                  317-695-6863
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <a
                  href="mailto:Deirdre.rush@insightfulprecisionsolutions.com"
                  className="hover:text-gold transition-colors text-gray-300 break-all"
                >
                  Deirdre.rush@insightfulprecisionsolutions.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <span className="text-gray-400 leading-relaxed">
                  Based in Indianapolis, IN
                  <br />
                  Serving nonprofits, care teams &amp; mature workforce organizations nationwide.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Insightful Precision Solutions. All rights reserved.</p>
          <p className="text-gray-400 font-medium tracking-wide">
            Clarity • Confidence • Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
