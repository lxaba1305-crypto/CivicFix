import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CTASection() {
  return (
    <section className="relative z-10 bg-stone-900 text-white py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md"
      >
        <span className="text-green-400 font-semibold uppercase tracking-widest text-sm">
          Get Started Today
        </span>

        <h2 className="text-4xl sm:text-5xl font-black mt-4 leading-tight">
          Ready to Improve Your Community?
        </h2>

        <p className="text-stone-400 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
          Join CivicFix to report issues, support important community concerns,
          and track resolutions in real time.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default CTASection;