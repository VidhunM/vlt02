import React, { useEffect, useRef, useState } from 'react'
import MinimalistNav from '../components/MinimalistNav'
import Header from '../components/Header'
import FlowAnimation from '../components/FlowAnimation'

const OurTeam = () => {
  const boardSectionRef = useRef(null)
  const boardWrapperRef = useRef(null)
  const boardHeaderRef = useRef(null)
  const sliderRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedDirector, setSelectedDirector] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [isSectionInView, setIsSectionInView] = useState(false)
  const [isSectionPinned, setIsSectionPinned] = useState(false)
  const [cardWidth, setCardWidth] = useState(520) // Default desktop width
  const [sliderDisplayIndex, setSliderDisplayIndex] = useState(0)

  const boardMembers = [
    {
      name: "Robert Chen",
      position: "Chairman",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Experienced leader with 20+ years in technology and business strategy.",
      details: {
        experience: "20+ years in technology leadership",
        education: "MBA from Harvard Business School",
        expertise: "Strategic planning, technology innovation, corporate governance",
        achievements: "Led 3 successful IPOs, founded 2 tech companies"
      }
    },
    {
      name: "Sarah Williams",
      position: "Vice Chairman",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Financial expert with extensive experience in corporate finance and risk management.",
      details: {
        experience: "15+ years in corporate finance",
        education: "CPA, CFA Charterholder",
        expertise: "Financial strategy, risk management, audit oversight",
        achievements: "Managed $2B+ in assets, reduced operational costs by 30%"
      }
    },
    {
      name: "Michael Thompson",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Technology visionary with deep expertise in digital transformation and innovation.",
      details: {
        experience: "18+ years in technology and innovation",
        education: "PhD in Computer Science from MIT",
        expertise: "Digital transformation, AI/ML, cybersecurity",
        achievements: "Patented 12 technologies, led digital transformation for Fortune 500"
      }
    },
    {
      name: "Emily Rodriguez",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Marketing and brand expert with proven track record in global market expansion.",
      details: {
        experience: "12+ years in marketing and brand management",
        education: "Master's in Marketing from Wharton",
        expertise: "Brand strategy, global marketing, customer experience",
        achievements: "Launched 5 successful global brands, increased market share by 40%"
      }
    },
    {
      name: "David Park",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Operations specialist with expertise in scaling businesses and operational excellence.",
      details: {
        experience: "16+ years in operations and supply chain",
        education: "MBA in Operations Management from Stanford",
        expertise: "Operations strategy, supply chain optimization, process improvement",
        achievements: "Reduced operational costs by 25%, improved efficiency by 35%"
      }
    }
  ]

  const teamMembers = [
    {
      name: "Alex Morgan",
      position: "CEO & Founder",
      bio: "With over 10 years of experience in digital solutions, Alex leads our team with vision and innovation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    },
    {
      name: "Sarah Johnson",
      position: "Creative Director",
      bio: "Sarah brings creativity and strategic thinking to every project, ensuring exceptional design outcomes.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    },
    {
      name: "Michael Chen",
      position: "Lead Developer",
      bio: "Michael specializes in full-stack development and is passionate about creating robust, scalable solutions.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "Emily Rodriguez",
      position: "UX/UI Designer",
      bio: "Emily focuses on user-centered design, creating intuitive and engaging experiences for our clients.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "David Wilson",
      position: "Project Manager",
      bio: "David ensures seamless project execution and client satisfaction through effective communication and planning.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "Jessica Lee",
      position: "Marketing Specialist",
      bio: "Jessica drives our brand presence and client engagement through strategic marketing initiatives.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    }
  ]

  const filteredTeamMembers = activeFilter === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.team === activeFilter)

  // Check mobile on mount and resize, and measure card width
  useEffect(() => {
    const measureCardWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector('.board-member-card')
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect()
          const sliderStyle = window.getComputedStyle(sliderRef.current)
          const isMobileDevice = window.innerWidth <= 768
          
          // On mobile, cards are full-width with no gap
          // On desktop, include gap for translation calculation
          if (isMobileDevice) {
            // On mobile, card width matches slider viewport width for full-width cards
            const sliderWidth = sliderRef.current.getBoundingClientRect().width || window.innerWidth
            const newCardWidth = sliderWidth
            if (newCardWidth > 0) {
              setCardWidth(prev => {
                if (prev !== newCardWidth) {
                  return newCardWidth
                }
                return prev
              })
            }
          } else {
            const gap = parseFloat(sliderStyle.gap) || 40 // Default gap if not found
            // Card width includes the gap to next card for translation calculation
            const newCardWidth = cardRect.width + gap
            if (newCardWidth > 0) {
              setCardWidth(prev => {
                if (prev !== newCardWidth) {
                  return newCardWidth
                }
                return prev
              })
            }
          }
        }
      }
    }
    
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      measureCardWidth()
    }
    
    checkMobile()
    
    // Re-measure after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkMobile, 100)
    const timeoutId2 = setTimeout(checkMobile, 500) // Second measurement to be sure
    
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const measureCardWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector('.board-member-card')
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect()
          const sliderStyle = window.getComputedStyle(sliderRef.current)
          const isMobileDevice = window.innerWidth <= 768
          
          // On mobile, cards are full-width with no gap
          // On desktop, include gap for translation calculation
          if (isMobileDevice) {
            // On mobile, card width matches slider viewport width for full-width cards
            const sliderWidth = sliderRef.current.getBoundingClientRect().width || window.innerWidth
            const newCardWidth = sliderWidth
            if (newCardWidth > 0) {
              setCardWidth(prev => prev !== newCardWidth ? newCardWidth : prev)
            }
          } else {
            const gap = parseFloat(sliderStyle.gap) || 40
            const newCardWidth = cardRect.width + gap
            if (newCardWidth > 0) {
              setCardWidth(prev => prev !== newCardWidth ? newCardWidth : prev)
            }
          }
        }
      }
    }
    
    const handleScroll = () => {
      if (boardSectionRef.current && boardHeaderRef.current) {
        // Measure card width on first scroll if not measured yet
        if (cardWidth === 520) {
          measureCardWidth()
        }
        
        const rect = boardSectionRef.current.getBoundingClientRect()
        const headerRect = boardHeaderRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if mobile device
        const isMobileDevice = window.innerWidth <= 768

        // On mobile, keep section visible but do not drive slider via scroll
        if (isMobileDevice) {
          const sectionTop = rect.top
          const sectionBottom = rect.bottom
          if (sectionTop < windowHeight && sectionBottom > 0) {
            setIsSectionInView(true)
          } else {
            setIsSectionInView(false)
          }
          setIsSectionPinned(false)
          return
        }
        
        // Desktop: scroll progress drives slider
        // Calculate when section is in viewport
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const sectionHeight = rect.height
        const headerTop = headerRect.top
        const headerBottom = headerRect.bottom
        
        // Check if header has completely scrolled past the top of viewport
        // Animation starts only after "Board of Directors" text has scrolled up and out of view
        const headerHasScrolledPast = headerBottom < 0
        
        // Only start animation after header has scrolled past
        if (sectionTop < windowHeight && sectionBottom > 0) {
          // Mark section as in view for animation trigger
          setIsSectionInView(true)
          
          let progress = 0
          const totalCards = boardMembers.length
          
          // Only calculate progress if header has scrolled past (header bottom < 0)
          if (headerHasScrolledPast) {
            // Calculate how far we've scrolled past when header bottom reached 0
            // Start progress from when header fully exits viewport
            const scrollFromHeaderPass = Math.abs(headerBottom)
            
            // Animation distance: calculate based on remaining section height after header
            // Use the visible section area for smooth, proportional animation
            const headerHeight = headerRect.height
            const remainingSectionHeight = Math.max(sectionHeight - headerHeight, windowHeight)
            
            // Animation distance: allow smooth progression through all images
            // Adjust multiplier (1.2-1.8) to control animation speed - higher = slower
            const animationDistance = remainingSectionHeight * 1.5
            
            // Calculate progress from 0 to 1 based on scroll distance after header passes
            progress = Math.min(scrollFromHeaderPass / Math.max(animationDistance, 1), 1)
          } else {
            // Header hasn't passed yet, keep progress at 0 and images at start
            progress = 0
          }
          
          // Desktop: Seamless linear progression
          // Direct mapping: scroll progress directly controls image position
          const adjustedProgress = Math.min(progress * (totalCards - 1), totalCards - 1)
          
          // Pin section when animation is in progress
          // Pin only after: header has scrolled past AND animation is active (not at last image yet)
          // Keep pinned during entire animation sequence until last image completes
          // Release when: last image is fully shown (adjustedProgress >= totalCards - 1)
          const animationStarted = headerHasScrolledPast && progress > 0
          const animationComplete = adjustedProgress >= totalCards - 1
          const sectionInViewport = sectionBottom > 0 && sectionTop < windowHeight
          
          // Pin during active animation (after header passes), release when complete or section exits viewport
          // Don't pin until header has fully scrolled past
          const shouldPin = headerHasScrolledPast && animationStarted && !animationComplete && sectionInViewport
          
          setIsSectionPinned(shouldPin)
          setScrollProgress(adjustedProgress)
        } else if (sectionTop >= windowHeight) {
          // Section not yet reached
          setScrollProgress(0)
          setIsSectionInView(false)
          setIsSectionPinned(false)
        } else if (sectionBottom <= 0) {
          // Section fully scrolled past - show last image, release pin
          const totalCards = boardMembers.length
          setScrollProgress(totalCards - 1)
          setIsSectionInView(true)
          setIsSectionPinned(false)
        } else {
          // Section in view but header hasn't scrolled past yet
          setScrollProgress(0)
          setIsSectionPinned(false)
        }
      }
    }

    // Initial call
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [cardWidth, boardMembers.length])

  const handleDirectorClick = (director) => {
    setSelectedDirector(director)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDirector(null)
  }

  const handleDotClick = (index) => {
    if (!isMobile) return
    setSliderDisplayIndex(index)
    setScrollProgress(index)
  }

  const getMobileCardStyle = (index) => {
    if (!isMobile) return {}

    const diff = Math.abs(index - sliderDisplayIndex)
    const clamped = Math.min(diff, 1)
    const opacity = 1 // keep all cards fully visible on mobile
    const translateY = clamped * 16
    const scale = 1 - clamped * 0.03

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      transition: 'opacity 0.45s ease, transform 0.45s ease'
    }
  }

  return (
    <div className="page our-team">
      <Header logoSrc={'/assets/Images/Vlt_logo1.png'} />
      <MinimalistNav />
      
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-background">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Professional team in office" />
        </div>
        <div className="team-hero-overlay">
          <div className="team-hero-content">
            <h1 className="team-hero-title">We are Vulture Lines.</h1>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section 
        className={`board-section ${isSectionPinned ? 'is-pinned' : ''}`}
        ref={boardSectionRef}
      >
        <div className="board-container">
          <div className="board-header" ref={boardHeaderRef}>
            <h2 className="board-title">Board of Directors</h2>
          </div>
          <div className="board-members-container">
            <div 
              ref={sliderRef}
              className="board-members-slider"
              style={{
                transform: isMobile
                  ? `translateX(-${sliderDisplayIndex * cardWidth}px)`
                  : `translateX(-${scrollProgress * cardWidth}px)`,
                transition: isMobile ? 'transform 0.4s ease-out' : 'none',
                willChange: 'transform',
                opacity: isSectionInView ? 1 : 0,
                maxWidth: isMobile ? '100%' : 'none',
                padding: isMobile ? '0' : undefined,
                alignItems: isMobile ? 'stretch' : 'center'
              }}
            >
              {boardMembers.map((member, index) => (
                <div
                  key={index}
                  className="board-member-card"
                  style={getMobileCardStyle(index)}
                >
                  <div 
                    className="board-member-image"
                    onClick={() => handleDirectorClick(member)}
                  >
                    <img src={member.image} alt={member.name} />
                    <div className="hover-dot">
                      <div className="dot-content">
                        <p className="dot-bio">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="board-member-info">
                    <h3 className="board-member-name">{member.name}</h3>
                    <p className="board-member-position">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
            {isMobile && (
              <div className="board-slider-dots">
                {boardMembers.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`board-slider-dot ${sliderDisplayIndex === index ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Show director ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-members-section">
        <div className="team-members-container">
          <div className="team-header">
            <h2 className="team-section-title">Meet your team</h2>
            <div className="team-filters">
              <button 
                className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => setActiveFilter('All')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Commercial Team' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Commercial Team')}
              >
                Commercial Team
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Project Team' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Project Team')}
              >
                Project Team
              </button>
            </div>
          </div>
          <div className="team-grid">
            {filteredTeamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section → CTA */}
      <section className="team-values-section">
        <div className="team-values-overlay" aria-hidden="true" />
        <div className="team-values-container">
          <div className="team-values-card">
            <h2>Let's work together</h2>
            <p>
              We believe the best results come from collaborating with passionate people.
              Whether you have a vision or need guidance, we're here to help transform
              challenges into opportunities.
            </p>
            <p>
              Let's start the conversation and bring your aspirations to life!
            </p>
            <a className="team-values-button" href="/contact">
              <span>Let's Talk</span>
              <span className="cta-dot" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" role="presentation">
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="15" cy="5" r="2" />
                  <circle cx="5" cy="15" r="2" />
                  <circle cx="15" cy="15" r="2" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Director Details Modal */}
      {isModalOpen && selectedDirector && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="director-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedDirector.image} alt={selectedDirector.name} />
              </div>
              <div className="modal-info">
                <h2 className="modal-name">{selectedDirector.name}</h2>
                <p className="modal-position">{selectedDirector.position}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <h4>Experience</h4>
                    <p>{selectedDirector.details.experience}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Education</h4>
                    <p>{selectedDirector.details.education}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Expertise</h4>
                    <p>{selectedDirector.details.expertise}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Key Achievements</h4>
                    <p>{selectedDirector.details.achievements}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flow Animation */}
      <FlowAnimation />
    </div>
  )
}

export default OurTeam