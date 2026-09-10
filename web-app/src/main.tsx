import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { removePrerenderedHeadMetadata } from './utils/prerenderMetadata.ts'

// A production snapshot contains route metadata for crawlers. React 19 manages
// the live equivalents, so release only the marked snapshot nodes before mount.
removePrerenderedHeadMetadata()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
