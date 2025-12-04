import React, { useMemo, useState } from 'react'

const createInitialServices = () => ([
  {
    id: 1,
    title: 'Strategic Design',
    description: 'Craft compelling brand narratives and visual identities.',
    image: '',
    keywords: ['brand', 'identity', 'story'],
  },
  {
    id: 2,
    title: 'Web Experiences',
    description: 'Design and develop immersive, high-impact web products.',
    image: '',
    keywords: ['web', 'ui/ux', 'front-end'],
  },
  {
    id: 3,
    title: 'Growth Optimization',
    description: 'Launch data-driven experiments to unlock sustainable growth.',
    image: '',
    keywords: ['growth', 'analytics', 'experiments'],
  },
  {
    id: 4,
    title: 'Emerging Tech',
    description: 'Prototype AI-assisted workflows and interactive experiences.',
    image: '',
    keywords: ['ai', 'innovation', 'automation'],
  },
  {
    id: 5,
    title: 'Content Systems',
    description: 'Build modular content engines to scale storytelling.',
    image: '',
    keywords: ['content', 'cms', 'automation'],
  },
  {
    id: 6,
    title: 'Brand Activation',
    description: 'Bring campaigns to life across digital, social, and physical touchpoints.',
    image: '',
    keywords: ['campaign', 'activation', 'launch'],
  },
])

const createInitialCarousel = () => ([
  { id: 1, label: 'Creative Direction', image: '', keywords: ['brand', 'voice'] },
  { id: 2, label: '3D Interfaces', image: '', keywords: ['3d', 'webgl'] },
  { id: 3, label: 'Motion Graphics', image: '', keywords: ['motion', 'animation'] },
  { id: 4, label: 'Product Launch', image: '', keywords: ['launch', 'gtm'] },
  { id: 5, label: 'Experience Design', image: '', keywords: ['ux', 'ui'] },
  { id: 6, label: 'Consulting', image: '', keywords: ['strategy', 'ops'] },
])

const createInitialProjects = () => ([
  { id: 1, name: 'Vulturelines Redesign', url: '', heroImage: '', summary: 'Refresh the digital-first presence with responsive storytelling.' },
  { id: 2, name: 'Bespoke Commerce', url: '', heroImage: '', summary: 'Headless commerce build with cinematic shopping experience.' },
])

