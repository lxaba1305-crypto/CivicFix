import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
              <span className="text-2xl font-bold text-white">
                CivicFix
              </span>
            </div>

            <p className="text-stone-400 max-w-md leading-relaxed">
              Empowering communities to report local issues, track
              progress, and help municipalities respond faster.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500"
        >
          <p>
            © {new Date().getFullYear()} CivicFix. All rights reserved.
          </p>

          <p>
            Your Streets, Your Voice. Fixed Faster.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;