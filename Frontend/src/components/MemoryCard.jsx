
import { motion } from "framer-motion"


export default function MemoryCard({ symbol, isFlipped, isMatched, onClick }) {
  return (
    <div className="aspect-square relative cursor-pointer" onClick={onClick}>
      <motion.div
        className="w-full h-full rounded-lg absolute backface-hidden"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          opacity: isMatched ? 0.7 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card back */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
          <div className="text-white text-2xl font-bold">?</div>
        </div>
      </motion.div>

      <motion.div
        className="w-full h-full rounded-lg absolute backface-hidden"
        animate={{
          rotateY: isFlipped ? 0 : -180,
          opacity: isMatched ? 0.7 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
          rotateY: -180,
        }}
      >
        {/* Card front */}
        <div
          className={`absolute inset-0 rounded-lg bg-white border-2 ${isMatched ? "border-green-400" : "border-indigo-200"} flex items-center justify-center shadow-md`}
        >
          <div className="text-4xl">{symbol}</div>
        </div>
      </motion.div>
    </div>
  )
}

