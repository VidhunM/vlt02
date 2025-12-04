import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import FlowAnimation from '../components/FlowAnimation';

const SERVICES = [
  // 1st - vulture logo
  { img: 'https://images.unsplash.com/photo-1557343569-b1d5b655b7cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHJvbmVzfGVufDB8MXwwfHx8MA%3D%3D', keywords: ['WEB', 'STRATEGY', 'UI/UX'] }, // 2nd - drone-technology
  { img: 'https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfDF8MHx8fDA%3D', keywords: ['MOTION', 'CONTENT', 'SOCIAL'] }, // 3rd - artificial-intelligence // 4th - vulture logo
  { img: 'https://plus.unsplash.com/premium_photo-1688678097958-0620a452f0e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW90fGVufDB8MXwwfHx8MA%3D%3D', keywords: ['AI', 'INNOVATION', 'CONSULT'] }, // 5th - iot-development
  { img: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D', keywords: ['DIGITAL', 'STRATEGY', 'BRAND'] }, // 6th - application-development
  { img: 'https://images.unsplash.com/photo-1557343569-b1d5b655b7cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHJvbmVzfGVufDB8MXwwfHx8MA%3D%3D', keywords: ['WEB', 'STRATEGY', 'UI/UX'] }, // 2nd - drone-technology
  { img: 'https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfDF8MHx8fDA%3D', keywords: ['MOTION', 'CONTENT', 'SOCIAL'] }, // 3rd - artificial-intelligence // 4th - vulture logo
  { img: 'https://plus.unsplash.com/premium_photo-1688678097958-0620a452f0e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW90fGVufDB8MXwwfHx8MA%3D%3D', keywords: ['AI', 'INNOVATION', 'CONSULT'] }, // 5th - iot-development
  { img: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D', keywords: ['DIGITAL', 'STRATEGY', 'BRAND'] }, // 6th - application-development
];

const CARD_COUNT = SERVICES.length;

const PROJECTS = [
  {
    title: 'drone-technology',
    meta: 'DTC, HEALTH & WELLNESS • 1-MONTH',
    description:
      'A new wellness brand thoughtfully built from the ground up with purpose and precision. We crafted the website, store and packaging to confidently compete alongside established names in the space.',
    image:
      'https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJvbmVzfGVufDB8fDB8fHww',
    link: '#'
  },
  {
    title: 'artificial-intelligence',
    meta: 'TECH, STARTUP • 1-MONTH',
    description:
      'Launching with a clear roadmap and strong identity, the site we built keeps pace with an evolving brand and supports growth without sacrificing performance.',
    image:
      'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    link: '#'
  },
  {
    title: 'iot-development',
    meta: 'DTC, HOSPITALITY • 2-MONTHS',
    description:
      'From packaging to storefront, we unified brand touchpoints and built an experience that scales from local to national demand.',
    image:
      'https://plus.unsplash.com/premium_photo-1688678097473-2ce11d23e30c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW90fGVufDB8fDB8fHww',
    link: '#'
  },
  {
    title: 'application-development',
    meta: 'HEALTH & FITNESS • 6-WEEKS',
    description:
      'A conversion-focused site with strong visuals and clear messaging, designed to showcase programs and drive signups across devices.',
    image:
      'https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
    link: '#'
  }
];

const OurService = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState({});
  const zigzagRefs = useRef([]);

  // Add mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);

  // Mobile detection effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => setActiveIndex((i) => (i + 1) % CARD_COUNT), 3500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  useEffect(() => {
    const elems = () => Array.from(document.querySelectorAll('[data-zoom="true"]'));
    const onScroll = () => {
      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = window.scrollY + viewportHeight / 2;
      elems().forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const norm = Math.min(distance / viewportHeight, 1);
        const intensity = 1 - norm;
        const scale = 0.96 + intensity * 0.08;
        el.style.transform = `scale(${scale.toFixed(3)})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleNav = (dir) => {
    setAutoRotate(false);
    setActiveIndex((idx) => (idx + (dir === 'next' ? 1 : -1) + CARD_COUNT) % CARD_COUNT);
    setTimeout(() => setAutoRotate(true), 5000);
  };

  useEffect(() => {
    if (!zigzagRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-project-index'));
            setVisibleProjects((prev) => {
              if (prev[index]) return prev;
              return { ...prev, [index]: true };
            });
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    zigzagRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header logoSrc={'/assets/Images/Vlt_logo1.png'} />
      <div style={{ 
        padding: '2em 0', 
        textAlign: 'center',
        paddingTop: isMobile ? '10em' : '6em',
        paddingBottom: isMobile ? '0' : '2em',
        marginBottom: isMobile ? '-2em' : '0'
      }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.6em', letterSpacing: '1px' }}>OUR SERVICES</h1>
        <div style={{ fontSize: '1.1em', opacity: 0.85, margin: isMobile ? '0.4em 0 0' : '0.4em 0 2.5em' }}>
          Design. Strategy. Execution. At the speed of your brand.
        </div>
      </div>

      {/* 3D Carousel */}
      <div
        style={{
          perspective: isSmallMobile ? 1500 : isMobile ? 1800 : 3500,
          width: '100%',
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '85vh',
          marginTop: isMobile ? '4em' : '4em',
          marginBottom: isMobile ? '-4em' : '0'
        }}
      >
        <div
          className="service-carousel-3d"
          style={{
            position: 'relative',
            width: isMobile ? '100vw' : 'min(90vw, 880px)',
            height: isMobile ? 'auto' : 'min(80vh, 600px)',
            transformStyle: 'preserve-3d',
            overflow: 'visible',
            paddingBottom: isMobile ? 0 : 120
          }}
        >
          {SERVICES.map((s, i) => {
            let pos = ((i - activeIndex) + CARD_COUNT) % CARD_COUNT;
            if (pos > CARD_COUNT / 2) pos -= CARD_COUNT;

            const angle = pos * 45; // smoother separation
            // Responsive radius
            const radius = isSmallMobile ? 210 : isMobile ? 480 : 540;
            const rad = (angle * Math.PI) / 180;
            const translateZ = Math.cos(rad) * radius;
            const translateX = Math.sin(rad) * radius;
            const rotateY = angle;
            const scale = 1;
            const opacity = 1;
            const zIndex = 1000 + Math.round(translateZ);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                                    // Responsive card sizes - square on mobile
                  width: isSmallMobile 
                    ? 'clamp(170px, 38vw, 260px)' 
                    : isMobile 
                    ? 'clamp(330px, 55vw, 460px)' 
                    : 'clamp(280px, 32vw, 410px)',
                  height: isSmallMobile 
                    ? 'clamp(170px, 38vw, 260px)' 
                    : isMobile 
                    ? 'clamp(330px, 55vw, 460px)' 
                    : 'clamp(390px, 48vw, 540px)',
                  marginLeft: isSmallMobile 
                    ? 'calc(-1 * clamp(170px, 38vw, 260px) / 2)' 
                    : isMobile 
                    ? 'calc(-1 * clamp(330px, 55vw, 460px) / 2)' 
                    : 'calc(-1 * clamp(280px, 32vw, 410px) / 2)',
                  marginTop: isSmallMobile 
                    ? 'calc(-1 * clamp(170px, 38vw, 260px) / 2)' 
                    : isMobile 
                    ? 'calc(-1 * clamp(330px, 55vw, 460px) / 2)' 
                    : 'calc(-1 * clamp(390px, 48vw, 540px) / 2)',
                  borderRadius: 30,
                  overflow: 'hidden',
                  background: '#f5f5f5', // Dark white background for modern creative studio vibe
                  transformOrigin: 'center center',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  zIndex,
                  opacity,
                  // Enhanced layered drop shadows for depth and modern aesthetic
                  boxShadow: `
                    0 4px 6px -1px rgba(0, 0, 0, 0.08),
                    0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 20px 25px -5px rgba(0, 0, 0, 0.12),
                    0 30px 40px -8px rgba(0, 0, 0, 0.15)
                  `,
                }}
              >
                <div style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src={s.img}
                    alt="service"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: s.img.includes('Vlt_logo') ? 'contain' : 'cover',
                      filter: s.img.includes('Vlt_logo') ? 'none' : 'brightness(1.02) saturate(1.05)',
                      backgroundColor: s.img.includes('Vlt_logo') ? 'transparent' : 'transparent',
                      padding: s.img.includes('Vlt_logo') ? '20px' : '0',
                      backfaceVisibility: 'inherit',
                    }}
                  />
                  {/* Subtle overlay for light background - maintains image clarity while adding depth */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zigzag Project Sections */}
      {PROJECTS.map((p, idx) => {
        const isReversed = idx % 2 === 1;
        const isFirstProject = idx === 0;
        return (
          <section
            key={p.title + idx}
            style={{
              width: '100%',
              maxWidth: 1200,
              margin: isMobile && isFirstProject ? '0 auto 160px' : isMobile ? '60px auto' : '160px auto',
              padding: '0 24px'
            }}
          >
            <div
              data-project-index={idx}
              ref={(el) => {
                zigzagRefs.current[idx] = el;
              }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: 32,
                flexDirection: isReversed ? 'row-reverse' : 'row',
                opacity: visibleProjects[idx] ? 1 : 0,
                transform: visibleProjects[idx]
                  ? 'translateX(0)'
                  : `translateX(${isReversed ? 80 : -80}px)`,
                transition: 'opacity 0.7s ease, transform 0.7s ease'
              }}
            >
              <div
                style={{
                  flex: '1 1 380px',
                  minWidth: 280,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  willChange: 'transform',
                  transition: 'transform 0.15s ease-out'
                }}
                data-zoom="true"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: '1 1 420px', minWidth: 280 }}>
                <h2 style={{ fontSize: '48px', lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '0.5px' }}>
                  {p.title}
                </h2>
                <div style={{ fontSize: 14, color: '#7a7a7a', marginBottom: 18, marginTop: 12 }}>
                  {p.meta}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#222', margin: '0 0 22px', maxWidth: 620 }}>
                  {p.description}
                </p>
              </div>

            </div>
          </section>
        );
      })}

      {/* Flow Animation */}
      <FlowAnimation />
    </div>
  );
};

export default OurService;
