import React from 'react'

const sections = [
  {
    key: 'home',
    title: 'Home',
    description: 'Manage hero, excellence, capabilities, and latest highlights showcased on the landing page.',
  },
  {
    key: 'our-service',
    title: 'Our Service',
    description: 'Update service cards, 3D carousel content, and project showcases featured on the services page.',
  },
  {
    key: 'our-feed',
    title: 'Our Feed',
    description: 'Curate vibes, highlights, and articles to keep the feed fresh and relevant.',
  },
]

const AdminDashboard = ({ onLogout, onNavigate }) => {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-dashboard-eyebrow">Admin Panel</p>
          <h1>Welcome back, Admin</h1>
          <p className="admin-dashboard-subtitle">
            Choose a category to begin updating site content.
          </p>
        </div>
        <button className="admin-secondary-btn" onClick={onLogout}>
          Log out
        </button>
      </header>

      <section className="admin-dashboard-grid">
        {sections.map((section) => (
          <article key={section.key} className="admin-dashboard-card">
            <div className="admin-card-badge">{section.title[0]}</div>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <button
              className="admin-card-action"
              type="button"
              onClick={() => onNavigate(section.key)}
            >
              Open {section.title}
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

export default AdminDashboard


