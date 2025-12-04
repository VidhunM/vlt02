import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeroThree from '../components/HeroThree'
import ProjectSection from '../components/ProjectSection'
import StatisticsSection from '../components/StatisticsSection'
import MinimalistNav from '../components/MinimalistNav'
import FlowAnimation from '../components/FlowAnimation'
import { navigateWithCircle } from '../utils/navigation'

const SERVICES = [
  {
    label: 'Our Services',
    title: 'One Technology',
    description:
      'Unified technology solutions that integrate seamlessly across your entire business ecosystem. We provide comprehensive technology services that streamline operations, enhance productivity, and drive innovation through a single, cohesive platform.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=2015&auto=format&fit=crop&q=80'
  },
  {
    label: 'Our Services',
    title: 'Artificial Intelligence',
    description:
      'Cutting-edge AI solutions that transform your business through machine learning, natural language processing, and intelligent automation. We develop AI-powered systems that enhance decision-making, optimize processes, and unlock new possibilities for growth and innovation.',
    image: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=2070&auto=format&fit=crop&q=80'
  },
  {
    label: 'Our Services',
    title: 'IoT Development',
    description:
      'End-to-end Internet of Things solutions that connect devices, sensors, and systems to create smart, interconnected ecosystems. We build scalable IoT platforms that enable real-time data collection, analysis, and automation for enhanced operational efficiency and innovation.',
    image: 'https://plus.unsplash.com/premium_photo-1688678097473-2ce11d23e30c?w=2064&auto=format&fit=crop&q=80'
  },
  {
    label: 'Our Services',
    title: 'Application Development',
    description:
      'Custom application development for web, mobile, and desktop platforms. We create robust, scalable applications tailored to your business needs, using modern frameworks and technologies to deliver high-performance solutions that drive user engagement and business growth.',
    image: 'https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?w=1973&auto=format&fit=crop&q=80'
  }
]

const CONTACT_FORM_ENDPOINT =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_FORM_URL) ||
  'https://script.google.com/macros/s/AKfycbx4YMBPlJeKQOv9y6vidWxZA4PxXhUe3pwbF5WoANYuA5hVAmoA4K0rhUdjh9M7dg38/exec'

