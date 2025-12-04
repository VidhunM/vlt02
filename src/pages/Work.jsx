import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MinimalistNav from '../components/MinimalistNav'
import Header from '../components/Header'
import ProjectSection from '../components/ProjectSection'
import FlowAnimation from '../components/FlowAnimation'
import { navigateWithCircle } from '../utils/navigation'
import { getProjectSlug } from '../data/projects'

const PROJECTS = [
  {
    title: 'ACTIVE RESEARCH COLLECTIVE®',
    category: 'DTC, Health & Wellness',
    link: '#',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    title: 'LUDEO®',
    category: 'Tech, Gaming',
    link: '#',
    image: 'https://images.unsplash.com/photo-1533022139390-e31c488d69e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vYmlsZSUyMGFwcCUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww',
  },
  {
    title: 'KTM AGENCY',
    category: 'Agency, PR',
    link: '#',
    image: 'https://plus.unsplash.com/premium_photo-1688678097388-a0c77ea9ace1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlvdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'NEIGHBORS & FRIENDS',
    category: 'Food & Beverage',
    link: '#',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'FOUNDRSPACE COWORKING',
    category: 'Real Estate, Business',
    link: '#',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
  },
  {
    title: 'ILLUMINATION FOUNDATION',
    category: 'Nonprofit',
    link: '#',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
]

const Work = () => {
  const navigate = useNavigate()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isInSection, setIsInSection] = useState(false)
  const projectsSectionRef = useRef(null)

  const handleProjectClick = (event, project) => {
    const slug = getProjectSlug(project.title)
    navigateWithCircle(event, `/work/${slug}`, () => {
      navigate(`/work/${slug}`)
    })
  }

  // Track mouse position and check section boundaries
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      // Check if cursor is within the projects section
      if (projectsSectionRef.current) {
        const rect = projectsSectionRef.current.getBoundingClientRect()
        const isInside = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        )
        
        setIsInSection(isInside)
        
        // If cursor leaves the section and image is showing, hide it immediately
        if (!isInside && hoveredProject !== null) {
          setHoveredProject(null)
        }
      } else if (hoveredProject !== null) {
        // If section ref is not available, hide the image
        setHoveredProject(null)
      }
    }

    const handleScroll = () => {
      // Check boundaries on scroll as well
      if (projectsSectionRef.current && hoveredProject !== null) {
        const rect = projectsSectionRef.current.getBoundingClientRect()
        const isInside = (
          cursorPosition.x >= rect.left &&
          cursorPosition.x <= rect.right &&
          cursorPosition.y >= rect.top &&
          cursorPosition.y <= rect.bottom
        )
        
        if (!isInside) {
          setHoveredProject(null)
          setIsInSection(false)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hoveredProject, cursorPosition])

  // Handle mouse leave on the section itself
  const handleSectionMouseLeave = () => {
    setHoveredProject(null)
    setIsInSection(false)
  }

  return (
    <div className="page work">
      <Header logoSrc={'/assets/Images/Vlt_logo1.png'} />
      <MinimalistNav />
      {/* Projects Showcase Section */}
      <section id="projects">
        <ProjectSection />
      </section>
      {/* Projects List Section */}
      <section 
        className="work-projects-list" 
        ref={projectsSectionRef}
        onMouseLeave={handleSectionMouseLeave}
      >
        <div className="work-projects-list-container">
          <div className="work-projects-header">
            <h2 className="work-projects-title">RECENT WORK</h2>
          </div>
          {PROJECTS.map((project, index) => (
            <React.Fragment key={index}>
              <div 
                className="work-project-item"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="work-project-name">{project.title}</div>
                <div className="work-project-image-space">
                  {hoveredProject === index && isInSection && (
                    <div className="work-project-image-fixed">
                      <div className="work-project-image-container-small">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="work-project-image-small"
                        />
                        <div className="work-project-image-badge-small">
                          <span className="badge-text-small">R</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="work-project-category">{project.category}</div>
                <div 
                  className="work-project-link"
                  onClick={(e) => handleProjectClick(e, project)}
                  style={{ cursor: 'pointer' }}
                >
                  VIEW PROJECT
                </div>
              </div>
              {index < PROJECTS.length - 1 && <div className="work-project-divider"></div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Flow Animation */}
      <FlowAnimation />
    </div>
  )
}

export default Work

