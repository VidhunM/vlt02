import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import OurTeam from './pages/OurTeam'
import Contact from './pages/Contact'
import AdminApp from './pages/admin/AdminApp'
import CustomCursor from './components/CustomCursor'
import CircleTransition from './components/CircleTransition'
import OurService from './pages/OurService'
import OurFeed from './pages/OurFeed'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <CustomCursor />
        <CircleTransition />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:projectId" element={<ProjectDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/our-service" element={<OurService />} />
            <Route path="/our-feed" element={<OurFeed />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminApp />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
