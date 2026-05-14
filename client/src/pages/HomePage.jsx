import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../images/background-img.jpg';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import ProcessSection from '../components/ProcessSection';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}
      C-${380 - i * 5 * position} -${189 + i * 6} 
      -${312 - i * 5 * position} ${216 - i * 6}
      ${152 - i * 5 * position} ${343 - i * 6}
       C${616 - i * 5 * position} ${470 - i * 6}
       ${684 - i * 5 * position} ${875 - i * 6}
       ${684 - i * 5 * position} ${875 - i * 6}`,
       width: 0.5 + i * 0.03,
       duration: 18 + i * 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full text-emerald-300"
      viewBox="0 0 696 316"
      fill="none"
      >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.12}
          initial={{ pathLength: 0.3, opacity: 0.2 }}
          animate={{ pathLength: 1,
             opacity: [0.1, 0.3, 0.1 ],
            pathOffset: [0, 1, 0],
          }}
             transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
        />
      ))}
      </svg>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative bg-cover bg-center w-full min-h-screen overflow-hidden">
      
        <HomeNavbar />

        <div className="absolute inset-0 bg-black/60" />
      
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center">

          <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_20px_0_rgba(74,222,128,0.9)]"/>
            <span className="text-lg font-bold text-white">CivicFix</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }} 
            className="text-4xl sm:text-6xl font-black text-white max-w-4xl leading-tight">
              Your Streets,
              <span className="block bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                Your Voice.
              </span>
                Fixed Faster.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-stone-300 text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
              Report local issues in your community and track their resolution in real-time.
          </motion.p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* STATS SECTION */}
      <StatsSection />

      {/* PROCESS ON HOW TO REPORT */}
      <ProcessSection />

      {/* CALL TO ACTION SECTION */}
      <CTASection />
      
      {/* FOOTER */}
      <Footer /> 
    </div>
  )
}

export default HomePage;