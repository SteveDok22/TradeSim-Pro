import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Trade from './pages/Trade'
import Positions from './pages/Positions'
import History from './pages/History'
import { useAuth } from './context/AuthContext'
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <div className="loading">Loading...</div>
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const { loading } = useAuth()

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/trade" element={<ProtectedRoute><Trade /></ProtectedRoute>} />
          <Route path="/positions" element={<ProtectedRoute><Positions /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default App