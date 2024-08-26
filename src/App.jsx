import { useState } from 'react'
import './App.css'
import { CoinFlipGame } from "./components/coinflipgame"

function App() {
  const [address, setAddress] = useState("d")
  let balance = 2

  const connectWallet = async () => {}

  return (
    <>
      {address ? (
        <div>
          <CoinFlipGame balance={balance} />
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </>
  )
}

export default App
