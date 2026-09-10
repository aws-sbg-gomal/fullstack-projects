/**
 * Apex Care - Navigation Bar Component
 * 
 * This component provides the main navigation bar for the application.
 * It includes responsive navigation links, scroll-based styling changes,
 * section highlighting, and user authentication dropdown.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Main navigation component with scroll effects and user menu
 */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

/**
 * Navbar Component
 * 
 * Main navigation component with:
 * - Scroll-based styling changes
 * - Section highlighting (scroll spy)
 * - User authentication dropdown
 * - Responsive design
 * 
 * @returns {JSX.Element} Navigation bar component
 */
const Navbar = () => {
  // State management for navbar functionality
  const [isScrolled, setIsScrolled] = useState(false) // Track scroll position for styling
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // Control user dropdown visibility
  const [activeSection, setActiveSection] = useState('home') // Track active section for highlighting
  const navigate = useNavigate() // React Router navigation hook
  
  // TODO: Replace with actual authentication state from backend
  // Currently simulating login state (set to false for development)
  const isLoggedIn = false

  /**
   * Handle navigation to homepage sections
   * 
   * Navigates to homepage and then scrolls to the specified section.
   * Uses a timeout to ensure navigation completes before scrolling.
   * 
   * @param {string} sectionId - ID of the section to scroll to
   */
  const handleSectionNavigation = (sectionId) => {
    // Navigate to homepage first
    navigate('/')
    
    // Wait for navigation to complete, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 150) // Slightly longer delay to ensure navigation completes
    
    // Don't set activeSection here - let scroll spy handle it
  }

  /**
   * Scroll event listener for navbar styling
   * 
   * Changes navbar appearance based on scroll position.
   * Adds background blur and border when scrolled.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Scroll spy effect to track active section
   * 
   * Uses Intersection Observer API to detect which section is currently visible
   * and highlights the corresponding navigation link.
   */
  useEffect(() => {
    const sections = ['home', 'about', 'contact']
    
    // Intersection Observer configuration
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-10% 0px -10% 0px', // Trigger when section is 10% visible
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] // Multiple thresholds for smooth transitions
    }

    /**
     * Observer callback function
     * Determines which section is most visible and updates active section
     * 
     * @param {IntersectionObserverEntry[]} entries - Array of intersection entries
     */
    const observerCallback = (entries) => {
      // Find the section with the highest intersection ratio
      let mostVisibleSection = null
      let maxIntersectionRatio = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio
          mostVisibleSection = entry.target.id
        }
      })

      // Only update if we found a visible section with significant visibility
      if (mostVisibleSection && maxIntersectionRatio > 0.1) {
        setActiveSection(mostVisibleSection)
      }
    }

    // Create intersection observer
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    // Cleanup function to unobserve elements
    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  /**
   * Handle click outside to close dropdown
   * 
   * Adds event listener to close user dropdown when clicking outside
   * Uses mousedown event for better UX
   */
  useEffect(() => {
    /**
     * Handle clicks outside the dropdown
     * 
     * @param {MouseEvent} event - Mouse event
     */
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }
    
    // Only add listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <motion.nav 
      initial={{ y: -100 }} // Start above viewport
      animate={{ y: 0 }} // Animate to normal position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth entrance animation
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md' // Scrolled state with background
          : 'bg-transparent' // Transparent when at top
      }`}
      style={{
        borderBottom: '2px solid transparent',
        // Dynamic background with gradient border
        backgroundImage: isScrolled 
          ? 'linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box'
          : 'linear-gradient(transparent, transparent) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box',
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4), 0 2px 8px rgba(20, 184, 166, 0.4)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Links to homepage */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Apex Care
          </Link>
          
          {/* Spacer to push navigation to the right */}
          <div className="flex-1"></div>
          
          {/* Navigation Links Container */}
          <div className="flex items-center space-x-3 ml-0">
            {/* Home Navigation Button - Scrolls to home section */}
            <button
              onClick={() => handleSectionNavigation('home')}
              aria-label="Navigate to Home section"
              className={`transition-all duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none rounded-full px-4 py-2 ${
                activeSection === 'home' 
                  ? 'bg-gradient-to-r from-[#2563EB]/30 to-[#14B8A6]/30 border border-[#2563EB]/40 text-[#F8FAFC]' 
                  : 'text-[#B8C5D1] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60'
              }`}
              style={activeSection === 'home' ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              } : {}}
            >
              Home
            </button>
            
            {/* About Navigation Button - Scrolls to about section */}
            <button
              onClick={() => handleSectionNavigation('about')}
              aria-label="Navigate to About section"
              className={`transition-all duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none rounded-full px-4 py-2 ${
                activeSection === 'about' 
                  ? 'bg-gradient-to-r from-[#2563EB]/30 to-[#14B8A6]/30 border border-[#2563EB]/40 text-[#F8FAFC]' 
                  : 'text-[#B8C5D1] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60'
              }`}
              style={activeSection === 'about' ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              } : {}}
            >
              About
            </button>
            
            {/* Doctors Navigation Link - Direct link to doctors page */}
            <Link
              to="/our-doctors"
              className="transition-all duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none rounded-full px-4 py-2 text-[#B8C5D1] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60"
            >
              Doctors
            </Link>
            
            {/* Contact Navigation Button - Scrolls to contact section */}
            <button
              onClick={() => handleSectionNavigation('contact')}
              aria-label="Navigate to Contact section"
              className={`transition-all duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none rounded-full px-4 py-2 ${
                activeSection === 'contact' 
                  ? 'bg-gradient-to-r from-[#2563EB]/30 to-[#14B8A6]/30 border border-[#2563EB]/40 text-[#F8FAFC]' 
                  : 'text-[#B8C5D1] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60'
              }`}
              style={activeSection === 'contact' ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              } : {}}
            >
              Contact Us
            </button>
          
            {/* User Profile Icon with Dropdown Menu */}
            <div className="relative profile-dropdown-container">
              {/* Profile Icon Button - Toggles dropdown menu */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full bg-surface/30 hover:bg-surface/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                style={{
                  boxShadow: '0 0 6px rgba(37, 99, 235, 0.3), 0 0 6px rgba(20, 184, 166, 0.3)'
                }}
              >
                {/* User Profile Icon SVG */}
                <svg 
                  className="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </button>

              {/* User Dropdown Menu - Shows when isDropdownOpen is true */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }} // Start slightly above and smaller
                  animate={{ opacity: 1, y: 0, scale: 1 }} // Animate to normal position and size
                  exit={{ opacity: 0, y: -10, scale: 0.95 }} // Exit animation
                  transition={{ duration: 0.2, ease: "easeOut" }} // Smooth transition
                  className="absolute right-0 top-full mt-2 w-64 bg-surface/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg z-50"
                  style={{
                    boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                  }}
                >
                  {isLoggedIn ? (
                    // Logged in user dropdown content
                    <div className="p-4">
                      {/* User Profile Section */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-text-primary font-semibold">John Doe</p>
                          <p className="text-text-secondary text-sm">john.doe@example.com</p>
                        </div>
                      </div>
                      
                      {/* Navigation Links for Logged In Users */}
                      <div className="space-y-2">
                        <Link
                          to="/patient-dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="block w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200"
                        >
                          Patient Dashboard
                        </Link>
                        <Link
                          to="/doctor-dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="block w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200"
                        >
                          Doctor Dashboard
                        </Link>
                        <button className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200">
                          View Profile
                        </button>
                        <button className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200">
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Not logged in user dropdown content
                    <div className="p-4">
                      {/* Guest User Section */}
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-text-secondary text-sm">You're not signed in.</p>
                      </div>
                      
                      {/* Sign In Button */}
                      <Link
                        to="/signin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-center font-semibold hover:shadow-lg transition-all duration-200"
                        style={{
                          boxShadow: '0 0 15px rgba(37, 99, 235, 0.4), 0 0 15px rgba(20, 184, 166, 0.4)'
                        }}
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
