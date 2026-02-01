import { useState, useEffect, useCallback } from 'react'

const CONTRACT = "H74CYmXgMkYHYuSRsZt6RJb4NYp2u72Vw8BS5huApump"

const ROASTS = [
  "PAPER HANDS DETECTED 📄🙌",
  "SOLD AT THE BOTTOM LMAOOO",
  "NGMI ENERGY IS STRONG",
  "JEETS GONNA JEET 💀",
  "THANKS FOR THE CHEAP BAGS",
  "WEAK HANDS = WEAK GAINS",
  "SOLD? SEE YOU AT 100X 👋",
  "IMAGINE SELLING HERE 🤡",
  "JEET NOW, CRY LATER",
  "PAPER HANDED LOSER ALERT",
  "YOU SOLD? WE PUMPING NOW",
  "SELLERS GET REKT",
  "HOW DOES REGRET TASTE?",
  "PANIC SOLD? LMAOOO 😂😂😂",
  "JEETERS IN SHAMBLES",
]

const MOCK_SELLERS = [
  { wallet: "7xK4...mNpQ", amount: "420,690", timeAgo: "2m ago" },
  { wallet: "Dg8J...xWvR", amount: "1,337,000", timeAgo: "5m ago" },
  { wallet: "Qm3P...bYzL", amount: "69,420", timeAgo: "8m ago" },
  { wallet: "Hj9X...cRtK", amount: "999,999", timeAgo: "12m ago" },
  { wallet: "Nx2W...pQsM", amount: "2,500,000", timeAgo: "15m ago" },
]

interface FloatingEmoji {
  id: number
  x: number
  y: number
  size: number
  delay: number
  tx: number
  ty: number
  rot: number
  duration: number
}

interface Seller {
  wallet: string
  amount: string
  timeAgo: string
}

