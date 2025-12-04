import React, { useState } from 'react'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = onLogin({ email, password })
    if (!success) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="admin-auth-card">
      <div className="admin-auth-header">
        <h1>Admin Portal</h1>
        <p>Sign in to manage site content.</p>
      </div>

      <form className="admin-auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@vulturelines.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>

        {error && <div className="admin-auth-error">{error}</div>}

        <button type="submit" className="admin-primary-btn">
          Sign In
        </button>
      </form>

      <div className="admin-auth-footer">
        <small>Default credentials: admin@vulturelines.com / admin123</small>
      </div>
    </div>
  )
}

export default AdminLogin


