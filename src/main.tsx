import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pinicio.css'
import App from './pinicio.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
