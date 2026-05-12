import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../images/background-img.jpg';

function HomePage() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative bg-cover bg-center w-full min-h-screen">

      <div className="min-h-screen w-full bg-black/50 flex flex-col items-center justify-center px-4">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400"/>
          <span className="text-lg font-bold text-white">CivicFix</span>
          </div>

        <h1 className="text-2xl sm:text-4xl text-white text-center max-w-lg leading-tight">
            Your Streets, Your Voice. Fixed Faster.
        </h1>
        <p className="text-stone-300 text-sm mt-4 text-center max-w-sm">
            Report local issues in your community and track their resolution in real-time.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link to="/signup" className="px-7 py-3 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition">
            Report an Issue
          </Link>
          <Link to="/login" className="px-7 py-3 text-sm font-semibold border border-white/30 backdrop-blur-md bg-white/10 text-white rounded-2xl hover:bg-white hover:text-stone-900 transition-all duration-300">
            Sign In
          </Link>

      </motion.div>

        </div>
    </div>
   
    
)
}

export default HomePage;