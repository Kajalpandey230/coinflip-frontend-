import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThirdwebProvider } from "@thirdweb-dev/react"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider activeChain="sepolia" clientId="8edc1095f16929f3d7f5d806f97b7630">
        <App />
    </ThirdwebProvider>
  </StrictMode>
)