function App() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([])
  const [currentRoast, setCurrentRoast] = useState(0)
  const [sellers, setSellers] = useState<Seller[]>(MOCK_SELLERS)
  const [laughCount, setLaughCount] = useState(42069)
  const [isShaking, setIsShaking] = useState(false)

  const generateEmoji = useCallback((): FloatingEmoji => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 2,
    tx: (Math.random() - 0.5) * 200,
    ty: -200 - Math.random() * 300,
    rot: (Math.random() - 0.5) * 720,
    duration: 3 + Math.random() * 2,
  }), [])

  useEffect(() => {
    const initialEmojis = Array.from({ length: 20 }, generateEmoji)
    setEmojis(initialEmojis)

    const interval = setInterval(() => {
      setEmojis(prev => [...prev.slice(-30), generateEmoji()])
    }, 300)

    return () => clearInterval(interval)
  }, [generateEmoji])

  useEffect(() => {
    const roastInterval = setInterval(() => {
      setCurrentRoast(prev => (prev + 1) % ROASTS.length)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }, 3000)

    return () => clearInterval(roastInterval)
  }, [])

  useEffect(() => {
    const countInterval = setInterval(() => {
      setLaughCount(prev => prev + Math.floor(Math.random() * 10))
    }, 100)

    return () => clearInterval(countInterval)
  }, [])

  useEffect(() => {
    const sellerInterval = setInterval(() => {
      const newSeller: Seller = {
        wallet: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
        amount: Math.floor(Math.random() * 5000000).toLocaleString(),
        timeAgo: "just now"
      }
      setSellers(prev => [newSeller, ...prev.slice(0, 4)])
    }, 8000)

    return () => clearInterval(sellerInterval)
  }, [])

  const handleLaugh = () => {
    setLaughCount(prev => prev + 100)
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none" />
      
      {/* Floating emojis background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {emojis.map(emoji => (
          <div
            key={emoji.id}
            className="absolute text-4xl"
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
              fontSize: `${emoji.size}px`,
              '--tx': `${emoji.tx}px`,
              '--ty': `${emoji.ty}px`,
              '--rot': `${emoji.rot}deg`,
              animation: `float-random ${emoji.duration}s ease-out forwards`,
              animationDelay: `${emoji.delay}s`,
            } as React.CSSProperties}
          >
            😂
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4 text-center">
          <div className={`${isShaking ? 'animate-shake' : ''}`}>
            <h1 className="font-bangers text-6xl md:text-8xl lg:text-9xl text-white text-stroke animate-pulse-glow tracking-wider">
              LMAO JEETERS
            </h1>
            <div className="flex justify-center gap-2 mt-4">
              {['😂', '🤣', '😂', '🤣', '😂'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-4xl md:text-6xl animate-bounce-crazy"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Roast banner */}
        <div className="bg-black/80 py-4 border-y-4 border-yellow-400 overflow-hidden">
          <div className={`text-center ${isShaking ? 'animate-shake' : ''}`}>
            <p className="font-marker text-2xl md:text-4xl animate-rainbow">
              {ROASTS[currentRoast]}
            </p>
          </div>
        </div>

        {/* Main section */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Laughing at coin */}
            <div className="bg-black/70 rounded-3xl p-6 border-4 border-yellow-400 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="inline-block animate-spin-slow">
                  <span className="text-8xl md:text-9xl">😂</span>
                </div>
              </div>
              
              <h2 className="font-bangers text-3xl text-yellow-400 text-center mb-4">
                LAUGHING AT SELLERS OF:
              </h2>
              
              <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-4 border-2 border-red-500">
                <p className="font-mono text-xs md:text-sm text-yellow-300 break-all text-center animate-wiggle">
                  {CONTRACT}
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleLaugh}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bangers text-2xl md:text-3xl px-8 py-4 rounded-full transform hover:scale-110 transition-all duration-200 border-4 border-black shadow-[0_6px_0_0_#000] active:shadow-[0_2px_0_0_#000] active:translate-y-1"
                >
                  😂 LAUGH AT JEETS 😂
                </button>
                <p className="mt-4 font-marker text-xl text-white">
                  Total Laughs: <span className="text-yellow-400 animate-pulse">{laughCount.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Right - Recent sellers feed */}
            <div className="bg-black/70 rounded-3xl p-6 border-4 border-red-500 backdrop-blur-sm">
              <h2 className="font-bangers text-3xl text-red-500 text-center mb-6 flex items-center justify-center gap-2">
                <span className="animate-bounce">🚨</span>
                JEET FEED
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🚨</span>
              </h2>
              
              <div className="space-y-4">
                {sellers.map((seller, index) => (
                  <div
                    key={`${seller.wallet}-${index}`}
                    className="roast-card bg-gradient-to-r from-red-900/80 to-orange-900/80 rounded-xl p-4 border-2 border-yellow-500/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-mono text-yellow-400 text-sm">{seller.wallet}</p>
                        <p className="text-white font-bold">{seller.amount} tokens</p>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl animate-bounce-crazy">😂</span>
                        <p className="text-gray-400 text-xs">{seller.timeAgo}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-orange-300 font-marker">
                      {ROASTS[Math.floor(Math.random() * ROASTS.length)]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'JEETS REKT', value: '69,420', emoji: '💀' },
              { label: 'PAPER HANDS', value: '1,337', emoji: '📄' },
              { label: 'WEAK SELLERS', value: '42,069', emoji: '🤡' },
              { label: 'COPIUM LEVEL', value: 'MAX', emoji: '😤' },
            ].map((stat, i) => (
              <div 
                key={stat.label}
                className="bg-black/60 rounded-2xl p-4 border-2 border-yellow-400/50 text-center backdrop-blur-sm transform hover:scale-105 transition-transform"
              >
                <span className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{stat.emoji}</span>
                <p className="font-bangers text-2xl md:text-3xl text-yellow-400 mt-2">{stat.value}</p>
                <p className="text-white/80 text-sm font-marker">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom message */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-black/80 rounded-2xl px-8 py-4 border-4 border-yellow-400">
              <p className="font-bangers text-2xl md:text-4xl text-white">
                HODL OR GET <span className="animate-rainbow">LAUGHED AT</span> 😂
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center">
          <p className="text-white/40 text-xs font-mono">
            Requested by @dadonpump · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App