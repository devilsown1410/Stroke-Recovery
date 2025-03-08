import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AITherapy from './pages/AITherapy'
import DoctorAppointment from './pages/DoctorAppointment'
import Activities from './pages/Activities'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Podcast from './pages/Podcast'
import PodcastPlayer from './pages/PodcastPlayer'
import Games from  './pages/Games'
import LoginSign from './pages/LoginSign'
import Breathing from './pages/Breathing'
import MemoryMatching from './pages/MemoryMatching'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-primary-600">Loading your recovery journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== '/ai-therapy' && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginSign />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-therapy" element={<AITherapy />} />
            <Route path="/games" element={<Games />} />
            <Route path='/podcast' element={<Podcast />} />
            <Route path="/podcastplayer/:id" element={<PodcastPlayer />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/breathing" element={<Breathing />} />
            <Route path="/matchgame" element={<MemoryMatching />} />


          </Routes>
        </AnimatePresence>
      </main>
      {location.pathname !== '/ai-therapy' && <Footer />}
    </div>
  )
}

export default App