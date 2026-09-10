/**
 * Apex Care - Smart Healthcare Platform
 * Main application component with routing and page components
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description A comprehensive healthcare platform connecting doctors and patients
 *              through IoT technology, remote consultations, and digital health tracking
 */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import aboutImage from '../assets/about-section.jpg'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OurServices from './pages/OurServices'
import OurDoctors from './pages/OurDoctors'
import AppointmentBooking from './pages/AppointmentBooking'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientPage from './pages/PatientPage'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import { Phone, Mail, MapPin } from 'lucide-react'
import Navbar from './components/Navbar'

/**
 * IoT Icons as SVG Components
 * Reusable SVG icon components for medical and healthcare-related UI elements
 */

/**
 * Heart Icon Component
 * @param {string} className - CSS classes to apply to the SVG
 * @returns {JSX.Element} Heart-shaped SVG icon
 */
const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

/**
 * ECG Icon Component
 * @param {string} className - CSS classes to apply to the SVG
 * @returns {JSX.Element} Electrocardiogram line pattern SVG icon
 */
const ECGIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h4l3-8 4 16 3-8h4"/>
  </svg>
)

/**
 * Thermometer Icon Component
 * @param {string} className - CSS classes to apply to the SVG
 * @returns {JSX.Element} Medical thermometer SVG icon
 */
const ThermometerIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0z"/>
    <path d="M12 1a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1z"/>
  </svg>
)

/**
 * Stethoscope Icon Component
 * @param {string} className - CSS classes to apply to the SVG
 * @returns {JSX.Element} Medical stethoscope SVG icon
 */
const StethoscopeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"/>
    <path d="M6 8h8"/>
    <path d="M6 12h8"/>
    <path d="M6 16h8"/>
  </svg>
)

/**
 * Floating IoT Icons Component
 * Creates an animated background with floating medical icons
 * Used to enhance the visual appeal of the hero section
 * 
 * @returns {JSX.Element} Container with floating medical icons
 */
const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Heart icons positioned at various locations with different animations */}
    <HeartIcon className="absolute top-20 left-10 w-8 h-8 text-accent opacity-20 animate-float drop-shadow-lg" />
    <HeartIcon className="absolute bottom-32 left-1/3 w-7 h-7 text-accent opacity-15 animate-float-delayed drop-shadow-lg" />
    
    {/* ECG icons with different sizes and animation delays */}
    <ECGIcon className="absolute top-32 right-16 w-12 h-12 text-primary opacity-15 animate-float-delayed drop-shadow-lg" />
    <ECGIcon className="absolute bottom-48 right-20 w-9 h-9 text-primary opacity-25 animate-float-slow drop-shadow-lg" />
    
    {/* Thermometer icons with varying opacity and animation speeds */}
    <ThermometerIcon className="absolute top-48 left-1/4 w-6 h-6 text-accent opacity-25 animate-float-slow drop-shadow-lg" />
    <ThermometerIcon className="absolute bottom-20 left-16 w-5 h-5 text-accent opacity-20 animate-float drop-shadow-lg" />
    
    {/* Stethoscope icons positioned strategically */}
    <StethoscopeIcon className="absolute top-64 right-1/3 w-10 h-10 text-primary opacity-20 animate-float drop-shadow-lg" />
    <StethoscopeIcon className="absolute top-1/2 right-10 w-8 h-8 text-primary opacity-15 animate-float-delayed drop-shadow-lg" />
  </div>
)



/**
 * Hero Section Component
 * Main landing section with animated content and call-to-action cards
 * Features the primary value proposition and navigation to key sections
 * 
 * @returns {JSX.Element} Hero section with animated content and action cards
 */
const HeroSection = () => {
  /**
   * Smooth scroll to contact section
   * Utility function to navigate to contact form
   */
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface overflow-hidden">
      <FloatingIcons />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight"
        >
          Smart Healthcare —{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Anywhere. Anytime.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-text-secondary mb-16 leading-relaxed max-w-3xl mx-auto"
        >
          Apex Care connects doctors and patients through remote appointments, IoT health tracking, 
          and digital prescriptions — all in one platform.
        </motion.p>
        
        {/* Action Cards - Three main navigation options */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Card 1: Sign In - Access existing account */}
          <Link to="/signin" className="block">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
              }}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
                Get-In
              </h3>
              <p className="text-text-secondary mb-5 leading-relaxed">
                Access your account to manage your health easily.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent text-white px-4 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
              >
                Sign In
              </motion.button>
            </motion.div>
          </Link>

          {/* Card 2: Our Services - Explore healthcare services */}
          <Link to="/services" className="block">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
              }}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
                Our Services
              </h3>
              <p className="text-text-secondary mb-5 leading-relaxed">
                Find our services to get extensive care.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
              >
                Learn More
              </motion.button>
            </motion.div>
          </Link>

          {/* Card 3: Our Staff - Meet the medical team */}
          <Link to="/our-doctors" className="block">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
              }}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
                Our Staff
              </h3>
              <p className="text-text-secondary mb-5 leading-relaxed">
                Find our Board-certified doctors.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
              >
                Meet Our Team
              </motion.button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * About Section Component
 * Displays information about Apex Care platform and its mission
 * Features company description and visual content
 * 
 * @returns {JSX.Element} About section with company information
 */
