import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  const isLoggedIn = location.pathname !== '/'
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isLoggedIn ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold gradient-text">RecoverWell</span>
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className={`font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}>Dashboard</Link>
                <Link to="/activities" className={`font-medium transition-colors ${location.pathname === '/activities' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}>Activities</Link>
                <Link to="/games" className={`font-medium transition-colors ${location.pathname === '/games' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}>Games</Link>
                <Link to="/podcast" className={`font-medium transition-colors ${location.pathname === '/podcast' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}>Podcast</Link>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  <FaUser className="text-gray-600" />
                </div>
              </>
            ) : (
              <>
                <a href="#features" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">Features</a>
                <a href="#how-it-works" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">How It Works</a>
                <a href="#testimonials" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">Testimonials</a>
                <Link to="/dashboard" className="btn-primary">Get Started</Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
          >
            {isLoggedIn ? (
              <div className="flex flex-col space-y-4 px-4">
                <Link to="/dashboard" className={`font-medium ${location.pathname === '/dashboard' ? 'text-primary-600' : 'text-gray-700'}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/activities" className={`font-medium ${location.pathname === '/activities' ? 'text-primary-600' : 'text-gray-700'}`} onClick={() => setIsOpen(false)}>Activities</Link>
                <Link to="/doctor-appointment" className={`font-medium ${location.pathname === '/doctor-appointment' ? 'text-primary-600' : 'text-gray-700'}`} onClick={() => setIsOpen(false)}>Appointments</Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-600" size={14} />
                  </div>
                  <span className="font-medium text-gray-700">Profile</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 px-4">
                <a href="#features" className="font-medium text-gray-700" onClick={() => setIsOpen(false)}>Features</a>
                <a href="#how-it-works" className="font-medium text-gray-700" onClick={() => setIsOpen(false)}>How It Works</a>
                <a href="#testimonials" className="font-medium text-gray-700" onClick={() => setIsOpen(false)}>Testimonials</a>
                <Link to="/dashboard" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar