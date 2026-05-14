import { motion } from 'framer-motion';

const steps = [
  {
    step: '1',
    title: 'Submit a Report',
    description: 'Describe the issue, upload a photo, and provide the exact location.',
  },
  {
    step: '2',
    title: 'View Recent Reports',
    description: 'Residents can browse newly submitted issues in their community.',
  },
  {
    step: '3',
    title: 'Upvote Important Issues',
    description: 'Community members can upvote reports to highlight the most urgent problems.',
  },
  {
    step: '4',
    title: 'Municipality Reviews',
    description: 'Administrators review and assign the report to the relevant department.',
  },
  {
    step: '5',
    title: 'Track Resolution',
    description: 'Follow status updates from Pending to Resolved in real time.',
  },
];

function ProcessSection() {
  return (
    <section id="#process" className="relative z-10 bg-stone-950 text-white py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <span className="text-green-400 font-semibold uppercase tracking-widest text-sm">
          How It Works
        </span>

        <h2 className="text-4xl sm:text-5xl font-black mt-4">
          Reporting an Issue in 5 Simple Steps
        </h2>

        <p className="text-stone-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          CivicFix makes it easy for residents to report issues, support community concerns
          through upvotes, and track progress from submission to resolution.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-5 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xl mb-6">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-stone-400 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;