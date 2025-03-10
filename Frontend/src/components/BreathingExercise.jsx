
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import BreathingAvatar from "./BreathingAvatar";
import Timer from "@/components/timer"

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
  const [breathPhase, setBreathPhase] = useState("inhale")
  const [breathCount, setBreathCount] = useState(0)

  const breathCycleRef = useRef(null)
  const timerRef = useRef(null)

  // Breathing cycle timing (in seconds)
  const inhaleDuration = 4
  const holdDuration = 2
  const exhaleDuration = 6
  const cycleDuration = inhaleDuration + holdDuration + exhaleDuration

  // Start or pause the exercise
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  // Reset the exercise
  const resetExercise = () => {
    setIsActive(false)
    setTimeRemaining(15 * 60)
    setBreathPhase("inhale")
    setBreathCount(0)

    if (breathCycleRef.current) {
      clearTimeout(breathCycleRef.current)
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Handle breath cycle
  useEffect(() => {
    if (!isActive) return

    const cycleBreath = () => {
      const elapsedInCycle = breathCount % cycleDuration

      if (elapsedInCycle < inhaleDuration) {
        setBreathPhase("inhale")
      } else if (elapsedInCycle < inhaleDuration + holdDuration) {
        setBreathPhase("hold")
      } else {
        setBreathPhase("exhale")
      }

      setBreathCount((prev) => prev + 1)

      breathCycleRef.current = setTimeout(cycleBreath, 1000)
    }

    breathCycleRef.current = setTimeout(cycleBreath, 1000)

    return () => {
      if (breathCycleRef.current) {
        clearTimeout(breathCycleRef.current)
      }
    }
  }, [isActive, breathCount])

  // Handle timer countdown
  useEffect(() => {
    if (!isActive) return

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive])

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <Timer timeRemaining={timeRemaining} />

        <div className="my-8 relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={breathPhase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-medium text-blue-800 bg-blue-100/80 px-6 py-2 rounded-full"
              >
                {breathPhase === "inhale" ? "Inhale" : breathPhase === "hold" ? "Hold" : "Exhale"}
              </motion.div>
            </AnimatePresence>
          </div>

          <BreathingAvatar
            breathPhase={breathPhase}
            inhaleDuration={inhaleDuration}
            holdDuration={holdDuration}
            exhaleDuration={exhaleDuration}
            isActive={isActive}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button onClick={toggleActive} className="px-6" variant={isActive ? "outline" : "default"}>
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button onClick={resetExercise} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}

