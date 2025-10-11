import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-200 text-white font-sans p-5">

      {/* Header with float animation */}
      <h1 className="text-5xl font-bold mb-2 animate-bounce drop-shadow-lg text-[#002f6c]">
        AI EXPENSE TRACKER
      </h1>
      <h2 className="text-2xl mb-8 text-[black] animate-pulse">
        Team ZENITSU
      </h2>

      {/* Info Card with hover scale & shadow */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-lg text-center max-w-md 
                      transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/30">
        <p className="text-xl mb-4 font-medium text-[black] animate-pulse">
          CODEZAP Hackathon October-2025
        </p>
        <p className="mb-6 text-[#002f6c]">
          Build smarter, track faster, manage better!
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-[#1791f3] text-white font-bold px-6 py-2 rounded-full 
                     hover:bg-[#002f6c] hover:text-cyan-300 transition-colors duration-300 transform hover:scale-110"
        >
          Click Me! ({count})
        </button>
      </div>

      {/* Footer with subtle fade-in */}
      <p className="mt-10 text-sm opacity-80 text-[#002f6c] animate-fadeIn">
        Made with ❤️ by Team ZENITSU
      </p>
    </div>
  )
}

export default App
