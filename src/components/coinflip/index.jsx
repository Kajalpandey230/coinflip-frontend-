import React from "react"
import "./styles.css"

export const CoinFlip = ({ isFlipping, result }) => {
  return (
    <div className={`coin ${isFlipping ? 'flipping' : result || ''}`}>
      <div className="coin-face heads">H</div>
      <div className="coin-face tails">T</div>
    </div>
  );
}