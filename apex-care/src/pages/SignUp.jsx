/**
 * Apex Care - Sign Up Page Component
 * 
 * This component handles user registration for both patients and doctors.
 * It provides a form for account creation with user type selection,
 * form validation, and redirects to appropriate dashboard after registration.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description User registration page with patient/doctor role selection
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import aboutImage from '../../assets/about-section.jpg'
import Navbar from '../components/Navbar'

/**
 * SignUp Component
 * 
 * Handles user registration with:
 * - User type selection (Patient/Doctor)
 * - Form validation
 * - Account creation
 * - Redirect to appropriate dashboard
 * 
 * @returns {JSX.Element} Sign up page component
 */
const SignUp = () => {
  const [userType, setUserType] = useState('patient') // 'patient' or 'doctor'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sign up:', { userType, ...formData })
    // Handle sign up logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />
      
      {/* Go Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pt-24 px-6"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="flex items-start justify-center min-h-[calc(100vh-120px)] px-6 py-8">
        {/* Two Column Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-4 lg:px-8">
          
          {/* Left Side - Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
            style={{ marginRight: '30px' }}
          >
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 tracking-tight">
                  Create Account
                </h1>
                <p className="text-text-secondary text-lg">
                  {userType === 'doctor' ? 'Join our medical network' : 'Start your health journey'}
                </p>
              </div>

              {/* User Type Toggle - Diagonal Slash Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative w-full h-14 mb-8"
              >
                {/* Main Toggle Container */}
                <div className="relative w-full h-full bg-surface/50 backdrop-blur-sm rounded-full border border-white/10 overflow-hidden">
                  {/* Diagonal Slash Line */}
                  <div 
                    className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent transform -translate-x-1/2"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 0%, #14B8A6 20%, #14B8A6 80%, transparent 100%)',
                      boxShadow: '0 0 10px rgba(20, 184, 166, 0.8)'
                    }}
                  />
                  
                  {/* Active Background - Doctor Side */}
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: userType === 'doctor' ? 1 : 0,
                      originX: 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary to-accent"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      boxShadow: '0 0 12px rgba(37, 99, 235, 0.6), 0 0 12px rgba(20, 184, 166, 0.6)'
                    }}
                  />
                  
                  {/* Active Background - Patient Side */}
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: userType === 'patient' ? 1 : 0,
                      originX: 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-primary to-accent"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      boxShadow: '0 0 12px rgba(37, 99, 235, 0.6), 0 0 12px rgba(20, 184, 166, 0.6)'
                    }}
                  />
                  
                  {/* Doctor Button */}
                  <button
                    onClick={() => setUserType('doctor')}
                    aria-label="Select Doctor role"
                    className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      userType === 'doctor'
                        ? 'text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="relative z-10">As Doctor</span>
                  </button>
                  
                  {/* Patient Button */}
                  <button
                    onClick={() => setUserType('patient')}
                    aria-label="Select Patient role"
                    className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      userType === 'patient'
                        ? 'text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="relative z-10">As Patient</span>
                  </button>
                </div>
              </motion.div>

              {/* Sign Up Form - No Container Background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <label className="block text-text-primary text-sm font-medium mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-label="Full name"
                      className="w-full px-6 py-3 bg-transparent border border-surface/30 rounded-full text-text-primary placeholder-gray-400 focus:outline-none transition-all duration-300"
                      style={{
                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 14px rgba(37, 99, 235, 0.7), 0 0 14px rgba(20, 184, 166, 0.7)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                      }}
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1 }}
                  >
                    <label className="block text-text-primary text-sm font-medium mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-label="Email address"
                      className="w-full px-6 py-3 bg-transparent border border-surface/30 rounded-full text-text-primary placeholder-gray-400 focus:outline-none transition-all duration-300"
                      style={{
                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 14px rgba(37, 99, 235, 0.7), 0 0 14px rgba(20, 184, 166, 0.7)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                      }}
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    <label className="block text-text-primary text-sm font-medium mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      aria-label="Password"
                      className="w-full px-6 py-3 bg-transparent border border-surface/30 rounded-full text-text-primary placeholder-gray-400 focus:outline-none transition-all duration-300"
                      style={{
                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 14px rgba(37, 99, 235, 0.7), 0 0 14px rgba(20, 184, 166, 0.7)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                      }}
                      placeholder="Enter your password"
                    />
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                  >
                    <label className="block text-text-primary text-sm font-medium mb-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      aria-label="Confirm password"
                      className="w-full px-6 py-3 bg-transparent border border-surface/30 rounded-full text-text-primary placeholder-gray-400 focus:outline-none transition-all duration-300"
                      style={{
                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 14px rgba(37, 99, 235, 0.7), 0 0 14px rgba(20, 184, 166, 0.7)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                      }}
                      placeholder="Confirm your password"
                    />
                  </motion.div>

                  {/* Create Account Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    aria-label="Create Account"
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-full text-lg font-semibold transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.6), 0 0 30px rgba(20, 184, 166, 0.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                    }}
                  >
                    Create Account
                  </motion.button>
                </form>

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.8 }}
                  className="text-center mt-8"
                >
                  <p className="text-text-secondary">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-accent hover:text-primary font-medium transition-colors duration-300">
                      Sign In
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Static Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-start lg:sticky lg:top-24"
          >
            <div className="relative w-full h-[350px] lg:h-[450px] xl:h-[550px]">
              <img
                src={aboutImage}
                alt="Doctor using laptop and smartphone with futuristic medical holograms for remote healthcare"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
              />
              {/* Enhanced gradient overlay for better contrast */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none"></div>
              
              {/* Decorative glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                  boxShadow: '0 0 30px rgba(37, 99, 235, 0.2), 0 0 30px rgba(20, 184, 166, 0.2)'
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
