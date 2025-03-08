
export default function Timer({ timeRemaining }) {
  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  // Format time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Calculate progress percentage
  const progressPercent = (timeRemaining / (15 * 60)) * 100

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-blue-800">Time Remaining</h2>
        <span className="text-2xl font-bold text-blue-900 font-mono">{formattedTime}</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}

