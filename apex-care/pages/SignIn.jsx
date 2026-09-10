import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aboutImage from '../assets/about-section.jpg'

// Navbar Component (reused from main app)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: '2px solid transparent',
        backgroundImage: isScrolled 
          ? 'linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box'
          : 'linear-gradient(transparent, transparent) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box',
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4), 0 2px 8px rgba(20, 184, 166, 0.4)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Apex Care
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              Home
            </Link>
            <Link 
              to="/"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              About
            </Link>
            <Link 
              to="/"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              Contact Us
            </Link>
            
            {/* Profile Icon */}
            <button 
              className="p-2 rounded-full bg-surface/30 hover:bg-surface/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
              style={{
                boxShadow: '0 0 6px rgba(37, 99, 235, 0.3), 0 0 6px rgba(20, 184, 166, 0.3)'
              }}
            >
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
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

const SignIn = () => {
  const [userType, setUserType] = useState('patient')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sign in:', { userType, ...formData })
    // Handle sign in logic here
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
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        {/* Two Column Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4 lg:px-8">
          
          {/* Left Side - Sign In Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-text-secondary text-lg">
                  {userType === 'doctor' ? 'Access your medical dashboard' : 'Manage your health journey'}
                </p>
              </div>

              {/* User Type Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative flex bg-surface/50 backdrop-blur-sm rounded-xl p-1 mb-8 border border-white/10"
              >
                <motion.div
                  layout
                  className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-primary to-accent rounded-lg shadow-md ${
                    userType === 'patient' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setUserType('doctor')}
                  aria-label="Select Doctor role"
                  className={`relative z-10 flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    userType === 'doctor'
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  As Doctor
                </button>
                <button
                  onClick={() => setUserType('patient')}
                  aria-label="Select Patient role"
                  className={`relative z-10 flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    userType === 'patient'
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  As Patient
                </button>
              </motion.div>

              {/* Sign In Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-surface/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
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
                      className="w-full px-4 py-4 bg-background/50 backdrop-blur-sm border border-surface/50 rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 shadow-inner"
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1 }}
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
                      className="w-full px-4 py-4 bg-background/50 backdrop-blur-sm border border-surface/50 rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 shadow-inner"
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      placeholder="Enter your password"
                    />
                  </motion.div>

                  {/* Sign In Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    aria-label="Sign In"
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:ring-2 hover:ring-accent/40 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                </form>

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                  className="text-center mt-8"
                >
                  <p className="text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-accent hover:text-primary font-medium transition-colors duration-300">
                      Sign Up
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <img
                src={aboutImage}
                alt="Doctor using laptop and smartphone with futuristic medical holograms for remote healthcare"
                className="w-full max-w-lg max-h-[550px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Darker gradient overlay for better contrast */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
