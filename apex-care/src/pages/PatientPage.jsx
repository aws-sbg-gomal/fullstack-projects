/**
 * Apex Care - Patient Dashboard Page Component
 * 
 * This component provides the main dashboard interface for patients.
 * It includes appointment management, health tracking, profile management,
 * and navigation to various patient-specific features.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Patient dashboard with appointment management and health tracking
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  History, 
  User, 
  LogOut,
  Bell,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Video,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  X
} from 'lucide-react'
import PatientHistory from './PatientHistory'
import PatientAppointments from './PatientAppointments'
import PatientProfile from './PatientProfile'
import PatientLogout from './PatientLogout'
import PatientLiveAppointment from './PatientLiveAppointment'
import Navbar from '../components/Navbar'

const PatientPage = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('home')
  const [showBookModal, setShowBookModal] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [timeUntilAppointment, setTimeUntilAppointment] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(2)

  // Patient data with localStorage sync
  const [patientData, setPatientData] = useState({
    name: "Sarah Ahmad",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzt3XBMupEnVPQ66F4TI5ejPbN6RYBl9xeIg&s",
    email: "sarah.ahmed@email.com",
    phone: "+92 300 1234567"
  })

  // Load patient data from localStorage on component mount
  useEffect(() => {
    const savedPatientData = localStorage.getItem('patientData')
    if (savedPatientData) {
      setPatientData(JSON.parse(savedPatientData))
    }
  }, [])

  // Listen for localStorage changes to sync profile image updates
  useEffect(() => {
    const handleStorageChange = () => {
      const savedPatientData = localStorage.getItem('patientData')
      if (savedPatientData) {
        setPatientData(JSON.parse(savedPatientData))
      }
    }

    // Listen for storage events (from other tabs)
    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events (from same tab)
    window.addEventListener('patientDataUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('patientDataUpdated', handleStorageChange)
    }
  }, [])

  const summaryData = {
    doctors: { count: 12, label: "Available" },
    services: { description: "Telehealth, Diagnostics, Consultation" },
    appointments: { hasUpcoming: true }
  }

  const upcomingAppointment = {
    id: "APT-001",
    doctorName: "Dr. Ayesha Malik",
    doctorSpecialty: "Cardiologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "2024-12-25",
    time: "2:30 PM",
    type: "Video Consultation",
    status: "Confirmed",
    meetingLink: "#"
  }

  // Mock notifications data
  const notificationsData = [
    {
      id: 1,
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Ayesha Malik is scheduled for tomorrow at 2:30 PM",
      time: "2 hours ago",
      type: "appointment",
      read: false
    },
    {
      id: 2,
      title: "Test Results Available",
      message: "Your blood test results from last week are now available in your medical history",
      time: "1 day ago",
      type: "results",
      read: false
    },
    {
      id: 3,
      title: "Prescription Ready",
      message: "Your prescription for Lisinopril is ready for pickup at the pharmacy",
      time: "2 days ago",
      type: "prescription",
      read: true
    }
  ]

  // Mock messages data
  const messagesData = [
    {
      id: 1,
      sender: "Dr. Ayesha Malik",
      senderImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      message: "Hello Sarah, I've reviewed your test results. Everything looks good!",
      time: "10:30 AM",
      read: false
    },
    {
      id: 2,
      sender: "Dr. Hassan Khan",
      senderImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      message: "Your skin treatment plan is ready. Please schedule a follow-up appointment.",
      time: "Yesterday",
      read: false
    },
    {
      id: 3,
      sender: "Dr. Sara Ahmed",
      senderImage: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=100&h=100&fit=crop&crop=face",
      message: "Thank you for your visit today. Don't forget to take your vitamins!",
      time: "2 days ago",
      read: true
    }
  ]

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'live-appointment', label: 'Live Appointment', icon: Video },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ]


  const handleBookAppointment = () => {
    setShowBookModal(true)
  }

  const handleJoinLive = () => {
    // Navigate to live appointment or open video call
    console.log('Joining live appointment...')
  }

  // Countdown timer for upcoming appointment
  useEffect(() => {
    if (summaryData.appointments.hasUpcoming && upcomingAppointment) {
      const updateCountdown = () => {
        const now = new Date()
        const appointmentDate = new Date(upcomingAppointment.date + ' ' + upcomingAppointment.time)
        const timeDiff = appointmentDate.getTime() - now.getTime()

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

          if (days > 0) {
            setTimeUntilAppointment(`${days}d ${hours}h ${minutes}m`)
          } else if (hours > 0) {
            setTimeUntilAppointment(`${hours}h ${minutes}m ${seconds}s`)
          } else {
            setTimeUntilAppointment(`${minutes}m ${seconds}s`)
          }
        } else {
          setTimeUntilAppointment('Starting soon')
        }
      }

      updateCountdown()
      const interval = setInterval(updateCountdown, 1000)

      return () => clearInterval(interval)
    }
  }, [summaryData.appointments.hasUpcoming, upcomingAppointment])

  const handleViewServices = () => {
    navigate('/services')
  }

  const handleFindDoctors = () => {
    navigate('/our-doctors')
  }

  const handleAppointmentCardClick = () => {
    setActiveMenu('appointments')
  }

  const handleReschedule = (e) => {
    e.stopPropagation() // Prevent card click
    console.log('Reschedule appointment')
  }

  const handleCancelAppointment = (e) => {
    e.stopPropagation() // Prevent card click
    console.log('Cancel appointment')
  }

  const handleGetAppointed = (e) => {
    e.stopPropagation() // Prevent card click
    setShowBookModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      {/* Main Navigation Bar */}
      <Navbar />
      
      {/* Header Bar - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1E293B] border-b border-[#374151] px-6 py-6 pt-24"
        style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="flex justify-between items-center">
          <div className="ml-8">
            <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">
              Welcome back, {patientData.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-[#94A3B8] text-lg">
              Here's your health dashboard overview
            </p>
          </div>
          
          {/* Notifications and Messages */}
          <div className="flex items-center space-x-4">
            {/* Messages Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMessages(!showMessages)}
              className="relative p-3 bg-[#374151] rounded-full hover:bg-[#4B5563] transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </motion.button>

            {/* Notifications Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-[#374151] rounded-full hover:bg-[#4B5563] transition-all duration-300"
            >
              <Bell className="w-6 h-6 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-6 top-32 w-80 bg-[#1E293B] rounded-xl shadow-lg border border-[#374151] z-50"
          >
            <div className="p-4 border-b border-[#374151]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#F8FAFC]">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-[#374151] rounded-lg transition-colors duration-300"
                >
                  <X className="w-4 h-4 text-[#94A3B8]" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notificationsData.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-[#374151] hover:bg-[#374151] transition-colors duration-300 ${
                    !notification.read ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      !notification.read ? 'bg-blue-500' : 'bg-transparent'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#F8FAFC] mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-[#94A3B8] text-sm mb-2">{notification.message}</p>
                      <p className="text-[#94A3B8] text-xs">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#374151]">
              <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Dropdown */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-20 top-32 w-80 bg-[#1E293B] rounded-xl shadow-lg border border-[#374151] z-50"
          >
            <div className="p-4 border-b border-[#374151]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#F8FAFC]">Messages</h3>
                <button
                  onClick={() => setShowMessages(false)}
                  className="p-1 hover:bg-[#374151] rounded-lg transition-colors duration-300"
                >
                  <X className="w-4 h-4 text-[#94A3B8]" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {messagesData.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-[#374151] hover:bg-[#374151] transition-colors duration-300 ${
                    !message.read ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={message.senderImage}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-[#F8FAFC]">
                          {message.sender}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <span className="text-[#94A3B8] text-xs">{message.time}</span>
                        </div>
                      </div>
                      <p className="text-[#94A3B8] text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#374151]">
              <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300">
                View All Messages
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${sidebarCollapsed ? 'w-18' : 'w-70'} bg-[#111827] transition-all duration-300 flex flex-col`}
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            minHeight: 'calc(100vh - 120px)'
          }}
        >
          {/* Toggle Button */}
          <div className="relative w-full">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute p-3 text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300 z-30 bg-[#111827] rounded-full hover:bg-[#1E293B] border border-[#1E293B] shadow-lg ${
                sidebarCollapsed ? 'top-2 right-2' : 'top-4 right-4'
              }`}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </div>

          {/* Patient Profile */}
          <div className={`${sidebarCollapsed ? 'p-2 pt-16' : 'p-6 pt-16'}`}>
            <div className="text-center">
              <img
                src={patientData.avatar}
                alt={patientData.name}
                className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-32 h-32'} rounded-full object-cover mx-auto mb-4 transition-all duration-300`}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#F8FAFC] mb-1">
                      {patientData.name}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">
                      Patient
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Menu Items */}
          <div className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} pb-6`}>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => {
                    if (item.id === 'logout') {
                      setActiveMenu('logout')
                    } else {
                      setActiveMenu(item.id)
                    }
                  }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-full transition-all duration-300 group ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-[#2563EB]/20 to-[#14B8A6]/20 border border-[#2563EB]/30 text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
                  }`}
                  style={activeMenu === item.id ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  } : {}}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon 
                    size={22} 
                    className={`transition-colors duration-300 ${
                      activeMenu === item.id 
                        ? 'text-[#F8FAFC]' 
                        : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
                    }`}
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-3 font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Render different pages based on active menu */}
          {activeMenu === 'home' && (
            <>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Appointments Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={handleAppointmentCardClick}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer relative"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                {summaryData.appointments.hasUpcoming ? (
                  <span className="text-xs text-green-400">Upcoming</span>
                ) : (
                  <span className="text-xs text-[#94A3B8]">None</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Appointments</h3>
              {summaryData.appointments.hasUpcoming ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-[#94A3B8] text-sm">Next: Dec 25, 2024</p>
                    {timeUntilAppointment && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">{timeUntilAppointment}</span>
                      </div>
                    )}
                    {/* Appointment Details */}
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-xs">Dr. Ayesha Malik</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-xs">Dec 25, 2024 at 2:30 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-xs">Video Consultation</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[#94A3B8] text-sm">No upcoming appointments</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetAppointed}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Get Appointed
                  </motion.button>
                </div>
              )}
              
              {/* Action Buttons - Lower Right Corner */}
              {summaryData.appointments.hasUpcoming && (
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReschedule}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Reschedule
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelAppointment}
                    className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Services Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={handleViewServices}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Phone className="w-6 h-6 text-teal-400" />
                </div>
                <span className="text-xs text-[#94A3B8]">Available</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Our Services</h3>
              <p className="text-[#94A3B8] text-sm mb-">{summaryData.services.description}</p>
              <p className="text-[#94A3B8] text-xs italic mb-6">Your health is our priority, and we're here to serve you with care and compassion.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation() // Prevent card click
                  handleViewServices()
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                View Services
              </motion.button>
            </motion.div>

            {/* Doctors Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-[#F8FAFC]">
                  {summaryData.doctors.count}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Doctors</h3>
              <p className="text-[#94A3B8] text-sm mb-3">{summaryData.doctors.label}</p>
              <p className="text-[#94A3B8] text-xs italic mb-6">Expert medical professionals dedicated to providing you with the best healthcare experience.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFindDoctors}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                Find Doctor
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Appointment Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            style={{
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
            }}
          >
            {summaryData.appointments.hasUpcoming ? (
              <div>
                <h2 className="text-xl font-semibold text-[#F8FAFC] mb-6">Upcoming Appointment</h2>
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={upcomingAppointment.doctorImage}
                      alt={upcomingAppointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#F8FAFC]">
                        {upcomingAppointment.doctorName}
                      </h3>
                      <p className="text-[#94A3B8]">{upcomingAppointment.doctorSpecialty}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.type}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleJoinLive}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Join Live
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border border-[#94A3B8] text-[#94A3B8] rounded-full font-medium hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-all duration-300"
                    >
                      Reschedule
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#1E293B]/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[#94A3B8]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">No Upcoming Appointments</h3>
                <p className="text-[#94A3B8] mb-6">
                  You don't have any scheduled appointments. Book one now to get started!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookAppointment}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Book Appointment
                </motion.button>
              </div>
            )}
          </motion.div>
            </>
          )}

          {/* My Appointments Page */}
          {activeMenu === 'appointments' && <PatientAppointments />}

          {/* Live Appointment Page */}
          {activeMenu === 'live-appointment' && <PatientLiveAppointment />}

          {/* History Page */}
          {activeMenu === 'history' && <PatientHistory />}

          {/* Profile Page */}
          {activeMenu === 'profile' && <PatientProfile />}

          {/* Logout Page */}
          {activeMenu === 'logout' && <PatientLogout />}
        </div>
      </div>

      {/* Book Appointment Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Book Appointment</h3>
              <p className="text-[#94A3B8] mb-6">
                This feature is coming soon! You'll be able to book appointments with our doctors.
              </p>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatientPage
