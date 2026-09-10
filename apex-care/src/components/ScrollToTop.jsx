/**
 * Apex Care - ScrollToTop Component
 * 
 * This component automatically scrolls to the top of the page
 * whenever the route changes. It's used to ensure users start
 * at the top of each new page instead of maintaining their
 * previous scroll position.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Auto-scroll to top on route change
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * 
 * Monitors route changes and scrolls to top of page
 * Uses React Router's useLocation hook to detect pathname changes
 * 
 * @returns {null} This component doesn't render anything
 */
const ScrollToTop = () => {
  // Get current pathname from React Router
  const { pathname } = useLocation()

  // Effect hook that runs when pathname changes
  useEffect(() => {
    // Scroll to top of page (x: 0, y: 0)
    window.scrollTo(0, 0)
  }, [pathname]) // Dependency array ensures effect runs on route change

  // Component doesn't render any UI
  return null
}

export default ScrollToTop
