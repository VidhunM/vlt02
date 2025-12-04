import React, { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isInClientSection, setIsInClientSection] = useState(false)
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false)

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Check if cursor is over CLIENT EXPERIENCE section
      const clientSection = document.querySelector('.client-experience-section')
      if (clientSection) {
        const rect = clientSection.getBoundingClientRect()
        const isInside = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        )
        setIsInClientSection(isInside)
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners
    document.addEventListener('mousemove', updateCursor)
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .nav-link')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Listen for header nav toggle events
  useEffect(() => {
    const handleHeaderNavToggle = (event) => {
      setIsHeaderNavOpen(Boolean(event.detail?.isOpen))
    }
    window.addEventListener('headerNavToggle', handleHeaderNavToggle)
    return () => {
      window.removeEventListener('headerNavToggle', handleHeaderNavToggle)
    }
  }, [])

  const cursorSize = isHeaderNavOpen ? 80 : (isInClientSection ? 60 : 16)
  const offset = isHeaderNavOpen ? 40 : (isInClientSection ? 30 : 10)

  return (
    <div
      className={`custom-cursor ${isHovering || isInClientSection || isHeaderNavOpen ? 'hover' : ''} ${isInClientSection ? 'client-section' : ''} ${isHeaderNavOpen ? 'header-nav-open' : ''}`}
      style={{
        left: `${position.x - offset}px`,
        top: `${position.y - offset}px`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
      }}
    >
      {(isInClientSection || isHeaderNavOpen) && <span className="cursor-text">{isHeaderNavOpen ? 'nav' : 'click'}</span>}
    </div>
  )
}

export default CustomCursor
