import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './component/App'
import Ftr from './component/Ftr'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Ftr/>
  </StrictMode>,
)