const AdminServiceManager = ({ onBack }) => {
  const [serviceCards, setServiceCards] = useState(createInitialServices)
  const [carouselItems, setCarouselItems] = useState(createInitialCarousel)
  const [projectShowcases, setProjectShowcases] = useState(createInitialProjects)

  const handleServiceChange = (index, field, value) => {
    setServiceCards((prev) =>
      prev.map((card, idx) => (idx === index ? { ...card, [field]: value } : card)),
    )
  }

  const handleServiceImageUpload = (index, inputEl) => {
    if (!inputEl) return
    const file = inputEl.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      handleServiceChange(index, 'image', event.target?.result || '')
      inputEl.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleServiceKeywordsChange = (index, value) => {
    const tokens = value
      .split(',')
      .map((token) => token.trim())
      .filter(Boolean)
    handleServiceChange(index, 'keywords', tokens)
  }

  const handleCarouselChange = (index, field, value) => {
    setCarouselItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const handleCarouselImageUpload = (index, inputEl) => {
    if (!inputEl) return
    const file = inputEl.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      handleCarouselChange(index, 'image', event.target?.result || '')
      inputEl.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleCarouselKeywordsChange = (index, value) => {
    const tokens = value
      .split(',')
      .map((token) => token.trim())
      .filter(Boolean)
    handleCarouselChange(index, 'keywords', tokens)
  }

  const handleProjectChange = (index, field, value) => {
    setProjectShowcases((prev) =>
      prev.map((project, idx) => (idx === index ? { ...project, [field]: value } : project)),
    )
  }

  const servicePreview = useMemo(
    () =>
      serviceCards.map((card) => ({
        title: card.title.trim() || 'Untitled Card',
        description: card.description.trim() || 'Add a supporting description to show here.',
        image: card.image.trim(),
        keywords: card.keywords?.filter(Boolean) ?? [],
      })),
    [serviceCards],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    console.table({
      serviceCards,
      carouselItems,
      projectShowcases,
    })
    alert('Service updates captured in console. Integrate with backend to persist changes.')
  }

  return (
    <div className="admin-service-manager">
      <header className="admin-manager-header">
        <div>
          <button className="admin-tertiary-btn" type="button" onClick={onBack}>
            ← Back to dashboard
          </button>
          <p className="admin-manager-eyebrow">Our Service</p>
          <h1>Update service experience</h1>
          <p className="admin-manager-subtitle">
            Manage service cards, 3D carousel entries, and project showcase tiles displayed on the services page.
          </p>
        </div>
        <button className="admin-primary-btn" type="button" onClick={handleSubmit}>
          Save changes
        </button>
      </header>

      <main className="admin-manager-content">
        <section className="admin-form-section">
          <div className="admin-section-header">
            <h2>Service Cards</h2>
            <p>Each card appears in the hero grid on the services page. Provide a title, description, and optional image URL.</p>
          </div>

          <div className="admin-field-grid">
            {serviceCards.map((card, index) => (
              <div key={card.id} className="admin-field-card">
                <header>
                  <span className="admin-field-badge">Card {index + 1}</span>
                  <h3>{card.title || 'Untitled Card'}</h3>
                </header>
                <label>
                  Title
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    placeholder="Enter card title"
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={card.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    placeholder="Add supporting copy"
                    rows={3}
                  />
                </label>
                <label>
                  Image URL (optional)
                  <input
                    type="url"
                    value={card.image}
                    onChange={(e) => handleServiceChange(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="admin-upload">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleServiceImageUpload(index, e.target)}
                  />
                </label>
                <label>
                  Keywords (comma separated)
                  <input
                    type="text"
                    value={card.keywords?.join(', ') || ''}
                    onChange={(e) => handleServiceKeywordsChange(index, e.target.value)}
                    placeholder="brand, strategy, experience"
                  />
                </label>
              </div>
            ))}
          </div>

          <aside className="admin-preview-panel">
            <h4>Preview</h4>
            <div className="admin-preview-grid">
              {servicePreview.map((card, idx) => (
                <article key={idx} className="admin-preview-card">
                  <div className="admin-preview-card-media">
                    {card.image ? (
                      <img src={card.image} alt={card.title} />
                    ) : (
                      <span className="admin-preview-placeholder">Image</span>
                    )}
                  </div>
                  <h5>{card.title}</h5>
                  <p>{card.description}</p>
                  {card.keywords?.length ? (
                    <div className="admin-preview-tags">
                      {card.keywords.map((keyword, tagIndex) => (
                        <span key={tagIndex}>{keyword}</span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="admin-form-section">
          <div className="admin-section-header">
            <h2>3D Carousel Items</h2>
            <p>Populate the rotating carousel by defining a label and background image for each item.</p>
          </div>

          <div className="admin-field-grid admin-field-grid--compact">
            {carouselItems.map((item, index) => (
              <div key={item.id} className="admin-field-card">
                <header>
                  <span className="admin-field-badge">Slot {index + 1}</span>
                  <h3>{item.label || 'Untitled Slot'}</h3>
                </header>
                <label>
                  Label
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleCarouselChange(index, 'label', e.target.value)}
                    placeholder="Creative Direction"
                  />
                </label>
                <label>
                  Image URL
                  <input
                    type="url"
                    value={item.image}
                    onChange={(e) => handleCarouselChange(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="admin-upload">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCarouselImageUpload(index, e.target)}
                  />
                </label>
                <label>
                  Keywords (comma separated)
                  <input
                    type="text"
                    value={item.keywords?.join(', ') || ''}
                    onChange={(e) => handleCarouselKeywordsChange(index, e.target.value)}
                    placeholder="motion, 3d"
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-form-section">
          <div className="admin-section-header">
            <h2>Project Showcases</h2>
            <p>These items appear in the zig-zag project list beneath the carousel. Supply a hero image, summary, and live URL.</p>
          </div>

          <div className="admin-field-grid">
            {projectShowcases.map((project, index) => (
              <div key={project.id} className="admin-field-card">
                <header>
                  <span className="admin-field-badge">Project {index + 1}</span>
                  <h3>{project.name || 'Untitled Project'}</h3>
                </header>
                <label>
                  Name
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="Project name"
                  />
                </label>
                <label>
                  Live URL
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                    placeholder="https://project-link.com"
                  />
                </label>
                <label>
                  Summary
                  <textarea
                    value={project.summary}
                    onChange={(e) => handleProjectChange(index, 'summary', e.target.value)}
                    placeholder="Short description that appears beside the hero image."
                    rows={3}
                  />
                </label>
                <label>
                  Hero Image URL
                  <input
                    type="url"
                    value={project.heroImage}
                    onChange={(e) => handleProjectChange(index, 'heroImage', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminServiceManager


