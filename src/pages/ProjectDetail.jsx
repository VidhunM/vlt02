import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProjectBySlug, PROJECTS_DATA } from '../data/projects'
import { navigateWithCircle } from '../utils/navigation'
import MinimalistNav from '../components/MinimalistNav'
import Header from '../components/Header'

const ProjectDetail = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(projectId)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [projectId])

  useEffect(() => {
    // If project not found, redirect to work page
    if (!project) {
      navigate('/work')
    }
  }, [project, navigate])

  // If project not found, return null while redirecting
  if (!project) {
    return null
  }

  // Get other projects (excluding current)
  const otherProjects = Object.values(PROJECTS_DATA)
    .filter(p => p.id !== project.id)
    .slice(0, 4)

  const handleProjectClick = (event, projectSlug) => {
    navigateWithCircle(event, `/work/${projectSlug}`, () => {
      navigate(`/work/${projectSlug}`)
    })
  }

  const handleBackToWork = (event) => {
    navigateWithCircle(event, '/work', () => {
      navigate('/work')
    })
  }

  return (
    <div className="page project-detail">
      <Header logoSrc={'/assets/Images/Vlt_logo1.png'} />
      <MinimalistNav />
      
      {/* Disclaimer */}
      <div className="project-disclaimer">
        <p>The mockups presented above reflect the designs of the project delivered to the client.</p>
      </div>

      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-hero-content">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-subtitle">{project.subtitle}</p>
          <div className="project-services">{project.services}</div>
        </div>
      </section>

      {/* Hero Images Section */}
      {project.heroImage && (
        <section className="project-hero-images">
          <div className="project-hero-images-container">
            <div className="project-hero-image-main">
              <img src={project.heroImage} alt={project.title} />
            </div>
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="project-hero-images-grid">
                {project.galleryImages.slice(0, 3).map((image, index) => (
                  <div key={index} className="project-hero-image-item">
                    <img src={image} alt={`${project.title} - Image ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="project-content">
        <div className="project-content-container">
          <div className="project-content-header">
            <h2 className="project-content-title">
              DESIGNING A HEARTFELT BRAND<br />
              FOR {project.title}
            </h2>
            <div className="project-content-services">{project.services}</div>
          </div>
          
          <div className="project-description">
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Other Recent Projects Section */}
      <section className="project-other-projects">
        <div className="project-other-projects-container">
          <h2 className="project-other-projects-title">OTHER RECENT PROJECTS</h2>
          <div className="project-other-projects-list">
            {otherProjects.map((otherProject, index) => (
              <React.Fragment key={otherProject.id}>
                <div 
                  className="project-other-project-item"
                  onClick={(e) => handleProjectClick(e, otherProject.id)}
                >
                  <div className="project-other-project-name">{otherProject.title}</div>
                  <div className="project-other-project-category">{otherProject.category}</div>
                  <div className="project-other-project-link">VIEW PROJECT</div>
                </div>
                {index < otherProjects.length - 1 && <div className="project-other-project-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail

