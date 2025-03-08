
import { motion } from "framer-motion"


export default function BreathingAvatar({
  breathPhase,
  inhaleDuration,
  holdDuration,
  exhaleDuration,
  isActive,
}) {
  
  const chestVariants = {
    inhale: {
      scale: 1.3,
      transition: { duration: inhaleDuration, ease: "easeInOut" },
    },
    hold: {
      scale: 1.3,
      transition: { duration: holdDuration, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: exhaleDuration, ease: "easeInOut" },
    },
    inactive: {
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  // Animation variants for the shoulders
  const shouldersVariants = {
    inhale: {
      y: -10,
      transition: { duration: inhaleDuration, ease: "easeInOut" },
    },
    hold: {
      y: -10,
      transition: { duration: holdDuration, ease: "linear" },
    },
    exhale: {
      y: 0,
      transition: { duration: exhaleDuration, ease: "easeInOut" },
    },
    inactive: {
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Breathing circle indicator */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-300 bg-blue-100/30"
          animate={isActive ? breathPhase : "inactive"}
          variants={chestVariants}
        />

        {/* Avatar body */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Head */}
          <div className="w-20 h-20 bg-blue-200 rounded-full mb-2 relative">
            {/* Eyes */}
            <div className="absolute top-7 left-4 w-3 h-3 bg-blue-800 rounded-full"></div>
            <div className="absolute top-7 right-4 w-3 h-3 bg-blue-800 rounded-full"></div>

            {/* Mouth - changes with breathing */}
            <motion.div
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-800 rounded-full"
              animate={isActive ? breathPhase : "inactive"}
              variants={{
                inhale: { width: "8px", height: "8px", borderRadius: "50%" },
                hold: { width: "8px", height: "8px", borderRadius: "50%" },
                exhale: { width: "10px", height: "4px", borderRadius: "4px" },
                inactive: { width: "8px", height: "4px", borderRadius: "4px" },
              }}
            />
          </div>

          {/* Shoulders */}
          <motion.div
            className="w-40 h-6 bg-blue-300 rounded-full"
            animate={isActive ? breathPhase : "inactive"}
            variants={shouldersVariants}
          />

          {/* Torso */}
          <div className="w-32 h-40 bg-blue-300 rounded-t-3xl relative">
            {/* Chest/Lungs */}
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-200 rounded-full"
              animate={isActive ? breathPhase : "inactive"}
              variants={chestVariants}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

