import { useState } from 'react'
import './App.css'

function App() {
  const [address, setAddress] = useState("d")
  let balance = 2

  const connectWallet = async () => {}

  return (
    <>
      {address ? (
        <div>
          coinPlip
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </>
  )
}

export default App