const Home = () => {
  const emblemRef = useRef(null)
  const servicesRef = useRef(null)
  const excellenceRef = useRef(null)
  const excellenceWrapperRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isExcellencePinned, setIsExcellencePinned] = useState(false)
  const [isExcellencePast, setIsExcellencePast] = useState(false)
  const [excellenceScrollProgress, setExcellenceScrollProgress] = useState(0)
  const [serviceProgress, setServiceProgress] = useState(0)
  const [serviceRelease, setServiceRelease] = useState(0)
  const [isServicesMobile, setIsServicesMobile] = useState(false)
  const [mobileServiceIndex, setMobileServiceIndex] = useState(0)
  const [selectedClient, setSelectedClient] = useState(0)
  const [activeCapability, setActiveCapability] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const lastScrollRef = useRef(0)
  const capabilitiesRef = useRef(null)
  const [imageTransform, setImageTransform] = useState(0)
  const [imageScale, setImageScale] = useState(1)
  const [textTransform, setTextTransform] = useState(0)
  const [textOpacity, setTextOpacity] = useState(1)
  const contactRef = useRef(null)
  const [textFillProgress, setTextFillProgress] = useState(0)
  const navigate = useNavigate()

  const handleNavigationClick = (event, path) => {
    navigateWithCircle(event, path, () => {
      navigate(path)
    })
  }

  const handleMobileServicePrev = () => {
    setMobileServiceIndex((prev) => (prev > 0 ? prev - 1 : totalServices - 1))
  }

  const handleMobileServiceNext = () => {
    setMobileServiceIndex((prev) => (prev < totalServices - 1 ? prev + 1 : 0))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        body: formData
      })

      alert('Form submitted successfully!')
      form.reset()
    } catch (error) {
      console.error('Contact form submission failed', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  const floatingIcons = [
    // Removed `ps` and `gpt` per request
    {
      id: 'chimp',
      color: '#2b1800',
      accent: 'rgba(255, 193, 7, 0.45)',
      position: { bottom: '20%', left: '9%' },
      delay: '1.1s',
      size: 134,
      rotation: 12
    },
    {
      id: 'strap',
      color: '#000',
      accent: 'rgba(0, 0, 0, 0.3)',
      position: { bottom: '18%', right: '7%' },
      delay: '1.8s',
      size: 130,
      rotation: -8
    }
  ]

  const renderLogoShape = (iconId) => {
    switch (iconId) {
      case 'ps':
        return (
          <g transform="translate(60 60)">
            <ellipse rx="22" ry="22" fill="#0F3C68" />
            <path
              d="M-12 -15v30h7.2c8.6 0 13.6-5.6 13.6-14.9 0-9.5-5-15.1-13.6-15.1H-12zm7.4 22.6H-6v-15.2h1.4c4.2 0 6.6 2.8 6.6 7.5 0 4.5-2.4 7.7-6.6 7.7z"
              fill="#8DD3FF"
            />
            <path
              d="M9.5 -9.5c-3.8-2.5-11.6-1.1-11.2 4.2 0.3 3.5 3.4 5.4 7.6 6.8 3.7 1.2 5.2 2 5.2 3.6 0 2.2-3.1 2.9-5.6 1.6-1.6-0.8-2.8-2-3.6-3.1l-4.6 4.5c2 2.9 5.2 5.2 9.9 5.2 6 0 10.3-3.5 10.3-8.9 0-3.5-1.8-6-6.9-7.9-3.1-1.2-5-1.7-5-3.3 0-1.4 1.3-2.2 3.6-2.2 1.8 0 3.8 0.7 5.5 2l4.2-4.5c-1.7-1.8-3.9-3.2-6.4-4.1z"
              fill="#8DD3FF"
            />
          </g>
        )
      case 'gpt':
        return (
          <g transform="translate(60 60)">
            <circle r="22" fill="#10765A" />
            <path
              d="M0-14c6 0 11 5 11 11 0 5-3 9-9 12-6 3-10 7-10 13 0 6 5 11 11 11"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M-12-2c-5 0-9-4-9-9 0-6 5-11 11-11 5 0 9 3 11 8 2 6 6 9 12 9 6 0 11-5 11-11"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )
      case 'chimp':
        return (
          <g transform="translate(60 60)">
            <circle r="22" fill="#FFD25A" />
            <circle cx="-6" cy="-5" r="3" fill="#3B2200" />
            <circle cx="6" cy="-5" r="3" fill="#3B2200" />
            <path
              d="M-10 4c2 5 6 8 10 8s8-3 10-8"
              fill="none"
              stroke="#3B2200"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M-15 -2c-2-6 2-12 9-13 6-1 11 2 12 7"
              fill="none"
              stroke="#3B2200"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )
      case 'strap':
        return (
          <g transform="translate(60 60)">
            <circle r="22" fill="#ffffff" stroke="#141414" strokeWidth="2" />
            <path
              d="M-10 -12h12c6 0 10 3 10 8 0 4-3 7-7 7h-10c-3 0-5 2-5 4s2 4 5 4h13"
              fill="none"
              stroke="#141414"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )
      default:
        return null
    }
  }

  const renderIconSvg = (icon) => {
    const svgSize = icon.size
    const colors = {
      ps: {
        outer: ['#FCFDFF', '#E3F1FF'],
        stroke: '#BFD9FF',
        inner: '#0E3C6F',
        innerStroke: '#1390FF',
        text: '#E3F3FF'
      },
      gpt: {
        outer: ['#FCFFFD', '#E3FFF5'],
        stroke: '#C4F3E1',
        inner: '#0C6F52',
        innerStroke: '#19B287',
        text: '#FFFFFF'
      },
      chimp: {
        outer: ['#FFFDF4', '#FFEEC6'],
        stroke: '#FFE3A5',
        inner: '#F4B000',
        innerStroke: '#FFCD32',
        text: '#402100'
      },
      strap: {
        outer: ['#FFFFFF', '#F2F2F2'],
        stroke: '#F0F0F0',
        inner: '#FFFFFF',
        innerStroke: '#CFCFCF',
        text: '#111111'
      }
    }
    const palette = colors[icon.id] || colors.ps
    const innerRect = { x: 36, y: 26, width: 48, height: 68, rx: 22, ry: 22 }
    return (
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="contact-icon-svg"
      >
        <defs>
          <linearGradient id={`outer-gradient-${icon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.outer[0]} />
            <stop offset="100%" stopColor={palette.outer[1]} />
          </linearGradient>
          <linearGradient id={`inner-gradient-${icon.id}`} x1="30%" y1="20%" x2="80%" y2="80%">
            <stop offset="0%" stopColor={palette.innerStroke} stopOpacity="0.9" />
            <stop offset="100%" stopColor={palette.inner} />
          </linearGradient>
          <filter id={`glow-${icon.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        <clipPath id={`inner-clip-${icon.id}`}>
            <rect {...innerRect} />
        </clipPath>
        </defs>
        <g filter={`url(#glow-${icon.id})`} transform={`rotate(${icon.rotation || -15} 60 60)`}>
          <rect
            x="16"
            y="6"
            width="88"
            height="108"
            rx="30"
            ry="30"
            fill={`url(#outer-gradient-${icon.id})`}
            stroke={palette.stroke}
            strokeWidth="1.4"
          />
          <rect
            {...innerRect}
            fill={`url(#inner-gradient-${icon.id})`}
            stroke={palette.innerStroke}
            strokeWidth="1.8"
          />
        <g clipPath={`url(#inner-clip-${icon.id})`}>
            <rect
              {...innerRect}
              fill={palette.inner}
              opacity="0.15"
            />
            {renderLogoShape(icon.id)}
          </g>
        </g>
      </svg>
    )
  }

  const easeProgress = (t, power = 1.4) => {
    if (t <= 0) return 0
    if (t >= 1) return 1
    return Math.pow(t, power)
  }

  // Calculate text color based on fill progress (gray to black interpolation)
  const getTextColor = (progress) => {
    const eased = easeProgress(progress, 3)
    const gray = [153, 153, 153] // #999
    const black = [0, 0, 0]
    const r = Math.round(gray[0] + (black[0] - gray[0]) * eased)
    const g = Math.round(gray[1] + (black[1] - gray[1]) * eased)
    const b = Math.round(gray[2] + (black[2] - gray[2]) * eased)
    return `rgb(${r}, ${g}, ${b})`
  }

  // Render all text with letter-by-letter animation across all rows
  const renderAnimatedText = () => {
    const textLines = [
      'THINK OF US AS YOUR DEDICATED,',
      'IN-HOUSE CREATIVE DEPARTMENT',
      'NO SCOPE LIMITATIONS. EASILY SUBMIT',
      'AND MONITOR TASKS WITH ENDLESS REVISIONS',
      'UNTIL YOU ARE 100% SATISFIED',
      'WITH EVERYTHING WE WORK ON'
    ]
    
    const lineLengths = textLines.map((line) => line.length)
    const totalLetters = lineLengths.reduce((sum, len) => sum + len, 0)
    let cumulativeLength = 0

    return textLines.map((line, lineIndex) => {
      const lineLength = lineLengths[lineIndex]
      const lineStartRatio = totalLetters === 0 ? 0 : cumulativeLength / totalLetters
      const lineSpanRatio = totalLetters === 0 ? 1 : lineLength / totalLetters
      cumulativeLength += lineLength

      const rawLineProgress = (textFillProgress - lineStartRatio) / lineSpanRatio
      const clampedLineProgress = Math.max(0, Math.min(1, rawLineProgress))
      const easedLineProgress = easeProgress(clampedLineProgress, 4.5)
      const filledLetters = Math.floor(lineLength * easedLineProgress)

      return (
        <React.Fragment key={lineIndex}>
          {line.split('').map((letter, letterIndex) => {
            const isFilled = letterIndex < filledLetters
            return (
              <span
                key={`${lineIndex}-${letterIndex}`}
                style={{
                  color: isFilled ? '#000' : getTextColor(easedLineProgress),
                  transition: 'color 0.15s linear'
                }}
              >
                {letter}
              </span>
            )
          })}
          {lineIndex < textLines.length - 1 && <br />}
        </React.Fragment>
      )
    })
  }

  // Client data with different images
  const clients = [
    {
      name: "HBO",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqlwqCEJgcSfil9jZ0-_Gy5Gh86FOK1j6nA&s",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      name: "Disney",
      logo: "data:image/png;base64,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",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      name: "Stanford",
      logo: "data:image/png;base64,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",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "The Salvation Army",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABgFBMVEX///8AAAAYH2W2BiGxAAAZIGm9BiK2AB+zAAC6BiK+BiK1ABoAAFgAAFzy7QYZIGoAAAazAAv38gbt7e20ABPIyMj39/fl5eXZ2dmsAAD68vPz4uR7e3vn5+fd3d23t7ekpKR3BBXR0dFdXV0AAFGMBRmvr6+cnJwVG1kOF2IADV8PFEGtBh+fBR1VAw+UBRs+Pj7//w8JDChEAgxhAxFvBBRRUVGTk5NpaWkxMTETGE7t0dTTiI7kubzCTliAgICyrg55dgBdWwDv19nfrLBERETpx8oFBxcqAQfGW2TMcXhBAgvm4Q/X0hFsag8sLA4/PgAMDzIAAEqtrr8ZGQAAABy8MT+5HzDanaIbAAS/QEw0AQkpKSkRERHKxQ+Nig+mow5LSQCPkKlUVoJ2d5fDw9AyN3AAADRiZYsgJV02NQA9QHS3uMp/fQDWk5kjAQYbGQwyMgy8si2fmxgnKBOgobZGRAA5OUUbHCuJiqVXWXcCDU4VFioxMUfKanJHS3uQRqCaAAAgAElEQVR4nO19iVsa27LvKrqBZgw0gwgoCE4gDsQBnIE4RAWiO85GwERzsk1M4iPG5O1zk3/9Vq3uhkaz993vfO8mBzz1fQlzS/+o4Ve1alUz9h9pYwm03PxHfiBDPdq9mQkfY76JF42X/gObJn4/v4mfNp7pApidBYg0nogP/vRv9e8q8dVoVwAg03wmCyTNxxEII6iRrOfnf7l/O5nl2OhsrZceDzUfewBWZwB8P/+r/fuJ/44isQw9XtU98YKeWG4+fmgq1tV0SWhmLVgo4OkUiWvarO7DEz/hC/47ic5/szAHJ9J8eAqQbeqaAt6M7sMvwj/lO/67SBZ0EY6wmJjVvJY/4/EBvuyLqS8rPk1vp3F4IPHRE/UFeqJ6Bx6AF3Gysq7GM+i0so0HkSHfIMxO6CMAquJydgbiP+UL/1LxKYrSpAqZKKET070FbfBU/5EZfJjVhUfFbpfZAxD/BD9XvSW1qJJil/7mwx5uhL2Nx+F7n+9kUVhnvIlHtAUd9OguPatabvFYfsWHPQAbVISwOZ1YzfqbT5y2OLHdsp6UAjxrguXPxuN3qURHyxC0mh2CVdUpzyAUanoPD9t5aH03LLdEx46WIUBLi+qeiEKu0DS8ZaiWdGBMQK4FrC5y/xG9U+toyfSSk+5pPoFgVZq0cxVyMoCW0/SCSy7rwZrloTSiD5+dLKgUMYBmwYrASn9qoAdQTF82FA31rAUssuEmJXsY0kKUIqhLNe2xB1WpUm0QMYRODxbxCB3MD0OIDzQsCcFyypqb8sGZXG5Y5SCUZT1Ys/BRHykfhvTq8z0EqyZXVZ45hP79o1N7cRZKNR1YQ3Caf3BWyNjp5bMGsySwakXVvLKQy4HsUiAJwHX6UxMsNMLKpwdDsZqSgUojZ0Gwcp/SZcUuX0CxCqWyUrMJQ64ETbBmoVyE6C/4tr9YugC9uEoQEKz/A6WSwkTBlT6DmuLv/ejs85DWwMJIiPd7/uyQHSyzu0gQFJOKEM8qp7eJafbCWdoF+RIvLCO1R4PUwEI6WqrAQ6uTconCldOlMAQOFjhzFOciUC0CXCvBEU2yhpqmgjULVwhd9Nd95V8nHtSTnMIffBysepoAyvD7IG9DL1LXcvq6AdYQPMN78NCWKxRZ5R6IcFDAcqXryNvjUKwjWCViEllyZBpYGAmLldZlnwckgwD59CnxBwUsZKZIRRHBAt2vQJghbyg3wJqFunz6cIp+d4SWbSolWtdRwfqczkMA/TtCAvkiTAxiFuTSwBqCbXwZHky14a7EEQgZbc4fU8CCEiIEVSfdvUYH9gIwY1TBIiMs3VkSe1BCq6vl9GdYDahg5ckClbvERKGafkZFVQJrFrVs9wGV3u8LcEflgriKkMuJN8UaB6tUUxy6AlYUCukqPGArVFYuOECaOtXS12R0HMQSah2/+4l7eWfpQa1T3Be+hlggv53jUCCRql1y00OTlKHiVJ9EsCrys5ZF/gcoig7JnzSwEJ8rWbl3nS6k6w2w8ooRPphlih8JXy91YZjTwMrLzmIOpVavykVFmYhsncqlh7Va+COJcQjO0vVaCbavciU5jWAVi6VSCf93yuliLv8JfdZZSb6Gh26Fqh0iNS9xZOrlSxc05Vm5XnGmnRW5IitG+KCtUO3yu3LKciV/qoPpsnn3+qqCL+c4iNn/+YCdLJgflp3pSoFjUah9VsyylC4VFJWrnJFTy1fSzvrHh8xIWZTxhS5nXdWps7TMXVMVHZecJmpaxTvKix/rToyHvFT4MBtxI7NUSjhrGBxBk6c7p/VifVchFU7Vs6OUlX6I1YcJlh9OPWyGfFalWkaWsOuUi3r/jv7Kmc4RirWKk2M6yHpOH6qTnwDo8ikaVSSX7irAXfnIfZmM7yhQxSHyQBr+fiCZ7SuIQA5dVUXRKFehmqsUnRj9nMVSBZmEaoOfirITdcuXgSo8lIYQTTyqdgTAWQeX69NnypdP87kicqpatVz4fPn5rJxH4yum06UaqZuLg7kKlVzDCnv/7OidJuFTpfcYPXhOde6ldLFWdt0zw+t8DplFWX1QTJ+pLfCRh+O6PAD8pLNltEDkDJV0qcopguvxyNywQZHhuZHHCkOtOWViWWU0TsUKY7MQ/ZXf/+dKdveaGrAigJ4byunaJwJlZ87wyGhEmJKORAJvjA670TC3Q+pWoEUzTBZrpFCeOPr9X30GP1F6qZ8hjuQBc0IXEByP5wxGVaWSLxlL4gN77CZpcDgeDSsKBuj4z5apWelz6UFweY9WFZ4pp0vPwHdbl9NEP3eGNaRQ7OjQXiYNie+MvbE/f/catW2E8JTlIgQwP8qlq3u/9Cx+lswsKwvKMSjKtLDzmdYldgwJhyOhYWVMMD/z9HMFe/4bYw4DqdecC67RFr9AjTBTSzWZzi7Z+AGyPOh/uSIqeobeZ284YX/7/PnrpGaFX9nzXvYq4bhATTSyXruhv/edw24YoX74KyflRF/oCJ7ljl8Xi8Al3HLf7kQfhOne3KPk6wt65ZWqW/YLFuhhFw67nz1nN+y5I3mOr35FZ78H24gVhkT8fIC2DnT8Us/MWTEPexG2V5ed27COVvcGrfLNO+a3K2A5lPc5fmdd6LXYeRJRu0HgHAbjCLhKsly+ZZFbKOQeQN3UD/U0hkLXKhR3YYf8OoLxytHfxb5yQ0Q9Cvz2W4C9PGfv0GOxhOOGBfod3HcZh9G9FyG8B/liervTjZAkQoTJWdtFxjDyKOlIEjxddvRU7xyKy7o4Tyb+b+b8q/8rWiR6esZeJ/o5WMhUeRW17qTo0MlGmImq/Y0z2+h4qBoz98h+/vyrI9HvYef9X7mhGYZV2g6wvr7zx5uui/4LdtNvf4l4Klbqol5vclwNI+zI5uVZOA1T5c6P4d9ZPEWsEgSf/7UDVes5Y98Tcxyo2Xg2HM7O8Pxn/Y+EnwW/Iot4o3ELpSZ4qRhhb3S1Q8n8LBQAboe60BDlaxgxIjm4OA8wfxJVi/W8+geCkx3U6UlgaJUI60u6f2PXeBhaYgmNELnDIN+42KHW6F8vpCvVa3RWhTL59gTr6U/2BxCIc/8bVKrV++HNT1t15m6ev3I0Gf4wxkQIZ/YA8pWzzu2a9GDSjAQ8l8dc8BE6KBbsNyTesoA9+QfATGPLeBCl+aEI2qO9we8NSfujOV4+rZXkdL6T+7y74Io7dwBOP3vY8377GySgOy3TU7pFsTuk+9QQUVctcTz3Jx/tQF6mUnMVOnoCUgzqfMVm2GBIJBKv8Ikb5O4u0I+1mBcFQVzR6RbreaEwMkOScqALO4bEEmJe78z5NL7BmOq4fZBL1/HUk8k3b+2ON/TUuX71NLgpSQKKJC6t6Q6QhT3ULfsrP/P3sK+OObiU5Y6l8HyZ/ks8POQLQw6N0PGVUQC0O87Pk/qhDiui2ywoYhM3Wg6wZ3Agv0A2RiT1MbW/EcRdscjQcnyms9y8D57latXyNuebc5QPXqChvUkmEavm2sOCqEFF4j7Q2WIGHqPFvuxhb86JR8AnWM/+kw6224E9EJ4vH4sySQnWjY4Ye2vvv6Hkeb1FrxAiLzdDt4Sw2QQdWmF4fPHd/pYx+5v+fsypr2n9p1RMVyH600/mf1/iRL2d8hXMGewe9pvBgBTr9x2INt4QJKzEBYZoiaE1mw0hW9J9fgb+SBgcL1/Zf/f19htgN00B0bndoRFxiBafneB6ZEDNet7v+K2H/UPfzLfpRZQWGaNoGGL+fa9NaPk8EY5H9mGqfn1PjEAOkS/BbYcyeCQOZ3INRgy8vt5zE2PvWvrT0GG5F5gGFmP7YrDl4z54nPidIuDFaySpsC3jwTptlJa/tysQCPh8vkgkA9eXnI8mX1H86v2HPvo/IZBITzSw/E/uHCkO/8UIKnvS4TA+hmK5A8lDVFtfPt29vITHnF4m7G9evrE3pw6EQqFDt2DeD+Id9FnSWkgn2ps8AIGL1/1ION49R67lgtWhTDQa8cUCPT2dQx7C1N9HoTBdQ/euLOK8TjhGmhQcUxw3uneziKKQ0qZ4G8fJwh/9r26Iavjtw3BazRfOLnknF8x2kJvvuuXO3Sl/RitMUlrsuEHq3pwpJgp/KuaDxrt6YY8vblwE2NvEHjg5F0nn4LTD8p4I7ZLAWLhntH99bXck7V1sjo+zULIa0Wz+MVLItjhYQf6+CXjZc3PBDOfsZZLHQyc1S0R/1Un978kynBVLMPLoNTqfd28ctD+cHM3aEsW8bkmSvDzLkYiOIiltCpnhyjE/RhR+c9jfsJdv2YVjmGoPpc8d2t7mmYEzTHW+XyjU6EZ17/PdK8rrxLPc80whpS2fDO6r7NQDjx2v3vFP242w7SzDTAdWtPyxaPYLeWIMhI7+7+SkX2nDeULikl+5JQb//j5Yi90L2l0AyqYv/O8cBuMedN5e/N5IJs770moV+QzpO1Wy7P2O8z8aLMm/L87T7SGh5eaQ6enoN031GMXDr+z5d7udVhF3oICh8HY50jnKFaBlhTpPop2yC1mW4/ub/vOXvzt2dBN4NhXdWdCCom2pUf0L2SQdOR2C3xP9dpKkYQRKcrFSpz7KmYyvUxAbnIDPOVrtcyIlRc5A48bY6x19qrPSfUzorHC2xf28uBnUvaBJBP5xcRFD6b1JzinhUE6XtgFWBzsmSexdBrhCPYAdo535A6z3gj1fb1nxe+IWiRwEF0RJK2dRUr3RvdlyoBhovVnvkMPXqO6QO4PToc4h8Fwit/C5xsG6eMu+JjGJbp2w5l9S3fgaKZfXTHR+4aB7sfUoyDdYz3eP/zvnDvV0JQ8Q7iD23hCqLY8QWN/Z18Q9sNBjde/zIIiq5d10E2Tu/dCd9xBYvX94/A4O1tkziHcYeefiQz+fz3GwFHl+f3bfmihS3BN5NHzvJf5+9y0Eluc3D7NzsE7hS+e4Kk0C6LIKOVowHDEmu3p7PB4Pu1m/36UQ3O/e0Eo0vFQqrdx5Rwx2mP+3i4sEB6tWrCJ36KRu3N7MKUfKSb0vO0aDXZWdH7V0bHabQ24Ca6H7YMOGFOLO6xH449XbhMNhtDuM5OBluXIFkO0UW4wQIy3XKrxEoFazuIz8cNLhIo+G5gNxia0Rlb/z8hAMJxKNA3DqkE7nkJuGOwUvT2T5v2gDb87p2muCNffjBeXQgU3JevgCxp3KMjJ4gw7tCmbStfJpR5FSLrGh+B7qmK7hXX+xHb3wSind+QFY0EQb052rM4D17GAnbnqK7O1+huEGVsb1H4+ypbKyGxXrR5rVQ8sd2uf3oGO3Tfv2oC7XYK6pGSOtzVVriyvvQ5TxUD1LWgqy+fs+K6oHG7aL23+mnW0tsVve8F9B7qDrSmsZ/GuWJPGQfVMcvCBJTxa8gu249TAToP94nrpDOk65uuJQpt2ovKzcONtHrpbremx6MQjuS9I8slEp9I1XThG9luOorUf6YFiHL520u9WD5L1eKhWpQHCmi2aGkZZ4SOuGZu9xUCWl7ynfEVv5eVZvhY+B133SziuId0weHYjPTLxQVw6ffdI5LYyHjTnJa4JSVjYLK7xSGlyktQovptbz3xpH6uFdWo0Pf8zVq1f5cqHwEWlWZ2U9fk9vYBCzOR0tRdVSi6Xz3dJhcJ8SHDNftzDbeBeNV3rPjqVGghjXKZaBFlm/xLPh5eVMdDAS6RRO2hjyQaPer/V2aHRpKc+C22t2Hxy7ldUv5T/3/oIo7XvFtcbHdR4LrbDUXL7vBKbVyytNcfWU6AoL6I9HdGgNN7po9s2UB26KXm3F0Cai/S26bZxycQE9zq2NITGln62tPT1f0xtSWvv8t3yV1QnrOr9jVPuz1txeyUvOKaRQB8EtHnOFEmxuSa2VzuiN0Ki1HL1QfLvCt2baeBrZKnUUBZS11BhtFqTgVdW6HZST5p1/i6hQmEFzV+6nSqn7kDN3/4F3/73o5kvSYT1FI/fOmydoNga9OkuczQ/ty1HDcIJnArwHKwP5YqlSq1+Vt2Fdf9IGusTovngQZJu2eeVzunXDze55dshLghnY0WvkCHw8432SaNcZfnwkp4PQtlcjHYRJC2TjdDUT/6rCHB7fZmfgukW1aC9OIEQ1vkbwF3WLrHQ7vxBEf6dnDQjxbgGyM3vKYVf9fDClbwIs0J57LgJwZLFOAkxBlmWGIr4Ady4eqDpdLY6a0GrtSRPvLd9TH7z+I48eQ07epq3S/oAvmolPBBhsfcC/ZRptvdpfmwj6j5TFMgAnQsu1Z2m3YF1PAUjWW5uz74HV86KFnRG+1xgrnn3RvWcCBBeM0l9swx2us/jNBQHNYlSX6fqhQA3L1zDccu7ImfS+5i5YQ9BCN7ifK1GieXrbfFMGUvDUKgjWqfZrq8lCnwkZAP7QH3Q4rG/LFBJzTcbksNOOL9roNdMglq0bnSIALsTWiO9sGuE2r1IXdVrkg0noswiiYJpst07TIRizcmppPdK53NlLKgPzkWKPFXdtv2D+77ymvtfcb6jbQsf3G5JaGX+/6FE3aGIkpNFkl1WkbbrOcHxKEKRFUbB8gLYi9D44MSk8HFWrsYgzQxffA1fYB9UyjBBaNBVE3f1sHF6/u5M1xneyjvAhNTRzhZ0nFYflctbBl7kFOCs3e7tnYMtk22DvJUuqrba3euhHVsXUAItWeeKDPcS/ZOcnTjGpSaQx0AHzanWPdLixR/rxnFHxbnY6/ecOJXhWZPmSVCpGgGloDcEAWuETdmCzjLfThTVPuXPnvTCCpU918NmJIaUnIQYVp5M23xsNideMD+lJ2pW9qkbDXGP3/eOdEQUpPqjGQe1+NFRkmG8od5ZUx+T3haPaH7WYJUmispipr332Ps3Qb6x0WdE3P+Kq5W9YBk2b5n2zaIkJw8tXDkPy3NOl7a43NkV5IvH64gLdmv3lu1dJjtVpjQbS3J3rMIgRxby2crjI3ote6xhEf+op/8uyrDl3alVAFzLQmrCFaRBWqQyuXULLmEwYjKRffMhFUpveo+KU0AwQkUuiftHIkLoLoFqU5WetSTOASVQ7bkLfvKaT9pikSFemSKlVlu4VdmC2PtUrQQxK6coZxNfzRdB2W/ANra+NBsdXZcRKgnfKG+yvXtlpwznTpjpgHKTpWf/0fYFyqdiSBi6jNnuVPQbv2RNJgLa4mlEAno7DGMVCs7T/hDpjLKP6rV+uq9wuZLt6qMXxEtY5O3X4eUy0Y8T3oLe3f3/5NkmT2Ri7cCiaxSOicUftpfcx3yoUCrpeiS7YsroX+N5OsyjsW6cxy2qDvKcLJq1b5OBt1AGzsM++kQdpKAGNy8/g6cc5lc8DD4oJw81NsqFDfATUG77dnPSNfBZ5duOwiy5yQTsWKc3pzep3sM5CijZizAu81GoW4AiZfBtw0zCMpvB3phW/Rbdber/vFYQGfYjBKY+NHoqIcmV318WV65GD6EOSXnmd4JTqwkHb7LhK8WhoNKBaVa+hUJSdqgF6Mo3fIIPe3bZEJYoF0YZ0ZQoGTG0xPd6PKdoYjFuktWOyClH85kXioyqBNkY6jFzeWYa9vLPQnPiXPPf7vzoMNI6AKBXtH79RJ4WQt9qtpK9uV6nNqKxdMExdpA3AidXsdR+zhXneV0JZYl97LL5mYADNwCRINr4pPMT2zaYxxSY0R++HSjoHX3qQMskVzF0eD/PsJ0kN24ZHv/eyWIIoKyqVwr5GqDsc7bYCLAqXxWLrVl8qcJiFBUk8ZpubjAn8t2oHl0UCgL9rn4XviMMvv4F2aDlqKcplPqFGZWgCp5MGc6Mz2muO3jQ8stsdzY4I49wONXgp9Qo0PP8M1MstZZhZrscYSzb22aZ7wT2KXqAtPBZJFPowf04RgV+jBRuz5La0FuWgALcIXuaSz0iBYo5GGOyNDDeYqAaUgU+J+lhHPwWXCFaBkhsiJ7oUMk50VECsMKA8YZsSUpWU0D4Xm34BwjgGRYpPC++ZYA69dyM1bV4fdFDd9XZbpWtED9G+wWKe5zh7O9q84GEaF0y5tYtfesAJsVsoKiNwKYg0A2EWpkw2SRJXWHBpY41t2AZgCg2xLTgpSQw5PPfxi8eS+CTEF+YxX2vYDqxywoieSy5AVwxohewTVGuFe5Ooz6p0WaeSYoAzdJk6pfoSaFh1GEmd93htxSweB5HUSV4MvajHbVQujcOoQJUH0WbDHCSE7EeyYTxXuWkkqt6CfIk8O/oMjfHz7W2dl/Ou6/ly4RLK5WqtirSKiMIqJUiXUQKmcql1KamaE4ZJxIrRljKbeMiCIv5KA9aTdlq28CMpHCAeb8Of+1C0mcX5DTc63dbfO3x2+QXjY6YgIztl8Sp3YK60LKcLyO/5hNwidTj7b5FolMlbDcFl68V+s2jttgM2373A9iWbdLxhG0fvPtBeleUoTFsn0RDdh2xJwqCIeQ+iNQ2z+lIBKG4sm8eAGGPxK9KiQbK5Iqzn6UoMmduy7CyB3w/ldJUDHWmt68XxBzELwZAoLTAWPPDabAIlpm3BR3Uyy79zCg3Qy7HaWCS0+vRhrEs1y9t6CaKoZ3lZLtwyF5LO+p6PLA8ivahhCBZyjFrun/zNMR0l8E9QfYNaJDaW2CHCtWTDTGvAOtYutEGTLvhgHUdiLZgVvfrWvYjnYhrXrREOqRENajy2LZflCkKZRcyuM3QRAnLm2Wf4JONXl1a1pasRB3sA1dcmer00DGlFlJYOJdM0wjfeftdfG8IAPoX/BLPtCfu2QNsviZymjhp1YA01UIrAmUJ6F1+K0hXnutjyJUfJT9en4682Si6aGfoAlci2H1oQ3e4Qte3a3KYBqv23VQVelQkYR6NAvmgL+WkPgJlvu7RYJuFFy84Kj3pyQ2c55XLuzuoX0sxinYoLUagoKhW/M81oGai0ISEvCS2J4hqbN5sxBQXBetKO7Q6YsVGWM2AyiyF2IPJ9E7SAgbGqpXQaUFGIXkKUbhEdur2t5rkKnl6r9neqd0SeWbQ3q4UG/WwivTqgKqMphU6yHddYSXzwlGxi3GTG339fxcoydnKEZFPX062xrkE1IVo945oWgWe8bBDTQptH9xm6LuKHI1Jbia10Y061YvOaEatRa1870VG9DCEJSilorR0oA0EwUgFMTUG0+S5tQTSimk9GPV1QNS7+gyxvEJ6ePMUjUZLAvrG1eQwe9JdQa9smJ7wrmIpoaKlYTcHYCYylIHr/zT6VbvrUeLmsadQPSJMPRkePYBqzdaoxroiiQFgNWEfb0blrklXQGlCXpzE/PDFZSLmi998bUVXMr4LTq4H0gyJeDE4IGzy0IIaC3YJg1rBqozTnnsT1aGFkf2rhN3+5BqpRi7/oeETacJKyCBj+Ttzv0QQtGlZt1eRwTwgtAV2xFX37KBwpTj41+VfXovXfub0vSLr6+NIkkVDLoYRHVrBqm7rMn0gcvbzwFNkp/fopi2qPqFwT/yodGlTUSnGCk9DnNo2Sb+8ArMhvbZlMWzCZAq0DwuyWvJbpfxGuwRekRRa32i9veQrjA8QZOgIr3rSsUIZxFSvbyuKGaEpNAbz4f1yB8VC7Vp/FIthWFtQ5LLT2jFx0vN39lSYZOEpZmzERCX2IrYmCKYXaBeG/rw+RGYAjhMrrJpqrshHyVynKCto5DuplEI4mYVrFyrbPFrq/MZ5WWwaQAsDy38DLM0jtXWPjmOJ4Nw9FcYkdSo12uZPpduZXdwVDvdZZI7hFxva72SKdq82E6kXpTzz6F/NkuiJh6mybHBCsNmVeYnADcxxtSiBVydo0x/mh9AJ5ZQWrw6V9xo73N/C8vcdmr8ViTfVtkeOZCEd9XS0K4glEouEJeu3D1LjFZJNsx5KXpojMs7V9tqgM27IIk501txudO+qWhRy8GHzSLQSZl7BC1L5xazRZxqfHtBWd2YnV+OrErHZ596Ox6XHBRE79gIaObUpmkc3vB1lQSc4tmPdMPW232uhfSJaKgFvwIWWifmJGs59odMoB8k7avSpIIgFmFUYH+qbGtp6SXR493Rqbmu4bGBVMCBRBixgFNzdCyNfd+HEaH/VEUmywj/771ef4/016TlGt+GmZLGZpHoNhUBJstiDbINAQP25RZrfNgpihWK1WusFHNq9bRC+1uWSj0hUaoZcGGIjBoOi2HQpmnguMIi85bYPOtb8tcTqn1Af4MGo1ixuLKwc2iv4H39ixjWY3kI6YDw4REhtvJ7FxzmkTxf1vCzTngcKB+5BcOiqmJHi/sfdus9tM+I+ZUk87yr8zvoY1ZeInl0JH7TabaerhGnVREpc45Dvt2Zpk2wiRgR4fbjZmOgTdqEkhERkDOTiEbN8siIv4LuvoU0pz+tp4k+GfiWeVzozMZpocvXuFLXwLMebmM+Cp0QbJakgUnxDZlPgEffPBymYo2C1yP2czm73sSbcbKQOZrGQzpTAiTFlTJ9CRlxrABHgyZR39oCQs0r7o7V6kM5fWFDaOkIjHfJyDiF4N8TPTiER6CZUKNU08ZPMLa/wNFg7VVso6DR03Pl8Vfxh1QbAOYLSbFkw2DhOfzcNH35KGiWt0uQF0Scd8eBbN7yGnhk5rRVLGRIU2RRWqk1FKCF90olop0rtKVsjhGhs1WQQRXQ8y8rUDERXItsSWuN5Ia8FuvUo18HTTcHiLaQA57Mm4dfQEWofZdJz4XpBaWcfxRJ/2CSYvbcOg7XJPDtDno/WhYpndLLgW4ijZFLMkC+XJDTILnn1PjlpHtzpuTMgPJIJwTaWsVKGhdM9ksYnujUM+6C/IofEusLXFRX7JMMSP55DmfcEm8MSI1nSmU9ZxhCrbSdzqT8WH6d7kuNU6gKERtvpGTVavmyDxbnJkkIB1Sxj1aGqI+/03vuCIFFUYnzpSCg+mAQwS2U4pyfyPwodTo4JYOF4w2TcuWCmrkZTtUejUzfsbfKnR7aVEKDUwTbUcGBuwWkdJJTMPQqs08Q+dktdKWa3jCg5Hk5FdZTMAAADOSURBVNMD4ymBEh2bjVIeG6U8KUoX+euI6KjVygs6s52TNf9toUmvcDQ1brJaRvvGPmhFhqdbW5NjY2OTW3ydn8vJ1AACZRknnYJMR17d929IjPCCrWm0QtSa8b7psa2nze7bo5PJqemBUdQ+qzA+TTWv00zn0qq/I13ROEdmDGEhyLiYLCbtrjA6oJa64tGHqlMt0jsYVke3HfEqliLTU2NbqiXOhjtyFum/Lr2+oXB89k4f/Gx8Oer7D05/Kv6ergBddqHL0/H8vKPlvwGqVLFtlTiM6wAAAABJRU5ErkJggg==",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "FENWICK",
      logo: "data:image/png;base64,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",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
    },
    {
      name: "Ludeo",
      logo: "data:image/jpeg;base64,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",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "PlayStation",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/PlayStation-Logo.png",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    },
    {
      name: "Kaiser Permanente",
      logo: "data:image/png;base64,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",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
    },
    {
      name: "Hasbro",
      logo: "data:image/png;base64,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",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    }
  ]

  const servicesData = SERVICES
  const totalServices = servicesData.length
  const hasMultipleServices = totalServices > 1
  const timelinePosition = hasMultipleServices ? serviceProgress * (totalServices - 1) : 0
  const activeServiceIndex = Math.min(totalServices - 1, Math.floor(timelinePosition))
  const nextServiceIndex = hasMultipleServices ? Math.min(totalServices - 1, activeServiceIndex + 1) : activeServiceIndex
  const segmentProgress = hasMultipleServices ? timelinePosition - activeServiceIndex : 0
  const isReleasingPhase = serviceRelease > 0

  // For scroll-lock effect: snap content to full viewport at a time
  const snappedActiveServiceIndex = Math.min(totalServices - 1, Math.floor(serviceProgress * totalServices))
  const snappedSegmentProgress = (serviceProgress * totalServices) - snappedActiveServiceIndex

  const getImageOpacity = (index) => {
    if (isReleasingPhase) {
      return index === totalServices - 1 ? Math.max(0, 1 - serviceRelease) : 0
    }
    // Use snapped values for discrete transitions
    if (index === snappedActiveServiceIndex) {
      return 1 // Stay at full opacity until transitioning
    }
    if (hasMultipleServices && index === snappedActiveServiceIndex + 1 && snappedSegmentProgress > 0.8) {
      // Start fading in the next service near the end of the scroll
      return Math.max(0, (snappedSegmentProgress - 0.8) / 0.2)
    }
    return 0
  }

  const contentTrackStyle = isServicesMobile
    ? {}
    : {
        height: `${totalServices * 100}vh`,
        transform: `translateY(-${snappedActiveServiceIndex * 100}vh)`
      }

  const serviceSectionStyle = {
    '--service-panels': totalServices,
    '--service-release': serviceRelease,
    scrollMarginTop: '80px'
  }

  const servicesContainerStyle = isServicesMobile
    ? undefined
    : serviceRelease > 0
    ? { opacity: Math.max(0, 1 - serviceRelease) }
    : undefined

  // Scroll direction detection (set up once)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollRef.current ? 'down' : 'up')
      lastScrollRef.current = currentScrollY
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsServicesMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Excellence section scroll-based size increase (desktop only)
  useEffect(() => {
    const handleExcellenceScroll = () => {
      if (excellenceRef.current) {
        // Disable scroll animation on mobile
        if (window.innerWidth <= 768) {
          setExcellenceScrollProgress(0)
          return
        }
        
        const rect = excellenceRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate scroll progress through the excellence section
        // When section enters viewport: progress starts at 0
        // When section is fully scrolled past: progress reaches 1
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const sectionHeight = rect.height
        
        let progress = 0
        
        // Section is in viewport
        if (sectionTop < windowHeight && sectionBottom > 0) {
          // Calculate how much of section has been scrolled
          // Progress from 0 to 1 as section moves through viewport
          const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0)
          progress = Math.min(1, Math.max(0, 1 - (sectionBottom / (windowHeight + sectionHeight * 0.5))))
        } else if (sectionBottom <= 0) {
          // Section fully scrolled past
          progress = 1
        }
        
        setExcellenceScrollProgress(progress)
      }
    }
    
    window.addEventListener('scroll', handleExcellenceScroll, { passive: true })
    window.addEventListener('resize', handleExcellenceScroll)
    handleExcellenceScroll()
    
    return () => {
      window.removeEventListener('scroll', handleExcellenceScroll)
      window.removeEventListener('resize', handleExcellenceScroll)
    }
  }, [])

  // Pin excellence section for full-screen experience (desktop only)
  useEffect(() => {
    const handleExcellencePin = () => {
      if (!excellenceWrapperRef.current) return
      // Disable pinning on mobile
      if (window.innerWidth <= 768) {
        setIsExcellencePinned(false)
        setIsExcellencePast(false)
        return
      }
      const rect = excellenceWrapperRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const shouldPin = rect.top <= 0 && rect.bottom >= windowHeight
      const isPast = rect.bottom < windowHeight
      setIsExcellencePinned(shouldPin)
      setIsExcellencePast(!shouldPin && isPast)
    }

    window.addEventListener('scroll', handleExcellencePin, { passive: true })
    window.addEventListener('resize', handleExcellencePin)
    handleExcellencePin()

    return () => {
      window.removeEventListener('scroll', handleExcellencePin)
      window.removeEventListener('resize', handleExcellencePin)
    }
  }, [])

  // IntersectionObservers for emblem and service overlays (set up once)
  useEffect(() => {
    const emblemObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.3 }
    )

    // Removed IntersectionObserver for services - now using scroll-based animation

    if (emblemRef.current) {
      emblemObserver.observe(emblemRef.current)
    }

    return () => {
      if (emblemRef.current) {
        emblemObserver.unobserve(emblemRef.current)
      }
    }
  }, [])

  // Parallax scroll effect for Capabilities section
  useEffect(() => {
    const handleCapabilitiesScroll = () => {
      if (!capabilitiesRef.current) return
      
      const rect = capabilitiesRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate if section is fully in view (top edge past viewport top)
      const isSectionInView = rect.top < 0 && rect.bottom > 0
      
      if (!isSectionInView) {
        // Reset transforms when section not in view
        setImageTransform(0)
        setImageScale(1)
        setTextTransform(0)
        setTextOpacity(1)
        return
      }

      // Calculate scroll progress only when section is fully in view
      // Progress: 0 when section top enters viewport, 1 when bottom reaches viewport top
      const scrollProgress = Math.abs(rect.top) / rect.height
      
      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

      // Image zooms in only (1 to 1.2) without translation
      setImageTransform(0)
      setImageScale(1 + (0.2 * clampedProgress))

      // Text scrolls vertically and fades (0 to 300px down, opacity 1 to 0.2)
      setTextTransform(300 * clampedProgress)
      setTextOpacity(1 - 0.8 * clampedProgress)
    }

    window.addEventListener('scroll', handleCapabilitiesScroll, { passive: true })
    handleCapabilitiesScroll()

    return () => {
      window.removeEventListener('scroll', handleCapabilitiesScroll)
    }
  }, [])

  // Text fill-back animation for Contact section
  useEffect(() => {
    const handleContactScroll = () => {
      if (!contactRef.current) return

      const rect = contactRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height

      const isInView = rect.top < windowHeight && rect.bottom > 0

      if (!isInView) {
        setTextFillProgress(0)
        return
      }

      const startTrigger = windowHeight * 0.65
      const endTrigger = -sectionHeight * 0.35
        // On mobile (< 1024px), use more generous trigger points for smoother animation
        const isMobile = window.innerWidth < 1024
        const adjustedStartTrigger = isMobile ? windowHeight * 0.5 : windowHeight * 0.65
        const adjustedEndTrigger = isMobile ? windowHeight * -0.3 : -sectionHeight * 0.35

        if (rect.top >= adjustedStartTrigger) {
        setTextFillProgress(0)
        return
      }

        if (rect.top <= adjustedEndTrigger) {
        setTextFillProgress(1)
        return
      }

        const totalDistance = adjustedStartTrigger - adjustedEndTrigger
        const targetProgress = Math.max(0, Math.min(1, (adjustedStartTrigger - rect.top) / totalDistance))
      setTextFillProgress((prev) => {
        const diff = targetProgress - prev
        if (Math.abs(diff) < 0.0005) return targetProgress
          // On mobile, use smoother updates for better animation feel
          const smoothing = isMobile ? 0.06 : 0.04
          const step = diff * smoothing
        return Math.max(0, Math.min(1, prev + step))
      })
    }

    window.addEventListener('scroll', handleContactScroll, { passive: true })
    handleContactScroll()

    return () => {
      window.removeEventListener('scroll', handleContactScroll)
    }
  }, [])

  // Scroll-based animation for Services section - images overlay on left, content scrolls upward like elevator
  useEffect(() => {
    const handleServicesScroll = () => {
      const section = servicesRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = section.offsetHeight

      if (isServicesMobile) {
        section.classList.add('in-view')
        section.classList.remove('is-fixed')
        setServiceProgress(0)
        setServiceRelease(0)
        return
      }

      const isBefore = rect.top >= windowHeight
      const isAfter = rect.bottom <= 0
      const isEntering = rect.top < windowHeight && rect.bottom > 0
      const shouldPin = rect.top <= 0 && rect.bottom >= windowHeight
      const isReleasing = !shouldPin && !isAfter && rect.bottom < windowHeight

      if (isBefore) {
        section.classList.remove('in-view')
        section.classList.remove('is-fixed')
        setServiceProgress(0)
        setServiceRelease(0)
        return
      }

      if (isAfter) {
        section.classList.remove('in-view')
        section.classList.remove('is-fixed')
        setServiceProgress(1)
        setServiceRelease(0)
        return
      }

      if (isEntering || shouldPin || isReleasing) {
        section.classList.add('in-view')
      } else {
        section.classList.remove('in-view')
      }

      if (shouldPin) {
        section.classList.add('is-fixed')
        setServiceRelease(0)
      } else if (isReleasing) {
        section.classList.add('is-fixed')
        const releaseDistance = Math.max(windowHeight, 1)
        const releaseProgress = Math.min(1, Math.max(0, (windowHeight - rect.bottom) / releaseDistance))
        setServiceProgress(1)
        setServiceRelease(releaseProgress)
        return
      } else {
        section.classList.remove('is-fixed')
        setServiceRelease(0)
      }

      if (!isEntering && !shouldPin) {
        setServiceProgress(0)
        setServiceRelease(0)
        return
      }

      const scrollableDistance = Math.max(sectionHeight - windowHeight, 1)
      const scrolled = Math.min(-rect.top, scrollableDistance)
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))

      // Scroll-lock: each service gets exactly one viewport height worth of scroll
      // Calculate which service should be displayed based on scroll position
      const totalServices = SERVICES.length
      const perServiceScroll = windowHeight
      const totalScrollNeeded = perServiceScroll * totalServices
      const currentScrollWithinSection = Math.min(-rect.top, totalScrollNeeded)
      const serviceIndex = Math.floor(currentScrollWithinSection / perServiceScroll)
      const scrollWithinService = currentScrollWithinSection % perServiceScroll
      const scrollProgress = Math.min(1, scrollWithinService / perServiceScroll)
      
      // Map to progress value: each service gets its own segment (0-1)
      const snappedProgress = (serviceIndex + scrollProgress) / totalServices
      
      setServiceProgress(Math.min(1, snappedProgress))
    }

    window.addEventListener('scroll', handleServicesScroll, { passive: true })
    window.addEventListener('resize', handleServicesScroll)
    handleServicesScroll()

    return () => {
      window.removeEventListener('scroll', handleServicesScroll)
      window.removeEventListener('resize', handleServicesScroll)
    }
  }, [isServicesMobile])

  return (
    <div className="page home">
      <MinimalistNav />
      <HeroThree />
      
      <div className="excellence-wrapper" ref={excellenceWrapperRef}>
        <section className={`excellence-section ${isExcellencePinned ? 'is-pinned' : ''} ${isExcellencePast ? 'is-past' : ''}`} ref={excellenceRef}>
          <div className="excellence-container">
            <div className="excellence-left">
              <h2 className={`excellence-title ${isVisible ? 'animate-title' : ''}`}>
                <span>2+ Years of</span>
                <span>Excellence.</span>
              </h2>
              <div className="excellence-emblem" ref={emblemRef}>
                <div className="circular-emblem">
                  <div className={`emblem-number ${isVisible ? 'animate-number' : ''}`}>2</div>
                  <div className={`emblem-text ${isVisible ? 'animate-text' : ''}`}>YEARS</div>
                  <svg className="circular-text-svg" viewBox="0 0 200 200">
                    <defs>
                      <path id="circle-path" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                    </defs>
                    <g className={`rotating-group ${isVisible ? 'animate-rotating' : ''}`}>
                      <text className="circular-text">
                        <textPath href="#circle-path" startOffset="0%">
                          CELEBRATING TWO PLUS YEARS • CELEBRATING TWO PLUS YEARS • 
                        </textPath>
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="excellence-right">
              <h3 
                className={`excellence-subtitle ${isVisible ? 'animate-subtitle' : ''}`}
                style={{
                  fontSize: `clamp(${1.5 * (1 + excellenceScrollProgress * 0.35)}rem, ${3 * (1 + excellenceScrollProgress * 0.35)}vw, ${2 * (1 + excellenceScrollProgress * 0.35)}rem)`,
                  transition: 'font-size 0.1s ease-out'
                }}
              >
                Build success in Software Engineer and Property Services
              </h3>
              <p 
                className={`excellence-description ${isVisible ? 'animate-description' : ''}`}
                style={{
                  fontSize: `clamp(${0.9 * (1 + excellenceScrollProgress * 0.28)}rem, ${1.8 * (1 + excellenceScrollProgress * 0.28)}vw, ${1 * (1 + excellenceScrollProgress * 0.28)}rem)`,
                  transition: 'font-size 0.1s ease-out'
                }}
              >
            If you mind thinks about mobile/website development, then we have created a niche for ourselves. We started in 2021 with just 3 employees and now have expanded ourselves to 20+ which shows about the growth and the quality of work that we did over the years.

Our team comprises highly skilled IT professionals whose target is to provide top-notch yet cost-effective solutions to SMEs. We have expertise in designing and developing custom-made websites and apps for all industries. So if there's a specific requirement you can reach to us.
              </p>
              <div 
                className={`excellence-buttons ${isVisible ? 'animate-buttons' : ''}`}
                style={{
                  transform: `scale(${1 + excellenceScrollProgress * 0.2})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <a 
                  href="/our-team" 
                  className="btn-our-people"
                  onClick={(e) => handleNavigationClick(e, '/our-team')}
                >
                  <span>Our People</span>
                  <div className="btn-icon orange-dots"></div>
                </a>
                <button className="btn-join-team">
                  <span>Join The Team</span>
                  <div className="btn-icon white-dots"></div>
                </button>
              </div>
            </div>
            <div className="excellence-scroll-indicator"></div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section 
        id="services" 
        className="services-section" 
        ref={servicesRef}
        style={serviceSectionStyle}
      >
        <div className="services-container" style={servicesContainerStyle}>
          {/* Desktop Layout: Fixed Image Container on Left - Images Overlay */}
          {!isServicesMobile && (
            <div className="services-image-container">
              {servicesData.map((service, index) => (
                <div
                  key={service.title}
                  className={`service-image-overlay service-image-${index + 1}`}
                  style={{
                    opacity: getImageOpacity(index),
                    zIndex: index + 1,
                    transition: 'opacity 0.3s ease-out'
                  }}
                >
                  <img src={service.image} alt={service.title} />
                </div>
              ))}
            </div>
          )}

          {/* Desktop Layout: Scrollable Content Container on Right - Elevator Motion */}
          {!isServicesMobile && (
            <div className="services-content-container">
              <div className="services-content-track" style={contentTrackStyle}>
                {servicesData.map((service, index) => {
                  const isLast = index === totalServices - 1
                  const releaseStyles =
                    isReleasingPhase && isLast
                      ? { opacity: Math.max(0, 1 - serviceRelease) }
                      : undefined
                  return (
                    <div className="service-content-item" key={service.title} style={releaseStyles}>
                      <div className="service-content-section">
                        <div className="service-label">{service.label}</div>
                        <h2 className="service-main-title">{service.title}</h2>
                        <p className="service-description">{service.description}</p>
                        <button 
                          className="service-cta-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            try {
                              handleNavigationClick(e, '/our-service')
                            } catch (error) {
                              console.error('Navigation error:', error)
                              navigate('/our-service')
                            }
                          }}
                        >
                          <span>Find Out More</span>
                          <div className="btn-icon orange-dots"></div>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Mobile Layout: Content First, Then Image */}
          {isServicesMobile && (
            <>
              <div className="services-mobile-content">
                <div className="service-content-section">
                  <div className="service-label">{servicesData[mobileServiceIndex].label}</div>
                  <h2 className="service-main-title">{servicesData[mobileServiceIndex].title}</h2>
                  <p className="service-description">{servicesData[mobileServiceIndex].description}</p>
                  <div className="service-mobile-actions">
                    <button 
                      className="service-cta-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        try {
                          handleNavigationClick(e, '/our-service')
                        } catch (error) {
                          console.error('Navigation error:', error)
                          navigate('/our-service')
                        }
                      }}
                    >
                      <span>Find More</span>
                      <div className="btn-icon orange-dots"></div>
                    </button>
                    <div className="service-nav-arrows">
                      <button 
                        className="service-arrow-btn service-arrow-left"
                        onClick={handleMobileServicePrev}
                        aria-label="Previous service"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        className="service-arrow-btn service-arrow-right"
                        onClick={handleMobileServiceNext}
                        aria-label="Next service"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="services-mobile-image-container">
                <div 
                  className="services-mobile-image-track"
                  style={{
                    transform: `translateX(-${mobileServiceIndex * 100}%)`,
                    transition: 'transform 0.4s ease-in-out'
                  }}
                >
                  {servicesData.map((service, index) => (
                    <div key={service.title} className="service-mobile-image-item">
                      <img src={service.image} alt={service.title} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Client Experience Section */}
      <section className="client-experience-section">
        <div className="client-experience-container">
          <div className="client-experience-split">
            {/* Left Side - Client Logos */}
            <div className="client-experience-left">
              <div className="client-experience-header">
                <h2 className="client-experience-title">CLIENT EXPERIENCE</h2>
                <span className="client-experience-subtitle">PAST & PRESENT</span>
              </div>
              <div className="client-logos-grid">
                {clients.map((client, index) => (
                  <div 
                    key={index}
                    className={`client-logo ${selectedClient === index ? 'active' : ''}`}
                    onClick={() => setSelectedClient(index)}
                  >
                    <img src={client.logo} alt={client.name} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Client Image */}
            <div className="client-experience-right" aria-live="polite" aria-atomic="true">
              <div className="client-showcase-card">
                <img
                  key={selectedClient}
                  src={clients[selectedClient].image}
                  alt={`${clients[selectedClient].name} showcase`}
                  className="client-showcase-image"
                  loading="lazy"
                />
                <div className="client-showcase-caption">
                  <h3>{clients[selectedClient].name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects">
        <ProjectSection />
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Capabilities Section (replaces Feed) */}
      <section id="feed" className="capabilities-section" style={{ padding: '100px 0', background: '#fff' }} ref={capabilitiesRef}>
        <div className="capabilities-container" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
          <div className="capabilities-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64, alignItems: 'start', minHeight: '90vh' }}>
            {/* Left: Image with parallax */}
            <div className="capabilities-image-text">
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16 }}>
                <div style={{ transform: `scale(${imageScale})`, transition: 'transform 0.1s ease-out', transformOrigin: 'center center' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcHV0ZXJ8ZW58MHwxfDB8fHww" 
                    alt="Capabilities"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
              <p style={{ 
                fontSize: 16, 
                lineHeight: 1.6, 
                color: '#222', 
                marginTop: 24,
                fontWeight: 400
              }}>
                WE HELP BRANDS CUT THROUGH NOISE WITH BOLD IDEAS AND FAST EXECUTION. NO BLOATED PROCESSES, JUST RESULTS THAT MOVE YOUR BUSINESS FORWARD.
              </p>
            </div>

            {/* Center: Moving text */}
            <div className="capabilities-title-text" style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ 
                transform: `translateY(${textTransform}px)`,
                opacity: textOpacity,
                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
            }}>
                <div style={{ color: '#8c8c8c', fontWeight: 700, letterSpacing: 1.2, marginBottom: 12, fontSize: 14 }}>CAPABILITIES</div>
                <h2 style={{ fontSize: 36, lineHeight: 1.2, margin: 0, fontWeight: 700, letterSpacing: -0.5 }}>
                  KUE DELIVERS BRAND STRATEGY, DESIGN, WEB, MOTION, AND AI-POWERED CREATIVE BUILT FOR SPEED, CLARITY, AND IMPACT.
                </h2>
              </div>
            </div>

            {/* Right: Accordion list */}
            <div className="capabilities-accordion">
              {(() => {
                const items = [
                  {
                    title: 'Strategy & Positioning',
                    desc:
                      'We uncover what makes your brand different and craft a positioning that resonates with your audience. From messaging frameworks to go-to-market clarity, we set the foundation for growth.'
                  },
                  { title: 'Software Development', desc: 'Custom software solutions built with modern technologies and best practices.' },
                  { title: 'Dedicated Software Teams', desc: 'Expert development teams dedicated to your project for seamless collaboration.' },
                  { title: 'Application Development', desc: 'Native and cross-platform applications for web, mobile, and desktop.' },
                  { title: 'QA & Testing', desc: 'Comprehensive quality assurance and testing services to ensure reliability and performance.' },
                  { title: 'eCommerce', desc: 'Full-featured eCommerce platforms and solutions to drive online sales and growth.' },
                  { title: 'Cloud Services', desc: 'Cloud infrastructure, deployment, and management services for scalable solutions.' }
                ]
                return (
                  <>
              {/* List */}
              <div style={{ borderTop: '1px solid #e6e6e6' }}>
                {[
                  'Software Development',
                  'Dedicated Software Teams',
                  'Application Development',
                  'QA & Testing',
                  'eCommerce',
                  'Cloud Services'
                ].map((label, idx) => {
                  const computedIndex = idx + 1
                  const isActive = activeCapability === computedIndex
                  return (
                    <React.Fragment key={label}>
                      <button
                        onClick={() => setActiveCapability(isActive ? 0 : computedIndex)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '18px 0',
                          border: 'none',
                          borderBottom: '1px solid #e6e6e6',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: 16, fontWeight: 600, textAlign: 'left' }}>{label}</span>
                        <span style={{ fontSize: 22, lineHeight: 1, opacity: 0.9 }}>{isActive ? '−' : '+'}</span>
                      </button>
                      {isActive && (
                        <div style={{ padding: '8px 0 16px' }}>
                          <div style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 8 }}>— {items[computedIndex].title}</div>
                          <div style={{ fontSize: 16, lineHeight: 1.6 }}>{items[computedIndex].desc}</div>
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" ref={contactRef} style={{ background: '#fff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div
          className="contact-container"
          style={{
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}
        >
          <div
            className="contact-hero-block"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Floating 3D Icons */}
            <div className="contact-floating-icons">
              {floatingIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="contact-icon"
                  style={{
                    ...icon.position,
                    width: `${icon.size}px`,
                    height: `${icon.size}px`,
                    '--icon-delay': icon.delay,
                    '--icon-glow': icon.accent
                  }}
                >
                  {renderIconSvg(icon)}
                </div>
              ))}
            </div>

            {/* Main Text with Fill Animation */}
            <div
              className="contact-animated-text"
              style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
                maxWidth: 820,
                width: '100%',
                padding: '0 48px',
                marginBottom: '80px'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(30px, 4.6vw, 60px)',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  letterSpacing: '-0.8px',
                  marginBottom: 40
                }}
              >
                {renderAnimatedText()}
              </h2>
            </div>

            {/* Contact Form Section - Image Style */}
            <div
              className="contact-form-image-style"
              style={{
                display: 'flex',
                gap: '80px',
                width: '100%',
              maxWidth: '100%',
                position: 'relative',
                zIndex: 2,
                margin: '80px 0 0',
                alignItems: 'flex-start',
                padding: '60px clamp(24px, 5vw, 96px)',
                background: 'linear-gradient(135deg, #0b3d2e 0%, #0f513c 100%)',
                borderRadius: '48px',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
                color: '#fff'
              }}
            >
            {/* Left Side - Bold Text */}
            <div style={{
              flex: '0 0 400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '20px'
            }}>
              <div style={{
                width: '80px',
                height: '2px',
                background: '#fff',
                marginBottom: '40px',
                opacity: 0.85
              }}></div>
              <h2 style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#fff',
                margin: 0,
                textAlign: 'left',
                letterSpacing: '-1px'
              }}>
                Let our teams<br />
                serving globally<br />
                propose your<br />
                project.
              </h2>
            </div>

            {/* Right Side - Contact Form */}
            <div style={{
              flex: '1',
              width: '100%'
            }}>
              <h3 style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 600,
                color: '#d7f5e5',
                marginBottom: '40px',
                textAlign: 'left',
                lineHeight: 1.4
              }}>
                Fill in our form and our energy consultants will call you.
              </h3>
              
              <form
                className="contact-form-image-layout"
                autoComplete="off"
                onSubmit={handleContactSubmit}
                style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
                }}
              >
                {/* Row 1: Forename and Surname */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px'
                }}>
                  <div className="form-field-image">
                    <label htmlFor="home-forename">Forename*</label>
                    <input type="text" id="home-forename" name="forename" required />
                  </div>
                  <div className="form-field-image">
                    <label htmlFor="home-surname">Surname*</label>
                    <input type="text" id="home-surname" name="surname" required />
                  </div>
                </div>

                {/* Row 2: Sector/Service and Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px'
                }}>
                  <div className="form-field-image">
                    <label htmlFor="home-sector">Sector / Service*</label>
                    <select id="home-sector" name="sector" defaultValue="" required>
                      <option value="" disabled>Select an option</option>
                      <option value="drone-technology">Drone Technology</option>
                      <option value="artificial-intelligence">Artificial Intelligence</option>
                      <option value="iot-development">IoT Development</option>
                      <option value="application-development">Application Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-field-image">
                    <label htmlFor="home-email">Email Address*</label>
                    <input type="email" id="home-email" name="email" required />
                  </div>
                </div>

                {/* Row 3: Phone and Message */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px'
                }}>
                  <div className="form-field-image">
                    <label htmlFor="home-phone">Phone*</label>
                    <input type="tel" id="home-phone" name="phone" required />
                  </div>
                  <div className="form-field-image">
                    <label htmlFor="home-message">Message</label>
                    <textarea id="home-message" name="message" rows="4"></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '10px'
                }}>
                  <button type="submit" className="contact-submit-btn-image">
                    Send
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>

          {/* Location Map Section */}
          <div
            className="location-section"
            style={{
              width: '100%',
              marginTop: '40px'
            }}
          >
            <div
              className="location-container"
              style={{
                display: 'flex',
                gap: '60px',
                width: '100%',
                alignItems: 'flex-start',
                padding: '0 clamp(24px, 5vw, 96px)'
              }}
            >
              {/* Left Side - Location Details */}
              <div
                className="location-details"
                style={{
                  flex: '0 0 320px'
                }}
              >
                <h2
                  className="location-title"
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 600,
                    marginBottom: '30px',
                    lineHeight: 1.2,
                    textAlign: 'left'
                  }}
                >
                  We Are <br /> Located on
                </h2>

                <div className="location-addresses">
                  <div
                    className="location-item"
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '20px',
                      textAlign: 'left'
                    }}
                  >
                    <div className="location-icon" style={{ fontSize: '20px' }}>
                      📍
                    </div>
                    <p
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        color: '#000',
                        margin: 0
                      }}
                    >
                      7th Floor, Centre Point, 2/4, Mount Pollamallee High Road, Manapakkam, Porur, Chennai, Tamil Nadu 600089
                    </p>
                  </div>
                </div>

                <div
                  className="location-contact"
                  style={{
                    textAlign: 'left',
                    marginTop: '20px'
                  }}
                >
                  <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
                    Contact no: <a href="tel:+919791670504" style={{ color: '#000', textDecoration: 'none' }}>+91 9791670504</a>
                  </p>
                  <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
                    WhatsApp: <a href="https://wa.me/919791670504" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>+91 9791670504</a>
                  </p>
                  <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
                    Email: <a href="mailto:sutheesh.s@vulturelines.com" style={{ color: '#000', textDecoration: 'none' }}>sutheesh.s@vulturelines.com</a>
                  </p>
                </div>
              </div>

              {/* Right Side - Google Maps Embed */}
              <div
                className="location-map"
                style={{
                  flex: '1',
                  minHeight: '400px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5926341894877!2d80.17429731482162!3d13.024825990817846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f1e5e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sPorur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Animation */}
      <FlowAnimation />
          </div>
  )
}

export default Home

