import { motion } from 'framer-motion';

function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 bg-stone-950 text-white py-28 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400 font-semibold uppercase tracking-widest text-sm">
            About CivicFix
          </span>

          <h2 className="text-4xl sm:text-5xl font-black mt-4 leading-tight">
            Empowering Communities Through Faster Issue Reporting
          </h2>

          <p className="text-stone-400 mt-6 leading-relaxed text-lg">
            CivicFix is a community-driven platform that helps residents
            report public issues such as potholes, broken streetlights,
            illegal dumping, water leaks, and damaged infrastructure.
          </p>

          <p className="text-stone-400 mt-4 leading-relaxed text-lg">
            Our goal is to improve communication between citizens and
            municipalities by making issue reporting simple, transparent,
            and trackable in real time.
          </p>
        </motion.div>

        {/* RIGHT CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-4xl font-black text-green-400">24/7</h3>
            <p className="text-stone-300 mt-2">
              Community reporting anytime, anywhere.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-4xl font-black text-green-400">
              Real-Time
            </h3>
            <p className="text-stone-300 mt-2">
              Track issue progress from submission to resolution.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-4xl font-black text-green-400">
              Citizens
            </h3>
            <p className="text-stone-300 mt-2">
              Encourages active community participation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-4xl font-black text-green-400">
              Transparency
            </h3>
            <p className="text-stone-300 mt-2">
              Full visibility into every reported issue.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;