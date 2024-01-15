import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './pages/rotasProtegidas/AuthProvider.tsx'
import { FinanceProvider } from './pages/rotasProtegidas/FinanceProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FinanceProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FinanceProvider>
  </React.StrictMode>,
)
