import React, { useMemo, useState } from 'react'

const createInitialFeedCards = () =>
  Array.from({ length: 18 }).map((_, index) => ({
    id: index + 1,
    title: `Feed Card ${String(index + 1).padStart(2, '0')}`,
    caption: '',
    image: '',
  }))

const createInitialCarouselItems = () =>
  Array.from({ length: 18 }).map((_, index) => ({
    id: index + 1,
    label: `Carousel Item ${String(index + 1).padStart(2, '0')}`,
    image: '',
  }))

const createInitialHighlights = () => [
  {
    id: 1,
    title: 'October 2025',
    description:
      'Spotlight a cinematic collaboration that blends meticulous storytelling with bold motion graphics.',
    image: '',
  },
  {
    id: 2,
    title: 'September 2025',
    description:
      'Celebrate the start of a new partnership spanning brand, web, and AI-driven initiatives.',
    image: '',
  },
  {
    id: 3,
    title: 'August 2025',
    description:
      'Share the refreshed identity and site updates that align the studio with its evolving partners.',
    image: '',
  },
]

const AdminFeedManager = ({ onBack }) => {
  const [feedCards, setFeedCards] = useState(createInitialFeedCards)
  const [carouselItems, setCarouselItems] = useState(createInitialCarouselItems)
  const [highlightCards, setHighlightCards] = useState(createInitialHighlights)

  const syncCarouselWithFeed = (index, updates) => {
    setCarouselItems((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    )
  }

  const handleFeedCardChange = (index, field, value) => {
    setFeedCards((prev) =>
      prev.map((card, idx) => (idx === index ? { ...card, [field]: value } : card)),
    )

    if (field === 'title') {
      const fallbackLabel = `Carousel Item ${String(index + 1).padStart(2, '0')}`
      const newLabel = value.trim() ? value : fallbackLabel
      syncCarouselWithFeed(index, { label: newLabel })
    }

    if (field === 'image') {
      syncCarouselWithFeed(index, { image: value })
    }
  }

  const handleFeedCardUpload = (index, inputEl) => {
    if (!inputEl) return
    const file = inputEl.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result || ''
      handleFeedCardChange(index, 'image', result)
      inputEl.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleCarouselChange = (index, field, value) => {
    setCarouselItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const handleHighlightChange = (index, field, value) => {
    setHighlightCards((prev) =>
      prev.map((card, idx) => (idx === index ? { ...card, [field]: value } : card)),
    )
  }

  const handleHighlightUpload = (index, inputEl) => {
    if (!inputEl) return
    const file = inputEl.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      handleHighlightChange(index, 'image', event.target?.result || '')
      inputEl.value = ''
    }
    reader.readAsDataURL(file)
  }

  const feedPreview = useMemo(
    () =>
      feedCards.map((card) => ({
        title: card.title.trim() || 'Untitled Card',
        caption: card.caption.trim(),
        image: card.image.trim(),
      })),
    [feedCards],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    console.table({
      feedCards,
      carouselItems,
      highlightCards,
    })
    alert('Feed updates captured in console. Connect these forms to your backend to persist changes.')
  }

  return (
    <div className="admin-feed-manager">
      <header className="admin-manager-header">
        <div>
          <button className="admin-tertiary-btn" type="button" onClick={onBack}>
            ← Back to dashboard
          </button>
          <p className="admin-manager-eyebrow">Our Feed</p>
          <h1>Curate the feed experience</h1>
          <p className="admin-manager-subtitle">
            Maintain feed cards (carousel imagery updates automatically) and highlight stories that
            appear across the Our Feed page.
          </p>
        </div>
        <button className="admin-primary-btn" type="button" onClick={handleSubmit}>
          Save changes
        </button>
      </header>

      <main className="admin-manager-content">
        <section className="admin-form-section">
          <div className="admin-section-header">
            <h2>Feed Cards (18)</h2>
            <p>
              These tiles populate the scrolling grid and drive the 3D carousel imagery. Supply a
              title, optional caption, and image for each of the eighteen cards—carousel slots will
              mirror these updates automatically.
            </p>
          </div>

          <div className="admin-field-grid">
            {feedCards.map((card, index) => (
              <div key={card.id} className="admin-field-card">
                <header>
                  <span className="admin-field-badge">Card {index + 1}</span>
                  <h3>{card.title || `Feed Card ${index + 1}`}</h3>
                </header>
                <label>
                  Title
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleFeedCardChange(index, 'title', e.target.value)}
                    placeholder="Enter headline"
                  />
                </label>
                <label>
                  Caption
                  <textarea
                    value={card.caption}
                    onChange={(e) => handleFeedCardChange(index, 'caption', e.target.value)}
                    placeholder="Optional supporting copy"
                    rows={2}
                  />
                </label>
                <label>
                  Image URL
                  <input
                    type="url"
                    value={card.image}
                    onChange={(e) => handleFeedCardChange(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="admin-upload">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFeedCardUpload(index, e.target)}
                  />
                </label>
              </div>
            ))}
          </div>

          <aside className="admin-preview-panel">
            <h4>Preview (first 6 cards)</h4>
            <div className="admin-feed-preview-grid">
              {feedPreview.slice(0, 6).map((card, idx) => (
                <article key={idx} className="admin-feed-preview-card">
                  <div className="admin-feed-preview-media">
                    {card.image ? (
                      <img src={card.image} alt={card.title} />
                    ) : (
                      <span>Image</span>
                    )}
                  </div>
                  <div className="admin-feed-preview-content">
                    <h5>{card.title}</h5>
                    {card.caption ? <p>{card.caption}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="admin-form-section">
          <div className="admin-section-header">
            <h2>Highlight Stories</h2>
            <p>
              Manage the trio of highlight cards beneath the carousel. Update the headline, story
              description, and background image.
            </p>
          </div>

          <div className="admin-field-grid">
            {highlightCards.map((card, index) => (
              <div key={card.id} className="admin-field-card">
                <header>
                  <span className="admin-field-badge">Highlight {index + 1}</span>
                  <h3>{card.title || `Highlight ${index + 1}`}</h3>
                </header>
                <label>
                  Headline
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
                    placeholder="October 2025"
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={card.description}
                    onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
                    placeholder="Add story details"
                    rows={3}
                  />
                </label>
                <label>
                  Image URL
                  <input
                    type="url"
                    value={card.image}
                    onChange={(e) => handleHighlightChange(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="admin-upload">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleHighlightUpload(index, e.target)}
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

export default AdminFeedManager


