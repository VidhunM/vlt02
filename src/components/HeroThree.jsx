import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const HeroThree = () => {
  const [selectedProject, setSelectedProject] = useState(0)
  const [previousProject, setPreviousProject] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const transitionTimeoutRef = useRef(null)
  const navigate = useNavigate()
  
  const handleNavigationClick = (event, path) => {
    navigateWithCircle(event, path, () => {
      navigate(path)
    })
  }

  const projects = [
    {
      name: 'drone-technology ',
      bgImage: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg'
    },
    {
      name: 'artificial-intelligence',
      bgImage: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg'
    },
    {
      name: 'iot-development',
      bgImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    },
    {
      name: 'application-development',
      bgImage: 'https://images.pexels.com/photos/5473889/pexels-photo-5473889.jpeg'
    }
  ]

  const projectCount = projects.length

  // Preload all images to prevent broken images during animation
  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = reject
        img.src = src
      })
    }

    const preloadImages = async () => {
      const loaded = {}
      for (let i = 0; i < projects.length; i++) {
        try {
          await loadImage(projects[i].bgImage)
          loaded[i] = true
        } catch (error) {
          console.warn(`Failed to load image for project ${i}:`, error)
          loaded[i] = false
        }
      }
      setImagesLoaded(loaded)
    }

    preloadImages()
  }, [])

  const goToProject = useCallback((next) => {
    if (!projectCount) return

    setSelectedProject((current) => {
      const proposed = typeof next === 'function' ? next(current) : next

      if (typeof proposed !== 'number' || Number.isNaN(proposed)) {
        return current
      }

      const nextIndex = ((proposed % projectCount) + projectCount) % projectCount

      if (nextIndex === current) {
        return current
      }

      setPreviousProject(current)

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setPreviousProject(null)
        transitionTimeoutRef.current = null
      }, 2500)

      return nextIndex
    })
  }, [projectCount])

  // Auto-rotate through projects every 6.5 seconds (increased to match slower animation)
  useEffect(() => {
    const interval = setInterval(() => {
      goToProject((current) => (current + 1) % projectCount)
    }, 6500)

    return () => clearInterval(interval)
  }, [goToProject, projectCount])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // Listen for menu toggle from Header component
  useEffect(() => {
    const handleMenuToggle = (event) => {
      setIsMobileMenuOpen(event.detail.isOpen)
    }

    window.addEventListener('headerMenuToggle', handleMenuToggle)
    return () => window.removeEventListener('headerMenuToggle', handleMenuToggle)
  }, [])

  return (
    <section className="hero-three">
      <div className="hero-background">
        {previousProject !== null && previousProject !== selectedProject && (
          <div
            key={`prev-${projects[previousProject].name}`}
            className="hero-bg-layer hero-bg-previous"
            style={{ 
              backgroundImage: `url(${projects[previousProject].bgImage})`,
              opacity: imagesLoaded[previousProject] === false ? 0 : undefined
            }}
          ></div>
        )}
        <div 
          className="hero-bg-layer hero-bg-active" 
          key={`active-${projects[selectedProject].name}`}
          style={{ 
            backgroundImage: `url(${projects[selectedProject].bgImage})`,
            opacity: imagesLoaded[selectedProject] === false ? 0 : undefined
          }}
        ></div>
        <div className="hero-overlay"></div>
      </div>
      
      {/* Mobile Project List - Top right on mobile */}
      <div className="hero-mobile-projects">
        <div className="project-selector">
          {projects.map((project, index) => (
            <div 
              key={project.name}
              className={`project-item ${selectedProject === index ? 'active' : ''}`}
              onClick={() => goToProject(index)}
            >
              <span className="project-name">{project.name}</span>
              <div className="project-indicator">
                <div className={`indicator-dot ${selectedProject === index ? 'active' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="hero-container">
      </div>

      <div className="hero-content-bottom">
        <div className="hero-content-wrapper">
          <div className="hero-label"></div>
          <h1 className="hero-title">Experience Excellence with Vulturelines</h1>
          <p className="hero-description">
            With strategic design and Webflow development.
          </p>
        </div>
      </div>

      <div className="hero-sidebar">
        <div className="project-selector">
          {projects.map((project, index) => (
            <div 
              key={project.name}
              className={`project-item ${selectedProject === index ? 'active' : ''}`}
              onClick={() => goToProject(index)}
            >
              <span className="project-name">{project.name}</span>
              <div className="project-indicator">
                <div className={`indicator-dot ${selectedProject === index ? 'active' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroThree
