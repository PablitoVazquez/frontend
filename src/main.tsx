import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import AdRouter from './adrouter'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router/>
  </StrictMode>,
)
