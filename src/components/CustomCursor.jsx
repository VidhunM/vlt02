import React, { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isInClientSection, setIsInClientSection] = useState(false)

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

  return (
    <div
      className={`custom-cursor ${isHovering || isInClientSection ? 'hover' : ''} ${isInClientSection ? 'client-section' : ''}`}
      style={{
        left: `${position.x - (isInClientSection ? 30 : 10)}px`,
        top: `${position.y - (isInClientSection ? 30 : 10)}px`,
      }}
    >
      {isInClientSection && <span className="cursor-text">click</span>}
    </div>
  )
}

export default CustomCursor
