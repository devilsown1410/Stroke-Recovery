import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSearch, FaStopwatch, FaTrophy, FaStar } from 'react-icons/fa'

const Activities = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const activities = [
    {
      id: 1,
      title: "Hand Coordination Exercise",
      description: "Practice fine motor skills with interactive finger exercises",
      duration: "15 min",
      points: 50,
      category: "Physical",
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 2,
      title: "Memory Challenge",
      description: "Match pairs of cards to improve your memory and recall",
      duration: "10 min",
      points: 40,
      category: "Cognitive",
      difficulty: 1,
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      title: "Speech Practice",
      description: "Read aloud passages and receive feedback on pronunciation",
      duration: "20 min",
      points: 60,
      category: "Speech",
      difficulty: 3,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 4,
      title: "Balance Training",
      description: "Follow guided exercises to improve stability and balance",
      duration: "15 min",
      points: 50,
      category: "Physical",
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 5,
      title: "Word Association Game",
      description: "Improve language skills by connecting related words",
      duration: "10 min",
      points: 40,
      category: "Cognitive",
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 6,
      title: "Arm Strength Exercises",
      description: "Build arm strength with adaptive resistance training",
      duration: "20 min",
      points: 60,
      category: "Physical",
      difficulty: 3,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    }
  ]
  
  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.category.toLowerCase() === filter.toLowerCase()
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Recovery Activities</h1>
          <p className="text-gray-600">Choose from a variety of activities designed to help your recovery.</p>
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
                {['all', 'physical', 'cognitive', 'speech'].map((category) => (
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Activities Grid */}
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
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                  <span className="inline-block px-2 py-1 bg-primary-100 text-xs font-medium rounded-full text-primary-800">
                    {activity.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{activity.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaStopwatch className="mr-1" /> {activity.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaTrophy className="mr-1 text-yellow-500" /> {activity.points} points
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Difficulty:</span>
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < activity.difficulty ? 'text-yellow-400' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Start
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No activities found matching your criteria.</p>
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

export default Activities