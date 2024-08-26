import React, { useState } from "react"
import { CoinFlip } from "../coinflip"

export const CoinFlipGame = ({ contract, balance, updateBalance }) => {
  const [betAmount, setBetAmount] = useState("")
  const [side, setSide] = useState("heads")
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const placeBet = async () => {
    if (!contract || !betAmount) return

    setIsFlipping(true)
    setResult(null)

    try {
      const betAmountWei = ethers.utils.parseEther(betAmount)

      // Check if user has enough balance
      if (betAmountWei.gt(balance)) {
        alert("Insufficient balance")
        setIsLoading(false)
        return
      }

      // Call the smart contract's flip function
      const tx = await contract.flip(side === 'heads', {
        value: betAmountWei,
        gasLimit: 100000 // Adjust as needed
      })

      // Wait for the transaction to be mined
      await tx.wait()

      const randomResult = Math.random() < 0.5 ? 'heads' : 'tails'

      await updateBalance()
      setResult(randomResult)
    } catch (error) {
      console.error('Error placing bet:', error)
    } finally {
      setIsFlipping(false)
    }
  }

  return (
    <div className="coin-flip-game">
      <h2>Coin Flip Game</h2>
      <p>Balance: {ethers.utils.formatEther(balance)} ETH</p>
      <CoinFlip isFlipping={isFlipping} result={result} />
      <div className="coin-flip-controls">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Bet amount"
          disabled={isFlipping}
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
        <>
          <p className="result">
            Result: {result} - You {result === side ? 'won' : 'lost'}!
          </p>
          {result === side ? (
            <p>You received ${ethers.utils.formatEther(ethers.utils.parseEther(betAmount).mul(2))} ETH</p>
          ) : (
            <p>You lost ${ethers.utils.formatEther(ethers.utils.parseEther(betAmount))} ETH</p>
          )}
        </>
      )}
    </div>
  )
}