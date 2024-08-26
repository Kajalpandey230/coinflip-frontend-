import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import CoinFlipGame from './components/CoinFlipGame'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config'

function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
      })
      
      const instance = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(instance)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      
      setProvider(provider)
      setSigner(signer)
      setAddress(address)

      // Listen for account changes
      instance.on("accountsChanged", (accounts) => {
        setAddress(accounts[0])
      })

    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const updateBalance = async () => {
    if (provider && address) {
      try {
        const newBalance = await provider.getBalance(address)
        setBalance(newBalance)
      } catch (error) {
        console.error("Failed to update balance:", error)
      }
    }
  }

  useEffect(() => {
    const initializeContract = async () => {
      if (provider && signer) {
        try {
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
          setContract(contract)

          const balance = await provider.getBalance(address)
          setBalance(balance)

          // Listen for balance changes
          provider.on(address, (newBalance) => {
            setBalance(newBalance)
          })

        } catch (error) {
          console.error("Failed to initialize contract:", error)
        }
      }
    }

    initializeContract()

    // Cleanup function
    return () => {
      if (provider) {
        provider.removeAllListeners()
      }
    }
  }, [provider, signer, address])

  return (
    <>
      {address ? (
        <CoinFlipGame contract={contract} balance={balance} updateBalance={updateBalance} />
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </>
  )
}

export default App