const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface to-background">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Company description and mission */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Apex Care</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed">
              <p>
                Apex Care is redefining healthcare by combining IoT technology with personalized patient care. 
                Our platform connects doctors and patients beyond geographical limits, making quality healthcare truly accessible.


              </p>
              
              <p>
              Using smart IoT devices, we enable real-time health monitoring, predictive insights, and data-driven treatment plans. 
              Doctors gain instant access to vital signs and lifestyle data to provide proactive, informed care.
              </p>
              
              <p>
              From remote consultations to digital prescriptions and AI health insights, Apex Care empowers patients to take charge of their well-being while giving doctors the tools for smarter, connected healthcare.
              </p>
            </div>
          </div>

          {/* Image Content - Visual representation of healthcare technology */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative mt-16"
            >
              <img
                src={aboutImage}
                alt="Doctor using laptop and smartphone with futuristic medical holograms for remote healthcare"
                className="w-full max-w-md rounded-2xl shadow-lg"
                style={{
                  boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                }}
              />
              {/* Overlay gradient for better text contrast and visual enhancement */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/**
 * Contact Section Component
 * Features a contact form and embedded map for user inquiries
 * Includes form validation and submission handling
 * 
 * @returns {JSX.Element} Contact section with form and location information
 */
const ContactSection = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  /**
   * Handle form input changes
   * Updates form state when user types in form fields
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Handle form submission
   * Processes form data and shows confirmation message
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement actual form submission to backend
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Header - Contact form title and description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Contact <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We'd love to hear from you! Get in touch with our team for any questions or support.
          </p>
        </motion.div>

        {/* Two-Column Layout - Form on left, map on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          
          {/* Left Column - Contact Form with input fields */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Your Name"
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
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Your Email"
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
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <textarea
                  name="message"
                  placeholder="Write your message here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  aria-label="Your Message"
                  className="w-full px-6 py-3 bg-transparent border border-surface/30 rounded-2xl text-text-primary placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    boxShadow: '0 0 10px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 14px rgba(37, 99, 235, 0.7), 0 0 14px rgba(20, 184, 166, 0.7)'
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                  }}
                />
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                aria-label="Send Message"
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
                Send Message
              </motion.button>
            </form>

            {/* Contact Information - Phone and email details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 mt-8"
            >
              <div className="flex items-center space-x-3">
                <Phone size={24} className="text-[#14B8A6]" />
                <span className="text-text-primary font-medium">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={24} className="text-[#14B8A6]" />
                <span className="text-text-primary font-medium">support@healthconnect.pk</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Embedded map and location information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 h-full flex flex-col"
          >
            {/* Embedded Google Maps - Hospital location */}
            <div className="flex-1 rounded-2xl overflow-hidden min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d651.1131535208974!2d70.9120854722349!3d31.81947185927738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39266e76cf15ad2b%3A0x8abb2e9d69bb21c7!2sDr%20Abdur%20Rahman%20Hospital!5e1!3m2!1sen!2s!4v1760189766438!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Hospital Address - Physical location details */}
            <div className="flex items-center space-x-3">
              <MapPin size={24} className="text-[#14B8A6]" />
              <span className="text-text-primary font-medium">Dr. Abdur Rahman Hospital, Dera Ismail Khan, Pakistan</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Footer Component
 * Contains social media links, footer navigation, and copyright information
 * Provides additional site navigation and contact options
 * 
 * @returns {JSX.Element} Footer with social links and legal information
 */
const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center space-y-6">
          {/* Social Media Icons - Twitter, Facebook, LinkedIn */}
          <div className="flex justify-center space-x-4">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-surface/30 rounded-full flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-300"
              style={{
                boxShadow: '0 0 10px rgba(37, 99, 235, 0.2), 0 0 10px rgba(20, 184, 166, 0.2)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-surface/30 rounded-full flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-300"
              style={{
                boxShadow: '0 0 10px rgba(37, 99, 235, 0.2), 0 0 10px rgba(20, 184, 166, 0.2)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-surface/30 rounded-full flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-300"
              style={{
                boxShadow: '0 0 10px rgba(37, 99, 235, 0.2), 0 0 10px rgba(20, 184, 166, 0.2)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </div>
          
          {/* Footer Navigation Links - Legal and support pages */}
          <div className="flex justify-center space-x-8">
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Privacy Policy
            </button>
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Terms of Service
            </button>
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Support
            </button>
          </div>
          
          {/* Copyright Information */}
          <p className="text-text-secondary text-sm">
            © 2025 Apex Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * Home Page Component
 * Main landing page that combines all sections
 * Includes navigation, hero, about, contact, and footer
 * 
 * @returns {JSX.Element} Complete home page layout
 */
const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary font-inter">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

/**
 * Main App Component
 * Root component that sets up routing and manages application state
 * Defines all application routes and handles navigation
 * 
 * @returns {JSX.Element} Main application with routing configuration
 */
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />
        {/* Authentication routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Service and information routes */}
        <Route path="/services" element={<OurServices />} />
        <Route path="/our-doctors" element={<OurDoctors />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        {/* Doctor dashboard route - Protected */}
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        {/* Patient dashboard route - Protected */}
        <Route path="/patient-dashboard" element={
          <ProtectedRoute>
            <PatientPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
