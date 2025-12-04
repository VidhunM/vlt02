import React, { useState, useEffect, useRef } from 'react'

const CircleTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [circleStyle, setCircleStyle] = useState({})
  const [pendingNavigation, setPendingNavigation] = useState(null)
  const [circleColor, setCircleColor] = useState('#ff6b35')
  const [circleSize, setCircleSize] = useState(200)
  const containerRef = useRef(null)

  // Calculate circle size based on viewport to ensure full coverage
  useEffect(() => {
    const calculateCircleSize = () => {
      const vw = window.innerWidth || document.documentElement.clientWidth
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Use the diagonal of the viewport to ensure full coverage
      const diagonal = Math.sqrt(vw * vw + vh * vh)
      // Add extra padding to ensure complete coverage on all devices, especially mobile
      const size = Math.ceil(diagonal * 2) // Increased multiplier for better mobile coverage
      setCircleSize(Math.max(size, 2000)) // Minimum size to ensure coverage
    }

    // Calculate immediately
    calculateCircleSize()
    
    // Recalculate on resize and orientation change (important for mobile)
    window.addEventListener('resize', calculateCircleSize)
    window.addEventListener('orientationchange', calculateCircleSize)
    
    return () => {
      window.removeEventListener('resize', calculateCircleSize)
      window.removeEventListener('orientationchange', calculateCircleSize)
    }
  }, [])

  useEffect(() => {
    // Listen for custom navigation events
    const handleCircleNavigation = (event) => {
      const { x, y, href, callback, color = '#ff6b35' } = event.detail
      
      // Recalculate circle size for mobile responsiveness
      const vw = window.innerWidth || document.documentElement.clientWidth
      const vh = window.innerHeight || document.documentElement.clientHeight
      const diagonal = Math.sqrt(vw * vw + vh * vh)
      const size = Math.ceil(diagonal * 2) // Increased multiplier for better mobile coverage
      setCircleSize(Math.max(size, 2000)) // Minimum size to ensure coverage
      
      // Set circle color
      setCircleColor(color)
      
      // Set circle position and start animation
      setCircleStyle({
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%) scale(0)'
      })
      
      setIsAnimating(true)
      setPendingNavigation({ href, callback })
      
      // Trigger expand animation after a brief delay
      setTimeout(() => {
        setCircleStyle(prev => ({
          ...prev,
          transform: 'translate(-50%, -50%) scale(1)'
        }))
      }, 10)
      
      // Navigate after animation completes
      setTimeout(() => {
        if (callback) {
          callback()
        } else if (href) {
          window.location.href = href
        }
      }, 800) // Match animation duration
      
      // Reset after navigation - longer delay for mobile
      setTimeout(() => {
        setIsAnimating(false)
        setPendingNavigation(null)
        setCircleStyle({})
      }, 1200) // Increased delay for mobile devices
    }

    window.addEventListener('circleNavigation', handleCircleNavigation)
    
    return () => {
      window.removeEventListener('circleNavigation', handleCircleNavigation)
    }
  }, [])

  if (!isAnimating) return null

  return (
    <div 
      ref={containerRef}
      className="circle-transition"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw', // Dynamic viewport width for mobile
        height: '100dvh', // Dynamic viewport height for mobile
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div 
        className="circle-transition-inner"
        style={{
          position: 'absolute',
          ...circleStyle,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          minWidth: `${circleSize}px`,
          minHeight: `${circleSize}px`,
          borderRadius: '50%',
          background: circleColor,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformOrigin: 'center center',
          WebkitTransformOrigin: 'center center',
          msTransformOrigin: 'center center'
        }}
      />
    </div>
  )
}

export default CircleTransition
