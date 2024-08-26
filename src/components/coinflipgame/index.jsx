import React, { useState } from "react"
import { CoinFlip } from "../coinFlip"

export const CoinFlipGame = ({ balance }) => {
  const [betAmount, setBetAmount] = useState("")
  const [side, setSide] = useState("heads")
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const placeBet = async () => {
    setIsFlipping(true)
    setResult(null)

    try {
      // Implement bet placement and game logic here
      // For now, we'll just simulate a random result
      const randomResult = Math.random() < 0.5 ? 'heads' : 'tails'

      setResult(randomResult)
      setIsFlipping(false)
    } catch (error) {
      console.error('Error placing bet:', error)
      setIsFlipping(false)
    }
  }

  return (
    <div className="coin-flip-game">
      <h2>Coin Flip Game</h2>
      <p>Balance: {balance} ETH</p>
      <CoinFlip isFlipping={isFlipping} result={result} />
      <div className="coin-flip-controls">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Bet amount"
        />
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
        <button onClick={placeBet} disabled={isFlipping}>
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>
      </div>
      {result && (
        <p className="result">
          Result: {result} - You {result === side ? 'won' : 'lost'}!
        </p>
      )}
    </div>
  )
}