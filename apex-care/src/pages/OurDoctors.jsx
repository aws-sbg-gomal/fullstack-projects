/**
 * Apex Care - Our Doctors Page Component
 * 
 * This component displays the medical team with doctor profiles, specialties,
 * availability status, and booking functionality. It includes search and filter
 * capabilities to help patients find the right doctor for their needs.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Doctors directory page with search, filter, and booking functionality
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
 * OurDoctors Component
 * 
 * Main doctors page component that displays:
 * - Doctor profiles with photos, specialties, and experience
 * - Real-time availability status checking
 * - Search functionality by name or specialty
 * - Filter by medical specialty
 * - Direct booking links to appointment system
 * 
 * @returns {JSX.Element} Doctors directory page component
 */
const OurDoctors = () => {
  // State management for search and filtering
  const [searchTerm, setSearchTerm] = useState('') // Search input value
  const [selectedSpecialty, setSelectedSpecialty] = useState('') // Selected specialty filter
  const navigate = useNavigate()

  /**
   * Check doctor availability based on current time and schedule
   * 
   * Handles both normal and cross-midnight availability schedules.
   * Returns 'available', 'busy', or 'unavailable' status.
   * 
   * @param {Object} availability - Doctor's availability schedule
   * @param {string[]} availability.days - Available days (e.g., ['Mon', 'Tue'])
   * @param {string} availability.start - Start time (e.g., '09:00')
   * @param {string} availability.end - End time (e.g., '17:00')
   * @param {number} doctorId - Doctor's unique identifier
   * @returns {string} Availability status: 'available', 'busy', or 'unavailable'
   */
  const checkDoctorAvailability = (availability, doctorId) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' })
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    // Convert time strings to minutes for comparison
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number)
      return hours * 60 + minutes
    }
    
    const startTimeInMinutes = timeToMinutes(availability.start)
    const endTimeInMinutes = timeToMinutes(availability.end)
    
    const isDayAvailable = availability.days.includes(currentDay)
    
    // Handle cross-midnight availability (e.g., 18:00 to 02:00)
    let isTimeAvailable
    if (endTimeInMinutes < startTimeInMinutes) {
      // Cross-midnight case
      isTimeAvailable = currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes
    } else {
      // Normal case
      isTimeAvailable = currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes
    }
    
    if (!isDayAvailable || !isTimeAvailable) {
      return 'unavailable'
    }
    
    // Simulate consistent busy status based on doctor ID
    // This creates a more realistic pattern where some doctors are consistently busy
    const busyDoctors = [2, 4, 7] // Dr. Hassan Khan, Dr. Fahad Ali, Dr. Omar Sheikh
    const isBusy = busyDoctors.includes(doctorId)
    
    return isBusy ? 'busy' : 'available'
  }

  // Doctor data with availability information
  const doctors = [
    {
      id: 1,
      name: "Dr. Muhammad Awais",
      specialty: "Cardiologist",
      experience: "12 years",
      description: "Specialized in advanced cardiac treatment and preventive care",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEVGcireqKjzw/profile-displayphoto-scale_400_400/B4EZmgtlqVIwAo-/0/1759337932273?e=1776297600&v=beta&t=2gKGMP9s1DKAn6SA06E_tupiSpVLPyOGkvWeA9JVwmM",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "09:00", end: "17:00" }
    },
    {
      id: 2,
      name: "Dr. Hassan Khan",
      specialty: "Dermatologist",
      experience: "9 years",
      description: "Expert in cosmetic dermatology and skin cancer treatment",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start: "08:00", end: "18:00" }
    },
    {
      id: 3,
      name: "Dr. Sara Ahmed",
      specialty: "Pediatrician",
      experience: "7 years",
      description: "Dedicated to children's health and developmental care",
      image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "10:00", end: "01:00" }
    },
    {
      id: 4,
      name: "Dr. Fahad Ali",
      specialty: "Orthopedic Surgeon",
      experience: "10 years",
      description: "Specialized in joint replacement and sports medicine",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Wed", "Fri"], start: "18:00", end: "02:00" }
    },
    {
      id: 6,
      name: "Dr. Maryam Noor",
      specialty: "Nephrologist",
      experience: "5 years",
      description: "Expert in nephrological disorders and kidney health",
      image: "https://plus.unsplash.com/premium_photo-1702598599506-9ff660bc50f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxwYWtpc3RhbmklMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "09:30", end: "22:30" }
    },
    {
      id: 7,
      name: "Dr. Omar Sheikh",
      specialty: "Psychiatrist",
      experience: "11 years",
      description: "Specialized in mental health and behavioral therapy",
      image: "https://plus.unsplash.com/premium_photo-1661578549774-7906388bc733?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start: "10:00", end: "02:00" }
    },
    {
      id: 9,
      name: "Dr. Ayesha Malik",
      specialty: "Gynecologist",
      experience: "13 years",
      description: "Specialized in women's health, pregnancy care, and reproductive medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "08:00", end: "18:00" }
    }
  ]

  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))]

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

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
            Meet Our Expert Doctors
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Our board-certified specialists are dedicated to providing exceptional healthcare with cutting-edge technology and compassionate care.
          </p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="px-6 py-8 -mt-5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-full text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(37, 99, 235, 0.3), 0 0 10px rgba(20, 184, 166, 0.3)'
                }}
              />
            </div>
            
             {/* Specialty Filter */}
             <div className="md:w-64 relative group">
               <div className="relative">
                 <select
                   value={selectedSpecialty}
                   onChange={(e) => setSelectedSpecialty(e.target.value)}
                   className="w-full px-6 py-4 pr-12 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-full text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 appearance-none cursor-pointer group-hover:bg-surface/40"
                   style={{
                     boxShadow: '0 0 12px rgba(37, 99, 235, 0.4), 0 0 12px rgba(20, 184, 166, 0.4)'
                   }}
                   onFocus={(e) => {
                     e.target.style.boxShadow = '0 0 18px rgba(37, 99, 235, 0.6), 0 0 18px rgba(20, 184, 166, 0.6)'
                   }}
                   onBlur={(e) => {
                     e.target.style.boxShadow = '0 0 12px rgba(37, 99, 235, 0.4), 0 0 12px rgba(20, 184, 166, 0.4)'
                   }}
                 >
                   <option value="" className="bg-surface text-text-primary py-2">All Specialties</option>
                   {specialties.map(specialty => (
                     <option 
                       key={specialty} 
                       value={specialty}
                       className="bg-surface text-text-primary py-2 hover:bg-accent/20"
                     >
                       {specialty}
                     </option>
                   ))}
                 </select>
                 
                 {/* Custom Dropdown Arrow - Perfectly Centered */}
                 <div className="absolute inset-y-0 right-0 flex items-center justify-center w-12 pointer-events-none">
                   <motion.svg
                     className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors duration-300"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     animate={{ rotate: selectedSpecialty ? 180 : 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M19 9l-7 7-7-7"
                     />
                   </motion.svg>
                 </div>
               </div>
               
               {/* Enhanced Glow Effect on Hover */}
               <div 
                 className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                   boxShadow: '0 0 20px rgba(37, 99, 235, 0.5), 0 0 20px rgba(20, 184, 166, 0.5)'
                 }}
               ></div>
             </div>
          </div>
        </div>
      </motion.section>

      {/* Doctors Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="px-6 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                 <div 
                   className="bg-surface/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300"
                   style={{
                     boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
                   }}
                 >
                   <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                     {/* Doctor Image */}
                     <div className="flex-shrink-0 mx-auto lg:mx-0">
                       <div className="relative">
                         <img
                           src={doctor.image}
                           alt={doctor.name}
                           className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                           style={{
                             boxShadow: '0 0 20px rgba(37, 99, 235, 0.5), 0 0 20px rgba(20, 184, 166, 0.5)'
                           }}
                         />
                         {/* Availability Status Badge */}
                         <div className="absolute -bottom-2 -right-2">
                           <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                             checkDoctorAvailability(doctor.availability, doctor.id) === 'available'
                               ? 'bg-green-500/90 text-white'
                               : checkDoctorAvailability(doctor.availability, doctor.id) === 'busy'
                               ? 'bg-blue-500/90 text-white'
                               : 'bg-red-500/90 text-white'
                           }`}>
                             {checkDoctorAvailability(doctor.availability, doctor.id) === 'available' 
                               ? '🟢 Available' 
                               : checkDoctorAvailability(doctor.availability, doctor.id) === 'busy'
                               ? '🔵 Busy'
                               : '🔴 Unavailable'
                             }
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Doctor Information */}
                     <div className="flex-1 min-w-0 text-center lg:text-left">
                       <h3 className="text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                         {doctor.name}
                       </h3>
                       <p className="text-xl text-accent font-semibold mb-2">
                         {doctor.specialty}
                       </p>
                       <p className="text-text-secondary mb-3 text-lg">
                         {doctor.experience} of experience
                       </p>
                       
                       {/* Availability Details */}
                       <div className="mb-4">
                         <p className="text-text-secondary text-sm mb-1">
                           Available: {doctor.availability.days.join(', ')}
                         </p>
                         <p className="text-text-secondary text-sm">
                           Hours: {doctor.availability.start} - {doctor.availability.end}
                         </p>
                       </div>
                       
                       <p className="text-text-secondary text-base leading-relaxed">
                         {doctor.description}
                       </p>
                     </div>

                     {/* Action Button */}
                     <div className="flex-shrink-0 w-full lg:w-auto">
                       {checkDoctorAvailability(doctor.availability, doctor.id) === 'available' ? (
                         <Link to={`/book-appointment?doctorId=${doctor.id}`}>
                           <motion.button
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             className="w-full lg:w-auto px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg"
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
                             Book Appointment
                           </motion.button>
                         </Link>
                       ) : (
                         <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           disabled={true}
                           className={`w-full lg:w-auto px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                             checkDoctorAvailability(doctor.availability, doctor.id) === 'busy'
                               ? 'bg-surface/50 text-text-secondary cursor-not-allowed border-2 border-blue-500/60'
                               : 'bg-surface/50 text-text-secondary cursor-not-allowed border-2 border-red-500/60'
                           }`}
                         >
                           {checkDoctorAvailability(doctor.availability, doctor.id) === 'busy'
                             ? 'Temporarily Busy'
                             : 'Currently Unavailable'
                           }
                         </motion.button>
                       )}
                     </div>
                   </div>
                 </div>

                {/* Enhanced Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.4), 0 0 15px rgba(20, 184, 166, 0.4)'
                  }}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredDoctors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-secondary text-lg">
                No doctors found matching your search criteria.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="text-center px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Can't Find the Right Specialist?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Our team can help you find the perfect doctor for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/')
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 150)
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold transition-all duration-300"
                style={{
                  boxShadow: '0 0 12px rgba(37, 99, 235, 0.3), 0 0 12px rgba(20, 184, 166, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 18px rgba(37, 99, 235, 0.5), 0 0 18px rgba(20, 184, 166, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 0 12px rgba(37, 99, 235, 0.3), 0 0 12px rgba(20, 184, 166, 0.3)'
                }}
              >
                Contact Our Team
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent/60 text-text-primary rounded-full font-semibold hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                View Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default OurDoctors
