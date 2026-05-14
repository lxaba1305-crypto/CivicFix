import { motion } from 'framer-motion';

const stats = [
  {
    value: '1,200+',
    label: 'Reports Submitted',
  },
  {
    value: '850+',
    label: 'Issues Resolved',
  },
  {
    value: '3,500+',
    label: 'Community Upvotes',
  },
  {
    value: '25+',
    label: 'Municipal Departments',
  },
];

function StatsSection() {
  return (
    <section id="#stats" className="relative z-10 bg-stone-900 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-green-400 font-semibold uppercase tracking-widest text-sm"
        >
          Community Impact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black mt-4"
        >
          Making Communities Better Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-stone-400 mt-6 max-w-3xl mx-auto text-lg"
        >
          CivicFix helps residents and municipalities work together to
          identify, prioritize, and resolve public issues efficiently.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md"
          >
            <h3 className="text-4xl font-black text-green-400">
              {stat.value}
            </h3>
            <p className="text-stone-300 mt-3">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;