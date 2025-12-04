import React, { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminServiceManager from './AdminServiceManager'
import AdminFeedManager from './AdminFeedManager'
import '../../styles/admin.css'

const DEFAULT_ADMIN = {
  email: 'admin@vulturelines.com',
  password: 'admin123',
}

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')

  const handleLogin = ({ email, password }) => {
    const match =
      email.trim().toLowerCase() === DEFAULT_ADMIN.email &&
      password === DEFAULT_ADMIN.password

    if (match) {
      setIsAuthenticated(true)
      setActiveView('dashboard')
      return true
    }

    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveView('dashboard')
  }

  const handleNavigate = (viewKey) => {
    setActiveView(viewKey)
  }

  return (
    <div className="admin-root">
      <div className="admin-shell">
        {isAuthenticated ? (
          activeView === 'our-service' ? (
            <AdminServiceManager onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'our-feed' ? (
            <AdminFeedManager onBack={() => setActiveView('dashboard')} />
          ) : (
            <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigate} />
          )
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  )
}

export default AdminApp


