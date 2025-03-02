import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaPlay, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/games')
        if (Array.isArray(response.data.games)) {
          setGames(response.data.games)
        } else {
          console.error('Unexpected response format:', response.data)
        }
      } catch (error) {
        console.error('Error fetching games:', error)
      }
    }
    fetchGames()
  }, [])

  const filteredGames = games.filter(game => {
    return game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           game.category?.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <div className="container mx-auto px-4">
        {selectedGame ? (
          <div className="flex flex-col items-center">
            <button 
              className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setSelectedGame(null)}
            >
              ⬅ Back
            </button>
            <iframe 
              src={selectedGame} 
              width="100%" 
              height="500px" 
              title="Game"
              className="rounded-lg border shadow-lg"
            ></iframe>
          </div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Games</h1>
              <p className="text-gray-600">Explore our collection of fun and challenging games.</p>
            </motion.div>
            
            {/* Search */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md p-6 mb-8 flex justify-center"
            >
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
            
            {/* Games Grid */}
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
              {filteredGames.map((game) => (
                <motion.div
                  key={game._id}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={game.thumbnail} 
                      alt={game.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
                      <span className="inline-block px-2 py-1 bg-primary-100 text-xs font-medium rounded-full text-primary-800">
                        {game.category?.join(', ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{game.info}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} className={`text-yellow-500 ${index < game.difficulty ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaPlay className="mr-1" /> Play
                      </div>
                    </div>

                    <button 
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
                      onClick={() => setSelectedGame(game.src)} // When clicked, set the src to open in iframe
                    >
                      ▶ Play
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No games found matching your criteria.</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Games
