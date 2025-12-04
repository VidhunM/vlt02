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
      } else if (currentPath === '/contact') {
        // Contact page - use scroll position since .contact-page-dark is entire page
        isVisible = scrollY < windowHeight * 0.3
        setIsHeroInView(isVisible)
        return
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

    if (isMenuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
    }
  }, [isMenuOpen])

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
    closeMenu()
    navigateWithCircle(event, href, () => {
      navigate(href)
    })
  }

  const resolvedLogo = logoSrc || '/assets/Images/Vultureline_img1.png'

  const defaultMenu = [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/our-service' },
    { label: 'Our Projects', href: '/work' }
  ]

  const items = Array.isArray(menuItems) && menuItems.length ? menuItems : defaultMenu

  const handleDesktopNav = (event, href) => {
    event.preventDefault()
    navigateWithCircle(event, href, () => {
      navigate(href)
    })
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
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            <img src={resolvedLogo} alt="Vulture Lines" className="logo-image" />
          </Link>
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
              onClick={(e) => handleDesktopNav(e, '/contact')}
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
