import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSearch, FaPlay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Podcast = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [podcasts, setPodcasts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/podcast')
        console.log(response.data.podcasts)
        if (Array.isArray(response.data.podcasts)) {
          console.log(Array.isArray(response.data))
          setPodcasts(response.data.podcasts)
        } else {
          console.error('Unexpected response format:', response.data)
        }
      } catch (error) {
        console.error('Error fetching podcasts:', error)
      }
    }
    fetchPodcasts()
  }, [])

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesFilter = filter === 'all' || podcast.keywords.includes(filter.toLowerCase())
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          podcast.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="pt-20 pb-10 bg-gray-50 min-h-screen">
      <Navbar/>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Podcasts</h1>
          <p className="text-gray-600">Explore our collection of podcasts on stroke recovery.</p>
        </motion.div>
        
        {/* Filters and Search */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500" />
              <div className="flex space-x-2">
                {['all', 'stroke recovery', 'rehabilitation', 'patient experiences', 'caregiver support', 'therapy techniques', 'holistic therapy', 'neurology', 'patient empowerment'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search podcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Podcasts Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPodcasts.map((podcast) => (
            <motion.div
              key={podcast._id}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/podcastplayer/${podcast._id}`)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={podcast.thumbnail} 
                  alt={podcast.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{podcast.title}</h3>
                  <span className="inline-block px-2 py-1 bg-primary-100 text-xs font-medium rounded-full text-primary-800">
                    {podcast.keywords.join(', ')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{podcast.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaPlay className="mr-1" /> Play
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredPodcasts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No podcasts found matching your criteria.</p>
            <button 
              onClick={() => {setFilter('all'); setSearchTerm('')}} 
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Podcast
