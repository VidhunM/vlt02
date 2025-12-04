import React, { useEffect, useRef, useState } from 'react'

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    happyCustomers: 0,
    delightedUsers: 0,
    transactionsReceived: 0
  })
  const sectionRef = useRef(null)

  const targetValues = {
    happyCustomers: 150,
    delightedUsers: 1000000, // 1M
    transactionsReceived: 400000000 // 400M
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const animateCounter = (key, target, duration = 2000) => {
        const startTime = performance.now()
        const startValue = 0

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart)
          
          setAnimatedValues(prev => ({
            ...prev,
            [key]: currentValue
          }))

          if (progress < 1) {
            requestAnimationFrame(updateCounter)
          }
        }

        requestAnimationFrame(updateCounter)
      }

      // Start animations with slight delays for staggered effect
      setTimeout(() => animateCounter('happyCustomers', targetValues.happyCustomers), 200)
      setTimeout(() => animateCounter('delightedUsers', targetValues.delightedUsers), 400)
      setTimeout(() => animateCounter('transactionsReceived', targetValues.transactionsReceived), 600)
    }
  }, [isVisible])

  const formatNumber = (num, suffix = '') => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M${suffix}`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K${suffix}`
    }
    return `${num}${suffix}`
  }

  return (
    <section ref={sectionRef} className="statistics-section">
      <div className="statistics-container">
        {/* Statistics Grid */}
        <div className="statistics-grid">
          <div className="statistic-item">
            <div className="statistic-label">Happy Customers</div>
            <div className="statistic-value">
              {formatNumber(animatedValues.happyCustomers, '+')}
            </div>
          </div>

          <div className="statistic-item">
            <div className="statistic-label">Delighted Users</div>
            <div className="statistic-value">
              {formatNumber(animatedValues.delightedUsers, '+')}
            </div>
          </div>

          <div className="statistic-item">
            <div className="statistic-label">Transactions Received</div>
            <div className="statistic-value">
              {formatNumber(animatedValues.transactionsReceived, '+')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
