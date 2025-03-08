import MemoryChallenge from "../components/MemoryChallenge"

export default function MemoryMatching() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-indigo-900">Memory Challenge</h1>
        <p className="text-center text-indigo-700 mb-8">Match pairs of cards to improve your memory and recall</p>
        <MemoryChallenge />
      </div>
    </main>
  )
}

