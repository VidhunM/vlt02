import React from 'react'

const ProjectCard = ({ project }) => {
  const { title, description, image, category, link } = project

  return (
    <div className="project-card">
      <div className="project-image">
        <div className="image-placeholder">
          <span>{image || 'Project Image'}</span>
        </div>
      </div>
      <div className="project-content">
        <div className="project-category">{category}</div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <a href={link} className="project-link" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
