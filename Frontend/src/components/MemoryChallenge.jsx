"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle, Trophy, Clock3 } from "lucide-react"
import MemoryCard from "./MemoryCard"
import confetti from "canvas-confetti"

// Card symbols - using emoji for simplicity
const cardSymbols = ["🚀", "🌟", "🎮", "🎨", "🎵", "🏆", "🍕", "🌈", "🐱", "🐶", "🌺", "🍦"]

// Create pairs of cards
const createCards = () => {
  // Duplicate each symbol to create pairs
  const pairs = [...cardSymbols, ...cardSymbols]

  // Shuffle the array
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }))
}

export default function MemoryChallenge() {
  const [cards, setCards] = useState(createCards())
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timer, setTimer] = useState(0)

  // Start a new game
  const startNewGame = () => {
    setCards(createCards())
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setGameStarted(true)
    setGameCompleted(false)
    setTimer(0)
  }

  // Handle card click
  const handleCardClick = (id) => {
    // Ignore clicks if two cards are already flipped or the card is already flipped/matched
    if (flippedCards.length >= 2) return
    if (cards[id].isFlipped || cards[id].isMatched) return

    // Flip the card
    const updatedCards = [...cards]
    updatedCards[id].isFlipped = true
    setCards(updatedCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards

      if (cards[firstId].symbol === cards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstId].isMatched = true
          matchedCards[secondId].isMatched = true
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Check if all pairs are matched
          if (matchedPairs + 1 === cardSymbols.length) {
            setGameCompleted(true)
            setGameStarted(false)
            // Trigger confetti effect
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }
        }, 600)
      } else {
        // No match
        setTimeout(() => {
          const unflippedCards = [...cards]
          unflippedCards[firstId].isFlipped = false
          unflippedCards[secondId].isFlipped = false
          setCards(unflippedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Timer effect
  useEffect(() => {
    let interval
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="p-6 shadow-lg bg-white">
      <div className="flex flex-col items-center">
        {/* Game stats */}
        <div className="w-full flex justify-between mb-6">
          <div className="flex items-center gap-2 text-indigo-700">
            <Clock3 className="h-5 w-5" />
            <span className="font-mono text-lg">{formatTime(timer)}</span>
          </div>

          <div className="flex items-center gap-2 text-indigo-700">
            <Trophy className="h-5 w-5" />
            <span className="font-mono text-lg">
              {matchedPairs}/{cardSymbols.length} Pairs
            </span>
          </div>

          <div className="text-indigo-700 font-mono text-lg">Moves: {moves}</div>
        </div>

        {/* Game board */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6 w-full max-w-3xl">
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              symbol={card.symbol}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>

        {/* Game controls */}
        <Button onClick={startNewGame} className="px-6" size="lg">
          <Shuffle className="mr-2 h-4 w-4" />
          {gameStarted ? "Restart Game" : "Start New Game"}
        </Button>

        {/* Game completion message */}
        {gameCompleted && (
          <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Congratulations! 🎉</h3>
            <p className="text-indigo-700">
              You completed the challenge in {moves} moves and {formatTime(timer)}!
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

