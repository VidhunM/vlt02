import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const FlowAnimation = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const handleFooterNavClick = (event, path) => {
    navigateWithCircle(event, path, () => {
      navigate(path)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

      let animationFrameId = null
      let lastScrollY = window.scrollY
      let isAnimating = false
      let hasAnimated = false // Track if animation has played

    const drawRectangle = (ctx, width, height, progress) => {
      const padding = 20
      const rectX = padding
      const rectY = padding
      const rectWidth = width - padding * 2
      const rectHeight = height - padding * 2

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set line style
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Easing function for smooth animation
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }
      const easedProgress = easeInOutCubic(progress)

      // Draw initial half rectangle (top half: top horizontal line and left/right vertical lines down to middle)
      // Top horizontal line - always visible
      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX + rectWidth, rectY)
      ctx.stroke()

      // Left vertical line down to middle - always visible
      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX, rectY + rectHeight / 2)
      ctx.stroke()

      // Right vertical line down to middle - always visible
      ctx.beginPath()
      ctx.moveTo(rectX + rectWidth, rectY)
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight / 2)
      ctx.stroke()

      // Animate left vertical line completion (from middle to bottom)
      const leftLineProgress = Math.min(easedProgress * 2, 1) // Completes at 50% of animation
      if (leftLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX, rectY + rectHeight / 2)
        ctx.lineTo(rectX, rectY + rectHeight / 2 + (rectHeight / 2) * leftLineProgress)
        ctx.stroke()
      }

      // Animate right vertical line completion (from middle to bottom)
      const rightLineProgress = Math.min(easedProgress * 2, 1) // Completes at 50% of animation
      if (rightLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX + rectWidth, rectY + rectHeight / 2)
        ctx.lineTo(rectX + rectWidth, rectY + rectHeight / 2 + (rectHeight / 2) * rightLineProgress)
        ctx.stroke()
      }

      // Animate bottom horizontal line (from left to right)
      const bottomLineProgress = Math.max(0, (easedProgress - 0.5) * 2) // Starts at 50% of animation
      if (bottomLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX, rectY + rectHeight)
        ctx.lineTo(rectX + rectWidth * bottomLineProgress, rectY + rectHeight)
        ctx.stroke()
      }
    }

    const startAnimation = () => {
      // Don't restart if already animating
      if (isAnimating) return
      
      // Cancel any ongoing animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      
      isAnimating = true
      
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const ctx = canvas.getContext('2d')
      const width = canvas.width
      const height = canvas.height

      // Animation parameters
      let animationProgress = 0
      const animationDuration = 2000 // 2 seconds
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        animationProgress = Math.min(elapsed / animationDuration, 1)

        drawRectangle(ctx, width, height, animationProgress)

        // Continue animation until complete
        if (animationProgress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          isAnimating = false
        }
      }

      animate()
    }

    const updateCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const ctx = canvas.getContext('2d')
      // Draw final rectangle if not animating
      if (!isAnimating) {
        drawRectangle(ctx, canvas.width, canvas.height, 1)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const rect = container.getBoundingClientRect()
      
      // Check if container is in viewport (when scrolling down into view)
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      const isEnteringViewport = rect.top < window.innerHeight * 0.8 && rect.top > -100
      
      // Check if scrolling down
      const scrollDelta = currentScrollY - lastScrollY
      const isScrollingDown = scrollDelta > 0
      
      // Trigger animation when scrolling down and container enters viewport
      if (isScrollingDown && isEnteringViewport && !isAnimating) {
        // Trigger animation on first scroll into view
        if (!hasAnimated) {
          hasAnimated = true
          startAnimation()
        }
      }
      
      // Reset hasAnimated if scrolled back up past the container
      if (rect.top > window.innerHeight * 1.2) {
        hasAnimated = false
      }
      
      // Always update lastScrollY
      lastScrollY = currentScrollY
    }

    // Initial setup
    updateCanvas()
    
    // Initial animation on mount if in viewport
    const rect = container.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation()
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Update on resize
    const resizeObserver = new ResizeObserver(updateCanvas)
    resizeObserver.observe(container)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const body = document.body
    const hideHeaderClass = 'hide-header-in-flow'

    if (!container) return

    const dispatchVisibility = (visible) => {
      window.dispatchEvent(
        new CustomEvent('flowAnimationVisibility', {
          detail: { visible }
        })
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false
        const isMobileViewport = window.innerWidth <= 768

        dispatchVisibility(isVisible)

        if (isVisible && isMobileViewport) {
          body.classList.add(hideHeaderClass)
        } else if (!isVisible) {
          body.classList.remove(hideHeaderClass)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(container)

    const handleResize = () => {
      if (window.innerWidth > 768) {
        body.classList.remove(hideHeaderClass)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      body.classList.remove(hideHeaderClass)
      dispatchVisibility(false)
    }
  }, [])

  return (
    <div
      className="flow-animation-wrapper"
      style={{
        background: '#006B3C',
        padding: '80px 48px 40px',
        color: '#fff'
      }}
    >
      <div className="flow-animation-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Container with animated rectangle border */}
        <div 
          ref={containerRef}
          className="flow-animation-border-container"
          style={{ 
            position: 'relative', 
            padding: '50px',
            minHeight: '400px'
          }}
        >
          {/* Canvas overlay for rectangle animation */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Content inside rectangle */}
          <div className="flow-animation-content" style={{ position: 'relative', zIndex: 0 }}>
            {/* Top Section */}
        <div className="flow-animation-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 60 }}>
          {/* Left: Logo & Tagline */}
          <div className="flow-animation-logo-section">
            <div style={{ marginBottom: 30 }}>
              {/* Vulturelines Logo */}
              <img src="/assets/Images/Vlt_logo1.png" alt="Vulturelines" className="flow-animation-logo" style={{ width: 200, height: 200, objectFit: 'contain', display: 'block' }} />
            </div>
            <div className="flow-animation-branding" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, color: '#000' }}>
              <div>Vulturelines</div>
              <div className="flow-animation-tagline" style={{ fontSize: 24, color: '#fff', fontWeight: 400, marginTop: 12 }}>
                With strategic design and<br />Webflow development.
              </div>
            </div>
          </div>

          {/* Right: Navigation & Contact */}
          <div className="flow-animation-nav-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, flex: '1 1 auto', maxWidth: 600 }}>
            {/* Navigation */}
            <div className="flow-animation-nav">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35', marginBottom: 20, letterSpacing: '1px' }}>
                EXPLORE
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Our Service', path: '/our-service' },
                  { label: 'Our Projects', path: '/work' },
                  { label: 'Our Team', path: '/our-team' },
                  { label: 'Contact', path: '/contact' }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.path} 
                    className="flow-animation-link"
                    style={{ color: '#fff', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s', cursor: 'pointer' }}
                    onClick={(e) => handleFooterNavClick(e, item.path)}
                    onMouseEnter={(e) => e.target.style.color = '#ff6b35'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flow-animation-contact">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35', marginBottom: 20, letterSpacing: '1px' }}>
                CONTACT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="flow-animation-address" style={{ fontSize: 14, color: '#fff' }}>
                  7th Floor, Centre Point,<br />
                  2/4, Mount Pollamallee High Road,<br />
                  Manapakkam, Porur, Chennai
                </div>
                <div className="flow-animation-phone" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>+91 9791670504</div>
                <div className="flow-animation-email" style={{ fontSize: 16, color: '#fff' }}>sutheesh.s@vulturelines.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flow-animation-bottom">
          {/* Divider Line */}
          <div style={{ borderTop: '1px solid #333', marginBottom: 30 }}></div>

          {/* Social Media & Copyright */}
          <div className="flow-animation-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Social Media Icons */}
            <div className="flow-animation-social" style={{ display: 'flex', gap: 12 }}>
              {[
                {
                  name: 'Instagram',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="6" stroke="url(#igGradient)" strokeWidth="2.5" />
                      <defs>
                        <radialGradient id="igGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6 6) rotate(45) scale(22)">
                          <stop offset="0" stopColor="#F9ED32" />
                          <stop offset="0.35" stopColor="#EE2A7B" />
                          <stop offset="0.7" stopColor="#6228D7" />
                          <stop offset="1" stopColor="#2E69EE" />
                        </radialGradient>
                      </defs>
                      <circle cx="12" cy="12" r="5.25" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="17.5" cy="6.5" r="1.35" fill="#ffffff" />
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="url(#liGradient)" />
                      <defs>
                        <linearGradient id="liGradient" x1="4" y1="4" x2="19" y2="20" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2A7BD2" />
                          <stop offset="1" stopColor="#0A4C97" />
                        </linearGradient>
                      </defs>
                      <path d="M8.12 10.06V17H5.6V10.06H8.12ZM8.31 6.94C8.31 7.75 7.65 8.41 6.79 8.41C5.93 8.41 5.27 7.75 5.27 6.94C5.27 6.13 5.93 5.5 6.79 5.5C7.65 5.5 8.29 6.13 8.31 6.94ZM18.74 13.25V17H16.23V13.55C16.23 12.69 15.88 12.1 15.08 12.1C14.44 12.1 14.04 12.54 13.87 12.97C13.8 13.14 13.78 13.37 13.78 13.6V17H11.27C11.27 17 11.3 10.66 11.27 10.06H13.78V11.01C14.12 10.49 14.74 9.74 16.03 9.74C17.58 9.74 18.74 10.76 18.74 13.25Z" fill="#ffffff" />
                    </svg>
                  )
                },
                {
                  name: 'Facebook',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#fbGradient)" />
                      <defs>
                        <radialGradient id="fbGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8 6) rotate(50) scale(20)">
                          <stop offset="0" stopColor="#3B5998" />
                          <stop offset="1" stopColor="#1A2E6E" />
                        </radialGradient>
                      </defs>
                      <path d="M14.75 8H12.9C12.52 8 12.25 8.29 12.25 8.7V10.25H14.6L14.25 12.5H12.25V20H9.83V12.5H8V10.25H9.83V8.5C9.83 6.57 10.87 5.5 12.63 5.5C13.48 5.5 14.21 5.59 14.75 5.67V8Z" fill="#ffffff" />
                    </svg>
                  )
                }
              ].map(({ name, icon }, idx) => (
                <div
                  key={name}
                  className="flow-animation-social-icon"
                  style={{ width: 40, height: 40, background: '#123222', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s, background 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'
                    e.currentTarget.style.background = 'rgba(27, 88, 56, 0.9)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    e.currentTarget.style.background = '#123222'
                  }}
                  aria-label={name}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Copyright & Legal Links */}
            <div className="flow-animation-legal" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <div style={{ fontSize: 12, color: '#999' }}>© 2025 StepHouse. All rights reserved.</div>
              <div className="flow-animation-legal-links" style={{ display: 'flex', gap: 20 }}>
                {['Privacy Policy', 'General', 'Cookie Policy'].map((link, idx) => (
                  <a key={idx} href="#" className="flow-animation-legal-link" style={{ fontSize: 12, color: '#ff6b35', textDecoration: 'none' }}
                     onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                     onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
          </div>
          {/* End Content inside rectangle */}
        </div>
        {/* End Container with animated rectangle border */}
      </div>
    </div>
  )
}

export default FlowAnimation
