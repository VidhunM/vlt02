import React, { useRef, useState, useEffect } from 'react';

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: (
      // Advanced Instagram SVG with gradient and modern design
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon instagram-icon">
        <defs>
          <linearGradient id="insta-gradient-advanced" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="25%" stopColor="#e6683c"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="75%" stopColor="#cc2366"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
          <filter id="instagram-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#insta-gradient-advanced)" filter="url(#instagram-glow)"/>
        <rect x="6" y="6" width="20" height="20" rx="5" stroke="#fff" strokeWidth="2" fill="none"/>
        <circle cx="16" cy="16" r="5" stroke="#fff" strokeWidth="2" fill="none"/>
        <circle cx="22" cy="10" r="1.5" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icon: (
      // Advanced LinkedIn SVG with professional design
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon linkedin-icon">
        <defs>
          <filter id="linkedin-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="32" height="32" rx="8" fill="#0077B5" filter="url(#linkedin-glow)"/>
        <path d="M9.5 12.5C10.3 12.5 11 11.8 11 11C11 10.2 10.3 9.5 9.5 9.5C8.7 9.5 8 10.2 8 11C8 11.8 8.7 12.5 9.5 12.5ZM8.5 13.5H10.5V23H8.5V13.5ZM13.5 13.5H15.3V14.5C15.7 13.7 16.6 13 17.8 13C20.2 13 21.5 14.5 21.5 17.2V23H19.5V17.5C19.5 16.3 18.9 15.5 17.6 15.5C16.5 15.5 15.8 16.1 15.5 16.8V23H13.5V13.5Z" fill="#fff"/>
      </svg>
    ),
  }
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const FlowAnimation = () => {
  const containerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(true);

  useEffect(() => {
    // IntersectionObserver toggles scroll-to-top button
    const observer = new window.IntersectionObserver(
      ([entry]) => setShowScrollTop(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Detect when FlowAnimation is visible and dispatch event to hide MinimalistNav
    const flowObserver = new window.IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        // Dispatch custom event for MinimalistNav to listen to
        window.dispatchEvent(
          new CustomEvent('flowAnimationVisibility', {
            detail: { visible: isVisible }
          })
        );
        // Also toggle body class for mobile header hiding
        if (window.innerWidth <= 768) {
          if (isVisible) {
            document.body.classList.add('hide-header-in-flow');
          } else {
            document.body.classList.remove('hide-header-in-flow');
          }
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) flowObserver.observe(containerRef.current);
    return () => flowObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flow-animation-container" style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
      {/* Absolute-positioned Arrow (scrolls with section) */}
      {showScrollTop && (
        <button 
          className="flow-scroll-top-btn"
          aria-label="Scroll to top" 
          onClick={scrollToTop}
          style={{ 
            position: 'absolute', 
            top: 32, 
            right: 52, 
            background: '#006B3C', 
            border: 'none', 
            outline: 'none', 
            borderRadius: '50%', 
            width: 48, 
            height: 48, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 1px 8px #ddd', 
            zIndex: 10, 
            cursor: 'pointer', 
            transition: 'background 0.2s' 
          }}
        >
          <span className="scroll-arrow-icon" style={{ fontSize: 28, color: '#fff', fontWeight: 900, lineHeight: 1, pointerEvents: 'none', display: 'inline-block' }}>↑</span>
        </button>
      )}
      {/* Main Section */}
      <div className="flow-main-section" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 0 60px 0' }}>
        {/* Left: Logo above Text */}
        <div className="flow-logo-section" style={{ marginLeft: '25px', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <img className="flow-logo" src="/assets/Images/Vlt_logo1.png" alt="Vulturelines Logo" style={{ width: 400, height: 400, objectFit: 'contain', display: 'block', marginBottom: 0 }} />
          <span className="flow-powered-text" style={{ color: '#181818', background: '#fff', fontSize: 32, fontWeight: 700, borderRadius: 3, padding: '8px 20px', display: 'block', textAlign: 'left', marginTop: -20, marginLeft: 15 }}>Powered by Vulturelines</span>
        </div>
        {/* Right: Icons above Email */}
        <div className="flow-social-section" style={{ marginRight: '110px', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
          {/* Advanced Icons with hover effects */}
          <div className="flow-social-icons" style={{ display: 'flex', gap: 20, marginBottom: 10, alignItems: 'center' }}>
            {socials.map((s, index) => (
              <a 
                key={s.name} 
                href={s.url} 
                aria-label={s.name} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`social-link social-link-${s.name.toLowerCase()}`}
                style={{ 
                  outline: 'none', 
                  background: 'transparent', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: 64, 
                  height: 64, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          {/* Email, smaller */}
          <span className="flow-email" style={{ fontSize: 38, fontWeight: 500, color: '#181818', fontFamily: 'Arial, sans-serif', letterSpacing: '-2px', textAlign: 'right' }}>sutheesh.s@vulturelines.com</span>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flow-bottom-bar" style={{ borderTop: '2px solid #181818', background: '#fff', minHeight: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
        <div className="flow-copyright" style={{ color: '#181818', fontSize: 20 }}>&copy; 2025 Vulturelines. All rights reserved.</div>
        <div className="flow-privacy-policy" style={{ color: '#181818', fontSize: 20, cursor: 'pointer' }}>Privacy Policy</div>
      </div>
    </div>
  );
};

export default FlowAnimation;
