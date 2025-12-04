import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const Header = ({ logoSrc, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeroInView, setIsHeroInView] = useState(true)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth <= 1024
  })
  const [showDarkOverlay, setShowDarkOverlay] = useState(false)
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Detect if hero section is in view
  useEffect(() => {
    const checkHeroInView = () => {
      if (window.innerWidth <= 768) {
        setIsHeroInView(true)
        return
      }

      const currentPath = location.pathname
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      let heroSection = null
      let isVisible = false
      
      // Determine hero section based on current page
      if (currentPath === '/') {
        // Home page - check .hero-three
        heroSection = document.querySelector('.hero-three')
      } else if (currentPath.startsWith('/work/')) {
        // Project Detail pages - check for project-hero
        heroSection = document.querySelector('.project-hero')
      } else if (currentPath === '/work') {
        // Work page - check for work-hero or use scroll position
        heroSection = document.querySelector('.work-hero')
        // If no work-hero found, use scroll position
        if (!heroSection) {
          isVisible = scrollY < windowHeight * 0.3
          setIsHeroInView(isVisible)
          return
        }
      } else if (currentPath === '/our-team') {
        // Our Team page - check .team-hero
        heroSection = document.querySelector('.team-hero')
      } else if (currentPath === '/our-service' || currentPath === '/our-feed') {
        // Pages without specific hero sections - use scroll position
        // Show hamburger when at top of page (within first viewport)
        isVisible = scrollY < windowHeight * 0.3
        setIsHeroInView(isVisible)
        return
      } else {
        // For other pages, check for any hero section
        heroSection = document.querySelector('.hero-three, .team-hero, .work-hero, .project-hero')
      }
      
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        // Check if hero section is still in view
        // Show hamburger when hero section is visible in viewport
        // Hero is in view if bottom is below 20% of viewport and top is above 80% of viewport
        isVisible = rect.bottom > windowHeight * 0.2 && rect.top < windowHeight * 0.8
        setIsHeroInView(isVisible)
      } else {
        // If no hero section found, use scroll position as fallback
        // Show hamburger when at top of page
        isVisible = scrollY < windowHeight * 0.3
        setIsHeroInView(isVisible)
      }
    }

    // Check on mount, scroll, and resize
    checkHeroInView()
    window.addEventListener('scroll', checkHeroInView, { passive: true })
    window.addEventListener('resize', checkHeroInView, { passive: true })
    
    // Small delay to ensure DOM is ready after route change
    const timeoutId = setTimeout(checkHeroInView, 100)
    const timeoutId2 = setTimeout(checkHeroInView, 300)
    
    return () => {
      window.removeEventListener('scroll', checkHeroInView)
      window.removeEventListener('resize', checkHeroInView)
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const { body } = document

    if (!body) return

    if (isMenuOpen || showDarkOverlay || isHeaderNavOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
    }
  }, [isMenuOpen, showDarkOverlay, isHeaderNavOpen])

  // Dispatch event for CustomCursor when header nav is open
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('headerNavToggle', {
      detail: { isOpen: isHeaderNavOpen }
    }))
  }, [isHeaderNavOpen])

  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    
    // Dispatch event for HeroThree to show project list on mobile
    if (window.innerWidth <= 768) {
      window.dispatchEvent(new CustomEvent('headerMenuToggle', {
        detail: { isOpen: newState }
      }))
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    
    // Dispatch event for HeroThree to close project list on mobile
    if (window.innerWidth <= 768) {
      window.dispatchEvent(new CustomEvent('headerMenuToggle', {
        detail: { isOpen: false }
      }))
    }
  }

  const handleNavClick = (event, href) => {
    event.preventDefault()
    
    // If it's a section link (starts with #), scroll to it
    if (href.startsWith('#')) {
      const sectionId = href.substring(1)
      const element = document.getElementById(sectionId)
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - 80
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      closeMenu()
    }
  }

  const resolvedLogo = logoSrc || '/assets/Images/Vultureline_img1.png'

  const defaultMenu = [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'Our Projects', href: '#projects' },
  ]

  const items = Array.isArray(menuItems) && menuItems.length ? menuItems : defaultMenu

  const handleDesktopNav = (event, href) => {
    event.preventDefault()
    
    // If it's a section link (starts with #), scroll to it
    if (href.startsWith('#')) {
      const sectionId = href.substring(1)
      const element = document.getElementById(sectionId)
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - 80
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  const handleGetInTouch = (event) => {
    event.preventDefault()
    setShowDarkOverlay(true)
    
    // Check if we're on home page
    if (location.pathname === '/') {
      // Scroll to contact section on home page
      setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - 80 // Account for header height
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
        // Hide overlay after scroll starts
        setTimeout(() => {
          setShowDarkOverlay(false)
        }, 500)
      }, 300)
    } else {
      // Navigate to contact page if not on home page
      setTimeout(() => {
        navigate('/contact')
        setShowDarkOverlay(false)
      }, 300)
    }
  }

  const handleHeaderClick = (event) => {
    // Only trigger on desktop and when clicking logo/nav area (not buttons)
    if (!isMobile && (event.target.closest('.nav-logo') || event.target.closest('.nav-brand'))) {
      setIsHeaderNavOpen(!isHeaderNavOpen)
    }
  }

  const closeHeaderNav = () => {
    setIsHeaderNavOpen(false)
  }

  const headerClasses = [
    'header',
    !isMobile ? 'header-desktop' : '',
    !isHeroInView && !isMobile ? 'header-desktop-solid' : '',
    isHeroInView ? 'header-visible' : 'header-hidden'
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClasses}>
      {/* Dark Overlay for Get In Touch */}
      {showDarkOverlay && (
        <div 
          className="dark-overlay" 
          onClick={() => setShowDarkOverlay(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9998,
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}
      
      {/* Bigger Navigation Menu when Header is clicked */}
      {isHeaderNavOpen && !isMobile && (
        <div 
          className="header-nav-overlay" 
          onClick={closeHeaderNav}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9997,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="header-nav-menu"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '3rem 4rem',
              borderRadius: '20px',
              minWidth: '400px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              animation: 'slideUp 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#181818' }}>Navigation</h2>
              <button 
                onClick={closeHeaderNav}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: '#181818',
                  padding: '0.5rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map((item, idx) => (
                <li key={`${item.label}-${idx}`} style={{ marginBottom: '1.5rem' }}>
                  <button
                    className="header-nav-link-big"
                    onClick={(e) => {
                      handleDesktopNav(e, item.href || '/')
                      closeHeaderNav()
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      color: '#181818',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      padding: '0.5rem 0',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav className="nav">
        <div className="nav-brand" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
          {!isMobile ? (
            <div className="nav-logo" style={{ cursor: 'pointer' }}>
              <img src={resolvedLogo} alt="Vulture Lines" className="logo-image" />
            </div>
          ) : (
            <Link to="/" className="nav-logo">
              <img src={resolvedLogo} alt="Vulture Lines" className="logo-image" />
            </Link>
          )}
        </div>

        {isMobile ? (
          <div className="nav-actions">
            <button
              className={`nav-circle-btn ${isHeroInView ? 'hero-in-view' : 'hero-out-of-view'}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-icon ${isMenuOpen ? 'active' : ''}`}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </span>
            </button>
          </div>
        ) : (
          <div className="nav-desktop-content">
            <div className="nav-links-desktop">
              {items.map((item, idx) => (
                <button
                  key={`${item.label}-${idx}`}
                  className="nav-desktop-link"
                  type="button"
                  onClick={(e) => handleDesktopNav(e, item.href || '/')}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="nav-cta-desktop"
              onClick={handleGetInTouch}
            >
              Get In Touch
            </button>
          </div>
        )}
      </nav>

      {isMobile && (
        <div className={`nav-overlay ${isMenuOpen ? 'nav-overlay-open' : ''}`} onClick={closeMenu}>
          <button className="nav-overlay-close" onClick={closeMenu} aria-label="Close navigation">
            V
          </button>
          <div className="nav-overlay-content" onClick={event => event.stopPropagation()}>
            <ul className="nav-menu">
              {items.map((item, idx) => (
                <li className="nav-item" key={`${item.label}-${idx}`}>
                  {typeof item.href === 'string' && item.href.startsWith('#') ? (
                    <a href={item.href} className="nav-link" onClick={closeMenu}>
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href || '/'}
                      className="nav-link"
                      onClick={(e) => handleNavClick(e, item.href || '/')}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
