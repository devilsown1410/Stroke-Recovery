import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarCheck, FaChartLine, FaTrophy, FaStopwatch, FaFire, FaRegCalendarAlt, FaRobot, FaUserMd } from 'react-icons/fa'
import ThreeScene from '../components/ThreeScene'

const Dashboard = () => {
  const [stats, setStats] = useState({
    streak: 12,
    points: 2450,
    activitiesCompleted: 78,
    nextMilestone: 100,
    todayMinutes: 25,
    weeklyGoal: 180,
    weeklyProgress: 135
  })
  
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Hand Coordination Exercise",
      description: "Practice fine motor skills with interactive finger exercises",
      duration: "15 min",
      points: 50,
      category: "Physical",
      completed: false
    },
    {
      id: 2,
      title: "Memory Challenge",
      description: "Match pairs of cards to improve your memory and recall",
      duration: "10 min",
      points: 40,
      category: "Cognitive",
      completed: false
    },
    {
      id: 3,
      title: "Speech Practice",
      description: "Read aloud passages and receive feedback on pronunciation",
      duration: "20 min",
      points: 60,
      category: "Speech",
      completed: false
    }
  ])
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Williams",
      specialty: "Neurologist",
      date: "May 15, 2025",
      time: "10:30 AM",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 2,
      doctor: "Dr. James Chen",
      specialty: "Physical Therapist",
      date: "May 18, 2025",
      time: "2:00 PM",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ])
  const [activeActivity, setActiveActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  const completeActivity = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, completed: true } : activity
    ));
  
    setStats(prev => ({
      ...prev,
      points: prev.points + activities.find(a => a.id === id).points,
      activitiesCompleted: prev.activitiesCompleted + 1,
      todayMinutes: prev.todayMinutes + Math.floor(timeLeft / 60)
    }));
  
    setIsFrozen(false);
    setActiveActivity(null);
  };
  
  const startActivity = (activity) => {
    const totalSeconds = parseInt(activity.duration) * 60; // Convert minutes to seconds
    setActiveActivity(activity);
    setTimeLeft(totalSeconds);
    setIsFrozen(true);
  
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          completeActivity(activity.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  return (
    <div className="pt-20 pb-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Alex!</h1>
            <p className="text-gray-600">Let's continue your recovery journey today.</p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-4 md:mt-0 flex items-center"
          >
            <div className="bg-white rounded-full p-2 shadow-md mr-4">
              <FaFire className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-xl font-bold text-gray-800">{stats.streak} Days</p>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Cards */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={fadeIn} className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Total Points</h3>
              <FaTrophy className="text-yellow-300 text-xl" />
            </div>
            <p className="text-3xl font-bold mb-2">{stats.points}</p>
            <div className="bg-white bg-opacity-20 rounded-full h-2 mb-2">
              <div 
                className="bg-white rounded-full h-2" 
                style={{ width: `${(stats.activitiesCompleted / stats.nextMilestone) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm">{stats.nextMilestone - stats.activitiesCompleted} activities until next milestone</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Activities Completed</h3>
              <FaCalendarCheck className="text-primary-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{stats.activitiesCompleted}</p>
            <p className="text-sm text-gray-600">Lifetime activities</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Today's Progress</h3>
              <FaStopwatch className="text-primary-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{stats.todayMinutes} min</p>
            <p className="text-sm text-gray-600">of activity today</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Weekly Goal</h3>
              <FaChartLine className="text-primary-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{stats.weeklyProgress}/{stats.weeklyGoal} min</p>
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-primary-500 rounded-full h-2" 
                style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}% of weekly goal</p>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Activities */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Today's Activities</h2>
                <Link to="/activities" className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className={`p-4 border rounded-lg transition-all ${
                      activity.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-primary-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{activity.title}</h3>
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <FaStopwatch className="mr-1" /> {activity.duration}
                          </span>
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <FaTrophy className="mr-1 text-yellow-500" /> {activity.points} points
                          </span>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-medium rounded-full text-gray-800">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      {isFrozen && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white z-50">
                          <h2 className="text-3xl font-bold mb-4">Activity In Progress</h2>
                          
                          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex items-center justify-center">
                            <span className="text-6xl font-mono">{formatTime(timeLeft)}</span>
                          </div>

                          <p className="mt-2 text-gray-300">Stay focused and complete the task!</p>
                        </div>
                      )}
                      <button
                        onClick={() => startActivity(activity)}
                        disabled={activity.completed || isFrozen}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          activity.completed
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                        }`}
                      >
                        {activity.completed ? 'Completed' : 'Start'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
              
              <div className="h-64 flex items-end justify-between px-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex flex-col items-center">
                    <div 
                      className={`w-8 rounded-t-lg ${index === 3 ? 'bg-primary-600' : 'bg-primary-200'}`}
                      style={{ 
                        height: `${[30, 45, 60, 80, 50, 65, 40][index]}%`,
                        transition: 'height 1s ease-out'
                      }}
                    ></div>
                    <p className="mt-2 text-sm text-gray-600">{day}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-8"
          >
            {/* Therapy Options */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Therapy Sessions</h2>
              
              <div className="space-y-4">
                <Link to="/ai-therapy" className="block p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <FaRobot className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">AI Therapy Assistant</h3>
                      <p className="text-gray-600">Virtual sessions with our AI therapist</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/doctor-appointment" className="block p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <FaUserMd className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">Doctor Appointments</h3>
                      <p className="text-gray-600">Schedule sessions with specialists</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
                <Link to="/doctor-appointment" className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </Link>
              </div>
              
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:shadow-md transition-all">
                      <div className="flex items-center">
                        <img 
                          src={appointment.image} 
                          alt={appointment.doctor} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                          <p className="text-gray-600 text-sm">{appointment.specialty}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <FaRegCalendarAlt className="mr-1" />
                            <span>{appointment.date} at {appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No upcoming appointments.</p>
              )}
            </div>
            
            {/* 3D Animation */}
            <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recovery Milestone</h2>
              <p className="text-gray-600 mb-4">You're making great progress! Keep going!</p>
              
              <div className="h-48 relative">
                <ThreeScene style={{ position: 'absolute', top: 0, left: 0 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard