// Navigation helper to trigger circle transition
export const navigateWithCircle = (event, href, callback = null, color = '#ff6b35') => {
  // Prevent default navigation
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  // Get click/touch position - handle both mouse and touch events for mobile
  let x, y
  if (event) {
    // Handle touch events (mobile)
    if (event.touches && event.touches.length > 0) {
      x = event.touches[0].clientX
      y = event.touches[0].clientY
    } 
    // Handle mouse events (desktop)
    else if (event.clientX !== undefined && event.clientY !== undefined) {
      x = event.clientX
      y = event.clientY
    }
    // Handle changedTouches (for touch end events)
    else if (event.changedTouches && event.changedTouches.length > 0) {
      x = event.changedTouches[0].clientX
      y = event.changedTouches[0].clientY
    }
  }
  
  // Fallback to center of screen if position not available
  x = x || (window.innerWidth || document.documentElement.clientWidth) / 2
  y = y || (window.innerHeight || document.documentElement.clientHeight) / 2

  // Dispatch custom event for circle transition
  const circleEvent = new CustomEvent('circleNavigation', {
    detail: { x, y, href, callback, color }
  })
  
  window.dispatchEvent(circleEvent)
}

export default navigateWithCircle
