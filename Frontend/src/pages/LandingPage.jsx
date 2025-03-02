import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBrain, FaHeartbeat, FaChartLine, FaCalendarAlt, FaRobot, FaUserMd } from 'react-icons/fa'
import ThreeScene from '../components/ThreeScene'

const LandingPage = () => {
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Recover</span> with Joy, <br />
                <span className="gradient-text">Rebuild</span> with Purpose
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
                Our gamified stroke recovery platform makes rehabilitation engaging, 
                interactive, and effective with personalized activities and real-time progress tracking.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/dashboard" className="btn-primary text-center">
                  Start Your Recovery
                </Link>
                <a href="#how-it-works" className="btn-secondary text-center">
                  Learn More
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Stroke Recovery" 
                  className="w-full h-auto rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Personalized Recovery Journey</h3>
                  <p className="text-gray-600">
                    Our platform adapts to your specific needs, creating a customized 
                    rehabilitation program that evolves as you progress.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Based on 2,500+ recoveries</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-100 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-100 rounded-full animate-pulse-slow"></div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#features" className="text-gray-500 hover:text-gray-700">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">Engaging Features for Effective Recovery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven rehabilitation techniques 
              to make your recovery journey effective and enjoyable.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaBrain className="text-4xl text-primary-500" />,
                title: "Cognitive Exercises",
                description: "Interactive brain games designed to improve memory, attention, and problem-solving skills."
              },
              {
                icon: <FaHeartbeat className="text-4xl text-primary-500" />,
                title: "Physical Therapy",
                description: "Guided movement exercises that help rebuild strength, coordination, and mobility."
              },
              {
                icon: <FaChartLine className="text-4xl text-primary-500" />,
                title: "Progress Tracking",
                description: "Detailed analytics and visualizations to monitor your recovery journey and celebrate milestones."
              },
              {
                icon: <FaCalendarAlt className="text-4xl text-primary-500" />,
                title: "Daily Activities",
                description: "Personalized daily tasks that adapt to your progress and keep you motivated."
              },
              {
                icon: <FaRobot className="text-4xl text-primary-500" />,
                title: "AI Therapy Assistant",
                description: "Virtual therapy sessions with an AI assistant that provides guidance and support."
              },
              {
                icon: <FaUserMd className="text-4xl text-primary-500" />,
                title: "Doctor Appointments",
                description: "Schedule and manage appointments with healthcare professionals directly through the platform."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="card hover:border-primary-500 hover:border-2 group"
              >
                <div className="mb-4 p-4 bg-primary-50 rounded-full inline-block group-hover:bg-primary-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">How RecoverWell Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform guides you through a personalized recovery journey with a simple, 
              effective approach that adapts to your needs.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100"></div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12 relative"
            >
              {[
                {
                  title: "Assessment",
                  description: "Complete a comprehensive assessment to help us understand your specific needs and recovery goals.",
                  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  title: "Personalized Plan",
                  description: "Receive a customized recovery plan with activities and exercises tailored to your condition and goals.",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  title: "Daily Activities",
                  description: "Engage in daily activities and exercises that are fun, interactive, and designed to improve specific skills.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  title: "Track Progress",
                  description: "Monitor your progress with detailed analytics and celebrate achievements as you reach milestones.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 p-4">
                    <div className={`rounded-xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <img src={step.image} alt={step.title} className="w-full h-64 object-cover" />
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 p-4 relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-500 rounded-full z-10 shadow-lg left-0 md:left-auto md:right-auto md:translate-x-0">
                      {index % 2 === 0 ? 
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-primary-500"></div> :
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-primary-500"></div>
                      }
                    </div>
                    
                    <div className={`p-6 bg-white rounded-xl shadow-md ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="inline-block bg-primary-100 text-primary-800 rounded-full px-4 py-1 text-sm font-semibold mb-4">
                        Step {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from individuals who have transformed their recovery journey with RecoverWell.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Stroke Survivor, 58",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote: "RecoverWell made my recovery journey enjoyable rather than a chore. The gamified approach kept me motivated, and I've seen significant improvements in my mobility and cognitive abilities."
              },
              {
                name: "Michael Chen",
                role: "Stroke Survivor, 62",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "The AI therapy sessions were a game-changer for me. Having access to support whenever I needed it helped me stay consistent with my exercises and overcome challenges."
              },
              {
                name: "Emily Rodriguez",
                role: "Stroke Survivor, 45",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote: "I love how the platform adapts to my progress. The activities are challenging enough to push me forward but not so difficult that I get discouraged. My recovery has accelerated significantly."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Recovery Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of individuals who have made their stroke recovery more engaging, 
              effective, and enjoyable with RecoverWell.
            </p>
            <Link to="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-block">
              Start Your Recovery Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage