import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} props.redirectTo - Path to redirect to if not authenticated (default: '/signin')
 * @returns {JSX.Element} Protected route component
 */
const ProtectedRoute = ({ children, redirectTo = '/signin' }) => {
  const location = useLocation()
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    // Check for auth token in localStorage
    const authToken = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    // Check for session data in sessionStorage
    const sessionData = sessionStorage.getItem('sessionData')
    
    // Check for cookies (if using document.cookie)
    const hasAuthCookie = document.cookie.includes('authToken=')
    
    // Return true if any authentication method is present
    return !!(authToken || userData || sessionData || hasAuthCookie)
  }

  // If not authenticated, redirect to login with current location
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute
