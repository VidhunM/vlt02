import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Business Card Overlay Component
function BusinessCardOverlay({ position, rotation, scale, cardData }) {
  const groupRef = useRef()

  // Create business card geometry
  const cardGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 1.8
    const height = 1.1
    const radius = 0.1
    
    shape.moveTo(-width / 2 + radius, height / 2)
    shape.lineTo(width / 2 - radius, height / 2)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius)
    shape.lineTo(width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2)
    shape.lineTo(-width / 2 + radius, -height / 2)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius)
    shape.lineTo(-width / 2, height / 2 - radius)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2)
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 4,
      curveSegments: 16
    })
  }, [])

  const cardMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.1,
      metalness: 0.8
    })
  }, [])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* First business card */}
      <mesh geometry={cardGeometry} material={cardMaterial} position={[0, 0.1, 0]} castShadow />
      {/* Second business card (slightly offset) */}
      <mesh geometry={cardGeometry} material={cardMaterial} position={[0.05, -0.1, 0.01]} castShadow />
    </group>
  )
}

// Logo Component
function Logo({ position, rotation, scale, type = 'K' }) {
  const groupRef = useRef()

  // Create logo geometry based on type
  const logoGeometry = useMemo(() => {
    if (type === 'K') {
      // Create K-shaped geometry
      const shape = new THREE.Shape()
      shape.moveTo(-0.3, 0.4)
      shape.lineTo(-0.1, 0.4)
      shape.lineTo(-0.1, 0.1)
      shape.lineTo(0.1, 0.3)
      shape.lineTo(0.3, 0.1)
      shape.lineTo(0.1, -0.1)
      shape.lineTo(0.1, -0.4)
      shape.lineTo(-0.1, -0.4)
      shape.lineTo(-0.1, -0.1)
      shape.lineTo(-0.3, 0.1)
      shape.lineTo(-0.3, 0.4)
      
      return new THREE.ExtrudeGeometry(shape, {
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 4,
        curveSegments: 16
      })
    } else {
      // Create B-shaped geometry
      const shape = new THREE.Shape()
      shape.moveTo(-0.3, 0.4)
      shape.lineTo(-0.1, 0.4)
      shape.lineTo(-0.1, 0.1)
      shape.lineTo(0.1, 0.1)
      shape.lineTo(0.1, 0.2)
      shape.lineTo(0.2, 0.2)
      shape.lineTo(0.2, 0.1)
      shape.lineTo(0.1, 0.1)
      shape.lineTo(0.1, -0.1)
      shape.lineTo(0.2, -0.1)
      shape.lineTo(0.2, -0.2)
      shape.lineTo(0.1, -0.2)
      shape.lineTo(0.1, -0.4)
      shape.lineTo(-0.1, -0.4)
      shape.lineTo(-0.1, -0.1)
      shape.lineTo(-0.3, -0.1)
      shape.lineTo(-0.3, 0.4)
      
      return new THREE.ExtrudeGeometry(shape, {
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 4,
        curveSegments: 16
      })
    }
  }, [type])

  const logoMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9
    })
  }, [])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={logoGeometry} material={logoMaterial} castShadow />
    </group>
  )
}

// Text Overlay Component
function TextOverlay({ position, rotation, scale, text, fontSize = 0.1, color = 0xffffff }) {
  const groupRef = useRef()

  // Create text geometry
  const textGeometry = useMemo(() => {
    const loader = new THREE.FontLoader()
    // Using a simple approach with plane geometry for text
    return new THREE.PlaneGeometry(text.length * fontSize * 0.6, fontSize)
  }, [text, fontSize])

  const textMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.9
    })
  }, [color])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={textGeometry} material={textMaterial} />
    </group>
  )
}

// Main Card component with branding elements
function Card({ index, position, rotation, scale, cardData }) {
  const meshRef = useRef()
  const cardGroupRef = useRef()

  // Create main card geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 3.5
    const height = 6
    const radius = 0.2
    
    shape.moveTo(-width / 2 + radius, height / 2)
    shape.lineTo(width / 2 - radius, height / 2)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius)
    shape.lineTo(width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2)
    shape.lineTo(-width / 2 + radius, -height / 2)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius)
    shape.lineTo(-width / 2, height / 2 - radius)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2)
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 4,
      curveSegments: 16
    })
  }, [])

  // Create material based on card theme
  const material = useMemo(() => {
    if (cardData.theme === 'gradient') {
      return new THREE.MeshStandardMaterial({
        color: 0xfff8dc, // Light yellow
        roughness: 0.1,
        metalness: 0.1
      })
    } else if (cardData.theme === 'teal') {
      return new THREE.MeshStandardMaterial({
        color: 0x2d5a5a, // Dark teal
        roughness: 0.1,
        metalness: 0.1
      })
    } else {
      // Photo background
      const loader = new THREE.TextureLoader()
      const texture = loader.load(cardData.imageUrl)
      
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.1,
        metalness: 0.1
      })
    }
  }, [cardData])

  useFrame((state) => {
    if (cardGroupRef.current) {
      cardGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.01
    }
  })

  return (
    <group ref={cardGroupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main card */}
      <mesh 
        ref={meshRef} 
        geometry={geometry}
        material={material}
        castShadow
        receiveShadow
      />
      
      {/* Top left text: "WE ARE KUE STUDIO." */}
      <TextOverlay 
        position={[-1.2, 2.5, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="WE ARE KUE STUDIO."
        fontSize={0.08}
        color={0xffffff}
      />
      
      {/* Top right text: "STRATEGY & CREATIVE AT THE SPEED OF YOUR BRAND." */}
      <TextOverlay 
        position={[1.2, 2.5, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="STRATEGY & CREATIVE AT THE SPEED OF YOUR BRAND."
        fontSize={0.06}
        color={0xffffff}
      />
      
      {/* Main K logo */}
      <Logo 
        position={[0, 0, 0.08]} 
        rotation={[0, 0, 0]} 
        scale={[2, 2, 1]} 
        type="K"
      />
      
      {/* Service keywords bottom left */}
      <TextOverlay 
        position={[-1.2, -2.2, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="BRAND"
        fontSize={0.06}
        color={0xffffff}
      />
      <TextOverlay 
        position={[-1.2, -2.4, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="WEB"
        fontSize={0.06}
        color={0xffffff}
      />
      <TextOverlay 
        position={[-1.2, -2.6, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="MOTION"
        fontSize={0.06}
        color={0xffffff}
      />
      <TextOverlay 
        position={[-1.2, -2.8, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="AI"
        fontSize={0.06}
        color={0xffffff}
      />
      
      {/* Copyright bottom right */}
      <TextOverlay 
        position={[1.2, -2.8, 0.03]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        text="© 2025 KUE CONCEPTS, LLC. ALL RIGHTS RESERVED."
        fontSize={0.04}
        color={0xffffff}
      />
      
      {/* Theme-specific elements */}
      {cardData.theme === 'gradient' && (
        <>
          {/* Background B logo */}
          <Logo 
            position={[0, 0, 0.01]} 
            rotation={[0, 0, 0]} 
            scale={[3, 3, 1]} 
            type="B"
          />
          {/* Human silhouettes */}
          <mesh position={[0, -2, 0.03]}>
            <boxGeometry args={[0.3, 0.8, 0.01]} />
            <meshBasicMaterial color={0x000000} />
          </mesh>
          <mesh position={[0.2, -2, 0.03]}>
            <boxGeometry args={[0.3, 0.8, 0.01]} />
            <meshBasicMaterial color={0x000000} />
          </mesh>
        </>
      )}
      
      {cardData.theme === 'teal' && (
        <>
          {/* Paper bags */}
          <mesh position={[-0.5, 0.5, 0.03]}>
            <boxGeometry args={[0.4, 0.6, 0.02]} />
            <meshBasicMaterial color={0xf5f5dc} />
          </mesh>
          <mesh position={[0.5, 0.5, 0.03]}>
            <boxGeometry args={[0.4, 0.6, 0.02]} />
            <meshBasicMaterial color={0x2d5a5a} />
          </mesh>
          {/* Bag text */}
          <TextOverlay 
            position={[-0.5, 0.2, 0.04]} 
            rotation={[0, 0, 0]} 
            scale={[1, 1, 1]} 
            text="NEIGHBORS AND Friends"
            fontSize={0.05}
            color={0x000000}
          />
          <TextOverlay 
            position={[0.5, 0.2, 0.04]} 
            rotation={[0, 0, 0]} 
            scale={[1, 1, 1]} 
            text="NEIGHBORS AND Friends"
            fontSize={0.05}
            color={0xffffff}
          />
        </>
      )}
    </group>
  )
}

// Carousel container
function CarouselGroup({ cards, activeIndex }) {
  const groupRef = useRef()
  const [targetRotation, setTargetRotation] = useState(0)
  const [currentRotation, setCurrentRotation] = useState(0)

  useFrame(() => {
    if (groupRef.current) {
      const lerp = 0.05
      setCurrentRotation(current => current + (targetRotation - current) * lerp)
      groupRef.current.rotation.y = currentRotation
    }
  })

  React.useEffect(() => {
    setTargetRotation((2 * Math.PI * activeIndex) / cards.length)
  }, [activeIndex, cards.length])

  const cardPositions = useMemo(() => {
    const positions = []
    const arcRadius = 6 // Smaller radius for tighter curve
    const spacing = 3.5 // Horizontal spacing between cards
    
    for (let i = 0; i < cards.length; i++) {
      const angle = (i / cards.length) * Math.PI * 2
      const offset = ((i - activeIndex) / cards.length) * Math.PI * 2
      
      // Determine card position
      const isCenter = Math.abs(Math.sin(offset)) < 0.3
      const isLeft = Math.sin(offset) < 0
      const isRight = Math.sin(offset) > 0
      
      let x, z, rotationY, tiltBack
      
      if (isCenter) {
        // Center card - front and center
        x = 0
        z = 0
        rotationY = 0
        tiltBack = 0
      } else if (isLeft) {
        // Left card - positioned left with curve
        const leftAngle = -Math.PI / 6 // -30 degrees
        x = Math.sin(leftAngle) * arcRadius
        z = Math.cos(leftAngle) * arcRadius - arcRadius
        rotationY = leftAngle * 0.8 // Angle to show edge
        tiltBack = 0.1 // Slight backward tilt
      } else {
        // Right card - positioned right with curve
        const rightAngle = Math.PI / 6 // 30 degrees
        x = Math.sin(rightAngle) * arcRadius
        z = Math.cos(rightAngle) * arcRadius - arcRadius
        rotationY = rightAngle * 0.8 // Angle to show edge
        tiltBack = -0.1 // Slight backward tilt
      }
      
      positions.push({
        position: [x, 0, z],
        rotation: [tiltBack, rotationY, 0],
        offset: offset,
        curvedAngle: Math.abs(Math.sin(offset))
      })
    }
    
    return positions
  }, [cards.length, activeIndex, currentRotation])

  return (
    <group ref={groupRef}>
      {cards.map((card, index) => {
        const { position, rotation, offset, curvedAngle } = cardPositions[index]
        const isActive = Math.abs(Math.sin(offset)) < 0.3
        
        // Scale: center card prominent, side cards slightly smaller
        const scale = isActive ? 1 : 0.85
        
        return (
          <Card
            key={index}
            index={index}
            position={position}
            rotation={rotation}
            scale={scale}
            cardData={card}
          />
        )
      })}
    </group>
  )
}

// Main component
const CardCarousel3D = ({ 
  cards = [
    { 
      theme: 'gradient',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
    },
    { 
      theme: 'teal',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
    },
    { 
      theme: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    { 
      theme: 'gradient',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    },
    { 
      theme: 'teal',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    { 
      theme: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
    },
  ]
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showNav, setShowNav] = useState(false)

  const handlePrevious = () => {
    setActiveIndex((i) => (i - 1 + cards.length) % cards.length)
  }

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % cards.length)
  }

  return (
    <div 
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      onMouseEnter={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={60} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-10, 5, -10]} 
          intensity={0.4}
        />
        <pointLight position={[0, 15, 10]} intensity={1} />
        
        {/* Ground */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -7, 0]} 
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color={0x0a0a0a} 
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Carousel */}
        <CarouselGroup 
          cards={cards} 
          activeIndex={activeIndex} 
        />

        {/* Camera controls */}
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={12}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
        />
      </Canvas>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '20px',
          fontSize: '32px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)'
          e.target.style.transform = 'translateY(-50%) scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.4)'
          e.target.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        ←
      </button>
      
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '20px',
          fontSize: '32px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)'
          e.target.style.transform = 'translateY(-50%) scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.4)'
          e.target.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        →
      </button>

      {/* Card indicators */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 10,
        opacity: showNav ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        {cards.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: index === activeIndex ? '40px' : '12px',
              height: '12px',
              background: index === activeIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      {/* Service keywords overlay */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '50px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        opacity: showNav ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        <div>BRAND</div>
        <div>WEB</div>
        <div>MOTION</div>
        <div>AI</div>
      </div>

      {/* Copyright overlay */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        right: '50px',
        color: 'white',
        fontSize: '12px',
        opacity: 0.8,
        opacity: showNav ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        © 2025 KUE CONCEPTS, LLC. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}

export default CardCarousel3D
