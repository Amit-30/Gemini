import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AiContextProvider from './context/AIContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AiContextProvider>
    <App />
    </AiContextProvider>
  </StrictMode>,
)
