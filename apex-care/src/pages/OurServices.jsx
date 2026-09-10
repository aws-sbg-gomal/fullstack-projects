/**
 * Apex Care - Our Services Page Component
 * 
 * This component displays the healthcare services offered by Apex Care.
 * It includes service cards with descriptions, availability status, and action buttons.
 * Services include appointment booking, health monitoring, prescriptions, and more.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Services showcase page with interactive service cards
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Calendar, ClipboardList, Stethoscope, Shield, AlertTriangle } from 'lucide-react'

/**
 * Footer Component
 * 
 * Reusable footer component with copyright and legal links
 * Used across multiple pages for consistency
 * 
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">
            © 2025 Apex Care. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * OurServices Component
 * 
 * Main services page component that displays:
 * - Service cards with descriptions and icons
 * - Availability status for each service
 * - Action buttons for available services
 * - Navigation to booking and other pages
 * 
 * @returns {JSX.Element} Services page component
 */
const OurServices = () => {
  // Services data array with all available healthcare services
  const services = [
    {
      id: 1,
      title: "Smart Appointment Booking",
      description: "Book appointments with the right specialists in just a few clicks. Choose your preferred time slot and consultation mode (online or in-clinic).",
      icon: Calendar,
      available: true
    },
    {
      id: 2,
      title: "Online Consultation",
      description: "Connect instantly with verified doctors for video or chat consultations — anytime, anywhere. Get digital prescriptions and follow-up reminders with complete privacy.",
      icon: Stethoscope,
      available: true,
      comingSoon: false
    },
    {
      id: 3,
      title: "Health Records Management",
      description: "Your health data, securely organized. Upload and access medical reports, prescriptions, and past visits all in one place.",
      icon: ClipboardList,
      available: false,
      comingSoon: true
    },
    {
      id: 4,
      title: "Emergency & Support",
      description: "24/7 help for urgent cases and quick medical assistance. Our goal — connect you with the nearest available care within minutes.",
      icon: AlertTriangle,
      available: false,
      comingSoon: true
    }
  ]

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

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 tracking-tight">
            Your Health, Simplified — Anytime, Anywhere.
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Explore our range of digital healthcare services designed to make medical care accessible, smarter, and faster.
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="px-6 py-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div 
                  className="bg-surface/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(37, 99, 235, 0.3), 0 0 20px rgba(20, 184, 166, 0.3)'
                  }}
                >
                  {/* Coming Soon Badge */}
                  {service.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={48} className="text-[#14B8A6]" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Action Button */}
                  {service.available ? (
                    <Link to="/book-appointment">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg"
                        style={{
                          boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                        }}
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={true}
                      className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 bg-surface/50 text-text-secondary cursor-not-allowed"
                    >
                      Coming Soon
                    </motion.button>
                  )}
                </div>

                {/* Enhanced Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                    boxShadow: '0 0 40px rgba(37, 99, 235, 0.4), 0 0 40px rgba(20, 184, 166, 0.4)'
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of users who trust Apex Care for their digital healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
              }}
            >
              Get Started Today
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-surface/50 text-text-primary rounded-full font-semibold hover:bg-surface/30 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default OurServices
