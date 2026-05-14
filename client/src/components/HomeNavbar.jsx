// components/HomeNavbar.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Stats', href: '#stats' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
          <span className="text-xl font-bold text-white">
            CivicFix
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-stone-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-xl hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-stone-300 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full text-center px-5 py-3 border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default HomeNavbar;