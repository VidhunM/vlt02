import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const MinimalistNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('HOME')
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isFlowFooterVisible, setIsFlowFooterVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Show 4 menu items that scroll to home sections
  const menuItems = [
    { name: 'HOME', sectionId: 'home' },
    { name: 'OUR SERVICE', sectionId: 'services' },
    { name: 'OUR PROJECTS', sectionId: 'projects' },
    { name: 'CONTACT', sectionId: 'contact' }
  ]

  // Function to detect which section is currently in view on Home page
  const getActiveSectionOnHome = () => {
    const sections = [
      { id: 'home', element: document.querySelector('.hero-three') },
      { id: 'services', element: document.querySelector('#services') },
      { id: 'projects', element: document.querySelector('#projects') },
      { id: 'feed', element: document.querySelector('#feed') },
      { id: 'contact', element: document.querySelector('#contact') }
    ]

    const scrollPosition = window.scrollY + window.innerHeight / 3
    let activeSection = 'home'

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      if (section.element) {
        const rect = section.element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          activeSection = section.id
          break
        }
        else if (scrollPosition > elementTop) {
          activeSection = section.id
        }
      }
    }
    
    return activeSection
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = location.pathname
      
      // Only show nav on home page
      if (currentPath !== '/') {
        setIsVisible(false)
        return
      }
      
      let heroSection = document.querySelector('.hero-three')
      
      const currentScrollY = window.scrollY
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollY(currentScrollY)
      
      // Show nav when scrolled past hero section
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        
        if (currentScrollY > heroHeight * 0.8) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      // Update active section based on scroll position
      const currentActiveSection = getActiveSectionOnHome()
      const sectionNameMap = {
        'home': 'HOME',
        'services': 'OUR SERVICE',
        'projects': 'OUR PROJECTS',
        'feed': 'OUR PROJECTS',
        'contact': 'CONTACT'
      }
      setActiveSection(sectionNameMap[currentActiveSection] || 'HOME')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, location.pathname])

  // Ensure nav visibility/active state updates when route changes
  useEffect(() => {
    const currentPath = location.pathname

    // Only show on home page
    if (currentPath === '/') {
      const section = getActiveSectionOnHome()
      const sectionNameMap = {
        'home': 'HOME',
        'services': 'OUR SERVICE',
        'projects': 'OUR PROJECTS',
        'feed': 'OUR PROJECTS',
        'contact': 'CONTACT'
      }
      setActiveSection(sectionNameMap[section] || 'HOME')
    } else {
      setIsVisible(false)
      setActiveSection('HOME')
    }
  }, [location.pathname])

  useEffect(() => {
    const handleFlowVisibility = (event) => {
      setIsFlowFooterVisible(Boolean(event.detail?.visible))
    }

    window.addEventListener('flowAnimationVisibility', handleFlowVisibility)

    return () => {
      window.removeEventListener('flowAnimationVisibility', handleFlowVisibility)
    }
  }, [])

  const handleNavClick = (event, item) => {
    event.preventDefault()
    
    // Only scroll to sections on home page
    const currentPath = window.location.pathname
    
    if (currentPath !== '/') {
      // If not on home page, navigate to home first
      navigateWithCircle(event, '/', () => {
        navigate('/')
        setActiveSection('HOME')
      })
      return
    }

    // On home page, scroll to section
    const sectionMap = {
      'HOME': '.hero-three',
      'OUR SERVICE': '#services',
      'OUR PROJECTS': '#projects',
      'CONTACT': '#contact'
    }
    
    const selector = sectionMap[item.name]
    if (selector) {
      const element = document.querySelector(selector)
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - 80 // Account for nav height
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Update active section immediately
        setActiveSection(item.name)
      }
    }
  }

  const navClasses = [
    'minimalist-nav',
    isVisible ? 'visible' : '',
    scrollDirection === 'up' ? 'slide-up' : 'slide-down',
    isFlowFooterVisible ? 'flow-hidden' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={navClasses}>
      <div className="minimalist-nav-container">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${activeSection === item.name ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, item)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MinimalistNav
