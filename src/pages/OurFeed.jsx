import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import FlowAnimation from "../components/FlowAnimation";

const IMAGES = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1688686804638-fadb460edc4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGlvdHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGlvdHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop",
];

function OurFeed() {
  const ringGroupRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Responsive cards per view and mobile detection
  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      if (width <= 768) {
        setCardsPerView(1);
      } else if (width <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    
    updateResponsive();
    window.addEventListener('resize', updateResponsive);
    return () => window.removeEventListener('resize', updateResponsive);
  }, []);
  
  // Extended highlights data
  const highlights = [
    {
      title: "OCTOBER 2025",
      description: "Kue is honored to partner on a new short film that melds meticulous storytelling with bold, purpose-driven motion GFX.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop"
    },
    {
      title: "SEPTEMBER 2025",
      description: "We're thrilled to begin a new partnership with award-winning leadership on upcoming brand, web, and AI campaigns.",
      image: IMAGES[3]
    },
    {
      title: "AUGUST 2025",
      description: "We refreshed our brand and website to reflect a sharper, more intentional identity aligned with our partners.",
      image: IMAGES[4]
    },
    {
      title: "JULY 2025",
      description: "Launching innovative design solutions that push creative boundaries and deliver exceptional user experiences.",
      image: IMAGES[5]
    },
    {
      title: "JUNE 2025",
      description: "Collaborating with industry leaders to create cutting-edge digital experiences that resonate with global audiences.",
      image: IMAGES[6]
    },
    {
      title: "MAY 2025",
      description: "Expanding our creative capabilities with new talent and advanced technologies to serve our growing client base.",
      image: IMAGES[7]
    },
    {
      title: "APRIL 2025",
      description: "Celebrating milestone achievements in design excellence and strategic brand positioning across multiple sectors.",
      image: IMAGES[8]
    },
    {
      title: "MARCH 2025",
      description: "Introducing breakthrough visual narratives that combine artistry with data-driven insights for maximum impact.",
      image: IMAGES[9]
    },
    {
      title: "FEBRUARY 2025",
      description: "Building stronger connections through thoughtful design that speaks directly to audience needs and aspirations.",
      image: IMAGES[10]
    }
  ];
  
  const maxIndex = Math.max(0, highlights.length - cardsPerView);
  
  // Reset index when cardsPerView changes
  useEffect(() => {
    setHighlightIndex((prev) => Math.min(prev, maxIndex));
  }, [cardsPerView, maxIndex]);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && selectedHighlight) {
        setSelectedHighlight(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedHighlight]);
  
  const handlePrev = () => {
    setHighlightIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setHighlightIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  
  // Build cylindrical ring structure (center column removed)
  const ringItems = useMemo(() => {
    const ringItems = [];
    let imgIdx = 0;
    
    // Responsive sizing for mobile
    const baseZ = isMobile ? -120 : -200; // Negative Z brings elements closer to camera
    const ringRadius = isMobile ? 220 : 440; // Reduced radius for mobile
    const outerRingRadius = isMobile ? 240 : 470; // Reduced radius for mobile
    const ringImageSize = isMobile ? 60 : 115; // Smaller images on mobile
    
    // Cylindrical ring: 3 vertical levels, each with 6 images in a circle
    const ringYLevels = isMobile ? [-70, 0, 70] : [-130, 0, 130]; // Reduced vertical spread on mobile
    const imagesPerLevel = 6;
    
    ringYLevels.forEach((y, levelIdx) => {
      // Use larger radius for 1st (0) and 3rd (2) rows
      const currentRadius = (levelIdx === 0 || levelIdx === 2) ? outerRingRadius : ringRadius;
      // Offset 2nd row (middle) by half angle step to position images between outer rows
      const angleOffset = (levelIdx === 1) ? (Math.PI / imagesPerLevel) : 0;
      
      for (let i = 0; i < imagesPerLevel; i++) {
        const angle = (i / imagesPerLevel) * Math.PI * 2 + angleOffset;
        const x = currentRadius * Math.sin(angle);
        const z = baseZ + currentRadius * Math.cos(angle);
        ringItems.push({
          src: IMAGES[imgIdx++ % IMAGES.length],
          x,
          y,
          z,
          size: ringImageSize,
          angle, // Store angle for rotation
          radius: currentRadius, // Store radius for animation
        });
      }
    });
    
    return ringItems;
  }, [isMobile]);

  // Animation: map scroll progress to rotation, then rotate the ring.
  useEffect(() => {
    const ringNode = ringGroupRef.current; // Ring container
    if (!ringNode) return;

    let lastRotY = 0; // degrees
    let autoRotY = 0; // Automatic rotation angle
    const ease = 0.08; // smoothing
    const autoRotSpeed = 0.3; // Automatic rotation speed (degrees per frame)
    const baseRotationOffsetX = 0; // No X tilt - keep everything centered
    const baseRotationOffsetZ = -350; // Fixed -350 degree Z-axis rotation (not rotating)
    const verticalOffset = isMobile ? -20 : -40; // Move structure slightly downward (less negative = down)
    const horizontalOffset = isMobile ? -30 : -60; // Move structure to left (negative = left)
    
    // Scroll stop detection
    let scrollTimeout = null;
    let isScrolling = false;
    let lastScrollTop = 0;

    // Helper: page scroll -> normalized [0,1]
    const getScrollProgress = () => {
      const h = document.documentElement;
      const scrollTop = window.scrollY || h.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const winH = window.innerHeight || 1;
      const maxScroll = Math.max(1, docHeight - winH);
      return Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    // Pre-store each child's data-attributes for performance
    const ringChildren = Array.from(ringNode.children);
    ringChildren.forEach((child) => {
      const dx = child.dataset.x ?? "0";
      const dy = child.dataset.y ?? "0";
      const dz = child.dataset.z ?? "0";
      const angle = child.dataset.angle ?? "0";
      const radius = child.dataset.radius ?? "440";
      child.__pos = {
        x: parseFloat(dx),
        y: parseFloat(dy),
        z: parseFloat(dz),
        angle: parseFloat(angle) || 0,
        radius: parseFloat(radius) || 440,
      };
      child.style.transformStyle = "preserve-3d";
      child.style.willChange = "transform";
    });

    // animation loop
    let raf = 0;
    const animate = () => {
      const progress = getScrollProgress(); // 0..1
      // map progress to a rotation range
      const targetRotY = progress * 360 * 0.9;
      lastRotY += (targetRotY - lastRotY) * ease;
      
      // Automatic rotation when scroll stops
      if (!isScrolling) {
        autoRotY += autoRotSpeed;
        if (autoRotY >= 360) autoRotY -= 360; // Keep in 0-360 range
      }
      
      // Combine scroll-based rotation with automatic rotation
      const finalRotY = lastRotY + autoRotY;

      // Apply centering with fixed -350 degree Z-axis rotation, upward and leftward offsets
      ringNode.style.transform = `translate(calc(-50% + ${horizontalOffset}px), calc(-50% + ${verticalOffset}px)) rotateX(${baseRotationOffsetX}deg) rotateZ(${baseRotationOffsetZ}deg)`;
      ringNode.style.transformStyle = "preserve-3d";

      // Update ring items: rotate around center and face camera
      const centerZ = isMobile ? -120 : -200; // Match the baseZ from useMemo (negative = closer)
      ringChildren.forEach((child) => {
        const p = child.__pos;
        // Use each item's stored radius (different for each row)
        const itemRadius = p.radius || (isMobile ? 220 : 440);
        // Calculate new position after rotation (using combined rotation)
        const rotatedAngle = p.angle + (finalRotY * Math.PI / 180);
        const newX = itemRadius * Math.sin(rotatedAngle);
        const newZ = centerZ + itemRadius * Math.cos(rotatedAngle);
        // Face camera: rotate Y to face outward (tangent to circle)
        const faceAngle = rotatedAngle * (180 / Math.PI);
        child.style.transform = `translate3d(${newX}px, ${p.y}px, ${newZ}px) rotateY(${faceAngle}deg)`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Scroll stop detection
    const onScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      
      // Check if scroll position changed
      if (Math.abs(currentScrollTop - lastScrollTop) > 1) {
        isScrolling = true;
        lastScrollTop = currentScrollTop;
        
        // Clear existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        // Set timeout to detect scroll stop (300ms after last scroll)
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 300);
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [ringItems, isMobile]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#000" }}>
      <style>{`
        @keyframes feedPan {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        /* minor CSS to help with rendering */
        .feed-3d-item img { backface-visibility: hidden; -webkit-backface-visibility: hidden; display:block; }
      `}</style>

      {/* Header */}
      <Header logoSrc={"/assets/Images/Vlt_logo1.png"} />

      {/* FEED Heading */}
      <section style={{ padding: "120px 24px 36px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
          <h1 style={{ fontSize: 72, lineHeight: 1, margin: 0, letterSpacing: 1 }}>FEED</h1>
          <div style={{ alignSelf: "center", fontSize: 14, letterSpacing: 1, whiteSpace: "nowrap" }}>
            LESS NOISE ✦ MORE SUBSTANCE
          </div>
        </div>
      </section>

      {/* 3D Scroll Gallery */}
      <section style={{ background: "#000", color: "#fff" }}>
        <div
          style={{
            padding: "28px 24px 0",
            maxWidth: 1200,
            margin: "0 auto",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 1 }}>VIBES</div>
            <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 760, textAlign: "right", letterSpacing: 0.5 }}>
              HANDPICKED INSPIRATIONS, INFLUENCES, AND VISUAL CANDY FROM THE KUE TEAM.
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "80vh" : "130vh",
            overflow: "hidden",
            perspective: isMobile ? "400px" : "800px",
            perspectiveOrigin: "50% 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Cylindrical Ring - Rotates on Scroll */}
          <div
            ref={ringGroupRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: "translate(-50%, -50%)",
              willChange: "transform",
              pointerEvents: "none",
            }}
          >
            {ringItems.map((it, idx) => {
              // Calculate initial face angle for ring items
              const faceAngle = it.angle * (180 / Math.PI);
              return (
                <div
                  key={`ring-${idx}`}
                  className="feed-3d-item feed-ring-item"
                  data-x={it.x}
                  data-y={it.y}
                  data-z={it.z}
                  data-angle={it.angle}
                  data-radius={it.radius}
                  data-is-center="false"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${it.x}px, ${it.y}px, ${it.z}px) rotateY(${faceAngle}deg)`,
                  }}
                >
                  <div
                    style={{
                      width: it.size,
                      height: it.size,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                      transform: "translate(-50%, -50%)",
                      borderRadius: 0,
                      overflow: "hidden",
                      background: "#111",
                      willChange: "transform",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <img
                      src={it.src}
                      alt="feed"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transform: "translateZ(20px)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section style={{ background: "#fff", color: "#000" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px 24px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <h2 style={{ fontSize: 36, margin: 0, letterSpacing: 1 }}>HIGHLIGHTS</h2>
          <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 560, textAlign: "right", letterSpacing: 0.5 }}>
            BITE-SIZED UPDATES AND HIGHLIGHTS FROM KUE STUDIO.
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 64px", position: "relative" }}>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={highlightIndex === 0}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "2px solid #000",
              background: highlightIndex === 0 ? "#f5f5f5" : "#fff",
              color: highlightIndex === 0 ? "#999" : "#000",
              cursor: highlightIndex === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              if (highlightIndex > 0) {
                e.currentTarget.style.background = "#000";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (highlightIndex > 0) {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }
            }}
          >
            ←
          </button>
          
          <button
            onClick={handleNext}
            disabled={highlightIndex >= maxIndex}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "2px solid #000",
              background: highlightIndex >= maxIndex ? "#f5f5f5" : "#fff",
              color: highlightIndex >= maxIndex ? "#999" : "#000",
              cursor: highlightIndex >= maxIndex ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              if (highlightIndex < maxIndex) {
                e.currentTarget.style.background = "#000";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (highlightIndex < maxIndex) {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }
            }}
          >
            →
          </button>
          
          {/* Carousel Container */}
          <div
            style={{
              overflow: "hidden",
              padding: "0 60px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 24,
                transform: `translateX(calc(-${highlightIndex * (100 / cardsPerView)}% - ${highlightIndex * (24 / cardsPerView)}%))`,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {highlights.map((highlight, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedHighlight(highlight)}
                  style={{
                    flex: `0 0 calc(${100 / cardsPerView}% - ${(24 * (cardsPerView - 1)) / cardsPerView}px)`,
                    background: "#fff",
                    borderRadius: 10,
                    boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", background: "#eee", overflow: "hidden" }}>
                    <img
                      src={highlight.image}
                      alt="highlight"
                      style={{
                        width: "120%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        willChange: "transform",
                        animation: "feedPan 12s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, marginBottom: 10 }}>
                      {highlight.title}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "#333" }}>
                      {highlight.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Popup Modal - Simple Newspaper Frame */}
      {selectedHighlight && (
        <div
          onClick={() => setSelectedHighlight(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "850px",
              maxHeight: "90vh",
              width: "100%",
              background: "#fff",
              border: "4px solid #000",
              borderRadius: "0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              cursor: "default",
              animation: "slideUp 0.3s ease",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedHighlight(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "36px",
                height: "36px",
                borderRadius: "0",
                border: "2px solid #000",
                background: "#fff",
                color: "#000",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s ease",
                lineHeight: "1",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#000";
              }}
            >
              ×
            </button>

            {/* Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#000",
                overflow: "hidden",
                position: "relative",
                borderBottom: "3px solid #000",
              }}
            >
              <img
                src={selectedHighlight.image}
                alt={selectedHighlight.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                padding: "32px 40px",
                overflowY: "auto",
                background: "#fff",
              }}
            >
              {/* Simple Divider Line */}
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  background: "#000",
                  marginBottom: "24px",
                }}
              />
              
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  marginBottom: "16px",
                  color: "#000",
                  fontFamily: "'Times New Roman', serif",
                  textTransform: "uppercase",
                  lineHeight: "1.3",
                }}
              >
                {selectedHighlight.title}
              </h2>

              {/* Simple Divider */}
              <div
                style={{
                  width: "80px",
                  height: "1px",
                  background: "#000",
                  marginBottom: "20px",
                }}
              />

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#333",
                  margin: 0,
                  fontFamily: "'Georgia', serif",
                }}
              >
                {selectedHighlight.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <FlowAnimation />
    </div>
  );
}

export default OurFeed;
