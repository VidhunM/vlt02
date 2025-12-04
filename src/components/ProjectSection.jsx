import React, { useState } from 'react'
import '../styles/projectShowcase.css'

const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: 'G Community',
      subtitle: 'Community Gallery',
      image:
        'https://images.unsplash.com/photo-1574285013029-29296a71930e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600'
    },
    {
      id: 2,
      title: 'CORRIDOR',
      subtitle: 'The Corridor is a new gallery to discover unique, one-of-a-kind works of art.',
      image:
        'https://images.unsplash.com/photo-1564754943164-e83c08469116?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600'
    },
    {
      id: 3,
      title: 'AMANAH',
      subtitle: 'Building conflict resilient communities.',
      image:
        'https://images.unsplash.com/photo-1531966662811-c6501e46eda6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
    },
    {
      id: 4,
      title: 'ATLAS',
      subtitle: 'An immersive app that lets teams explore design systems in context.',
      image:
        'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
    },
    {
      id: 5,
      title: 'STRATEGY',
      subtitle: 'AI • MOTION • WEB • BRAND • STRATEGY • AI • MOTION • WEB',
      image:
        'https://images.unsplash.com/photo-1530236668220-b9c6c098c9aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
    },
    {
      id: 6,
      title: 'GEOMETRIC',
      subtitle: 'Design System',
      image:
        'https://images.unsplash.com/photo-1564698010692-0fe284aae806?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
    }
  ]

  // Duplicate list for seamless loop
  const images = [...projects, ...projects.slice(0, 3)] // Slightly more than visible to cover seamless

  const [popup, setPopup] = useState(null);

  const handleCardClick = (proj) => setPopup(proj);
  const handlePopupClose = () => setPopup(null);
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('project-popup-overlay')) handlePopupClose();
  };

  return (
    <section className="projects-showcase-section">
      <div className="projects-showcase-container">
        <div className="projects-showcase-header">
          <h2 className="projects-showcase-title">OUR PROJECTS</h2>
          <p className="projects-showcase-subtitle">
            Creative solutions that make a difference
          </p>
        </div>
        <div className="auto-marquee-row">
          <div className="auto-marquee-track">
            {images.map((project, idx) => (
              <div className="auto-marquee-card" key={idx} onClick={() => handleCardClick(project)}>
                <img src={project.image} alt={project.title} />
                <div className="project-card-title-overlay">{project.title}</div>
              </div>
            ))}
          </div>
        </div>
        {popup && (
          <div className="project-popup-overlay" onClick={handleOverlayClick}>
            <div className="project-popup-card">
              <button className="project-popup-close" onClick={handlePopupClose}>&times;</button>
              <img src={popup.image} alt={popup.title} />
              <h3>{popup.title}</h3>
              <p>{popup.subtitle}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectSection
