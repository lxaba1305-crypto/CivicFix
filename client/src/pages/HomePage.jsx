import { Link } from 'react-router-dom';
import backgroundImage from '../images/background-img.jpg';

function HomePage() {
return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-cover bg-center w-full min-h-screen">

        <div className="min-h-screen w-full bg-black/50 flex flex-col items-center justify-center px-4">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400"/>
          <span className="text-lg font-bold text-white">CivicFix</span>
          </div>

        <h1 className="text-4xl text-white text-center max-w-lg leading-tight">
            Your Streets, Your Voice. Fixed Faster.
        </h1>
        <p className="text-stone-300 text-sm mt-4 text-center max-w-sm">
            Report local issues in your community and track their resolution in real-time.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <Link to="/signup" className="px-5 py-2.5 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Report an Issue
          </Link>
          <Link to="/login" className="px-5 py-2.5 text-sm font-medium border border-white text-white rounded-lg hover:bg-white hover:text-stone-800 transition">
            Sign In
          </Link>

          {/* PRIMARY DEMO BUTTON */}
          <Link
            to='/dashboard'
            className='px-6 py-3 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-52 text-center' 
          >
            Demo
          </Link>
      </div>

        </div>
    </div>
   
    
)
}

export default HomePage;