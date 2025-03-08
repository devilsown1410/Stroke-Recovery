import BreathingExercise from "../components/BreathingExercise"

export default function Breathing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-teal-50">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-900">15-Minute Breathing Exercise</h1>
        <p className="text-center text-blue-700 mb-8">Follow the avatar and breathe along with the animation</p>
        <BreathingExercise />
      </div>
    </main>
  )
}

