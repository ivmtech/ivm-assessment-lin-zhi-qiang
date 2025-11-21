import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import PurchasePage from './pages/PurchasePage'
import './index.css'

function App(){
  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">🛒</span>
                </div>
                <h1 className="text-2xl font-bold text-white text-shadow-lg">Vending Machine</h1>
              </div>
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/"
                  className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm"
                >
                  🏪 Products
                </Link>
                <Link
                  to="/purchase"
                  className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm"
                >
                  📋 History
                </Link>
              </div>
            </div>
           
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsPage/>}/>
        <Route path="/purchase" element={<PurchasePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App/>)
