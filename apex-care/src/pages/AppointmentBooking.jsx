/**
 * Apex Care - Appointment Booking Page Component
 * 
 * This component provides a multi-step appointment booking system.
 * It includes doctor selection, date/time selection, patient details form,
 * and confirmation modal. Features search, filtering, and pre-selection
 * from doctor pages.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Multi-step appointment booking with doctor selection and scheduling
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Award,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react'

/**
 * Mock doctors data - TODO: Replace with API call to /api/doctors
 * This data should be fetched from the backend and synchronized with OurDoctors.jsx
 */
const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Malik",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    consultationFee: 150,
    languages: ["English", "Spanish"],
    education: "MD, Harvard Medical School"
  },
  {
    id: 2,
    name: "Dr. Hassan Khan",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Wed", "Fri", "Sat"],
      start: "10:00",
      end: "18:00"
    },
    consultationFee: 120,
    languages: ["English", "Mandarin"],
    education: "MD, Stanford University"
  },
  {
    id: 3,
    name: "Dr. Sara Ahmed",
    specialty: "Pediatrician",
    experience: "15 years",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1594824388852-8a0a6b0b8b8b?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Tue", "Wed", "Thu", "Sat", "Sun"],
      start: "08:00",
      end: "16:00"
    },
    consultationFee: 100,
    languages: ["English", "Spanish"],
    education: "MD, Johns Hopkins University"
  },
  {
    id: 4,
    name: "Dr. Fahad Ali",
    specialty: "Orthopedist",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Thu", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    consultationFee: 180,
    languages: ["English", "Korean"],
    education: "MD, UCLA Medical School"
  },
  {
    id: 5,
    name: "Dr. Iqra Urooj",
    specialty: "Neurologist",
    experience: "8 years",
    rating: 4.8,
    reviews: 189,
    image: "https://media.licdn.com/dms/image/v2/D5603AQE3eqqmkeWZYA/profile-displayphoto-scale_400_400/B56ZlN085MKAAk-/0/1757947351742?e=1762992000&v=beta&t=6rUQrGI0Jg4h9CLgQonV0xJW6LkIUXEyWuG6rxrvc64",
    availability: {
      days: ["Tue", "Thu", "Sat"],
      start: "16:30",
      end: "01:30"
    },
    consultationFee: 140,
    languages: ["English", "Urdu"],
    education: "MD, Aga Khan University"
  },
  {
    id: 6,
    name: "Dr. Maryam Noor",
    specialty: "Nephrologist",
    experience: "5 years",
    rating: 4.6,
    reviews: 198,
    image: "https://plus.unsplash.com/premium_photo-1702598599506-9ff660bc50f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxwYWtpc3RhbmklMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start: "09:30",
      end: "22:30"
    },
    consultationFee: 160,
    languages: ["English", "Urdu"],
    education: "MD, Shifa College of Medicine"
  },
  {
    id: 7,
    name: "Dr. Omar Sheikh",
    specialty: "Psychiatrist",
    experience: "11 years",
    rating: 4.8,
    reviews: 223,
    image: "https://plus.unsplash.com/premium_photo-1661578549774-7906388bc733?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      start: "10:00",
      end: "02:00"
    },
    consultationFee: 130,
    languages: ["English", "Urdu"],
    education: "MD, Rawalpindi Medical University"
  },
  {
    id: 8,
    name: "Dr. Safia Saleem",
    specialty: "Gynecologist",
    experience: "6 years",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1594824388852-8a0b6b1b8b5c?w=300&h=300&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Wed", "Fri", "Sat"],
      start: "09:00",
      end: "16:00"
    },
    consultationFee: 120,
    languages: ["English", "Urdu"],
    education: "MD, Aga Khan University"
  },
  {
    id: 9,
    name: "Dr. Muhammad Awais",
    specialty: "General Surgeon",
    experience: "13 years",
    rating: 4.9,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start: "08:00",
      end: "18:00"
    },
    consultationFee: 200,
    languages: ["English", "Urdu"],
    education: "MD, King Edward Medical University"
  }
]

/**
 * Available time slots for appointment booking
 * TODO: Make this dynamic based on doctor availability and working hours
 */
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
]

/**
 * AppointmentBooking Component
 * 
 * Multi-step appointment booking system with:
 * - Step 1: Doctor selection with search and filter
 * - Step 2: Date and time selection
 * - Step 3: Patient details form
 * - Step 4: Confirmation modal
 * 
 * Features:
 * - URL parameter support for doctor pre-selection
 * - Real-time search and filtering
 * - Form validation
 * - Responsive design
 * 
 * @returns {JSX.Element} Appointment booking page component
 */
const AppointmentBooking = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // Form state management
  const [currentStep, setCurrentStep] = useState(1) // Current step in booking process
  const [selectedDoctor, setSelectedDoctor] = useState(null) // Selected doctor object
  const [appointmentType, setAppointmentType] = useState('online') // 'online' or 'in-person'
  const [selectedDate, setSelectedDate] = useState('') // Selected appointment date
  const [selectedTime, setSelectedTime] = useState('')
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    reason: '',
    symptoms: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const dropdownRef = React.useRef(null)

  // Available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = getAvailableDates()

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle pre-selection of doctor from URL parameter
  useEffect(() => {
    const doctorId = searchParams.get('doctorId')
    if (doctorId) {
      const doctor = doctors.find(d => d.id === parseInt(doctorId))
      if (doctor) {
        setSelectedDoctor(doctor)
        // Skip to step 2 if doctor is pre-selected
        setCurrentStep(2)
      }
    }
  }, [searchParams])

  // Get unique specializations
  const specializations = ['all', ...new Set(doctors.map(doctor => doctor.specialty))]

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // Here you would typically send the data to your backend
    console.log('Booking confirmed:', {
      doctor: selectedDoctor,
      type: appointmentType,
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails
    })
    
    // Navigate to success page or dashboard
    navigate('/patient-dashboard')
  }

  // Check if all required fields are filled for current step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDoctor !== null
      case 2:
        return appointmentType && selectedDate && selectedTime
      case 3:
        return patientDetails.name && patientDetails.email && patientDetails.phone && patientDetails.age && patientDetails.gender
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 px-6 pb-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#F8FAFC] mb-1">Book an Appointment</h1>
              <p className="text-[#94A3B8]">Schedule your consultation with our expert doctors</p>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white' 
                      : 'bg-[#374151] text-[#94A3B8]'
                  }`}>
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6]' : 'bg-[#374151]'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Back Button */}
          <div className="mb-6 -ml-2">
            <Link 
              to="/our-doctors" 
              className="inline-flex items-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Form Steps */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] rounded-xl p-8 border border-[#374151]"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Select Doctor */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Choose Your Doctor</h2>
                    
                    {/* Search and Filter Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                          <input
                            type="text"
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent placeholder-[#94A3B8] text-sm"
                          />
                        </div>
                        
                        {/* Specialty Filter */}
                        <div className="relative" ref={dropdownRef}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center space-x-2 px-3 py-2 bg-[#374151] border border-[#4B5563] rounded-full text-[#F8FAFC] hover:bg-[#4B5563] transition-all duration-300"
                          >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {selectedSpecialty === 'all' ? 'All' : selectedSpecialty}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                          </motion.button>
                          
                          {/* Dropdown Menu */}
                          {showFilterDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full right-0 mt-2 w-48 bg-[#374151] rounded-lg shadow-lg border border-[#4B5563] z-10"
                            >
                              <div className="py-2">
                                {specializations.map((specialty) => (
                                  <button
                                    key={specialty}
                                    onClick={() => {
                                      setSelectedSpecialty(specialty)
                                      setShowFilterDropdown(false)
                                    }}
                                    className={`w-full flex items-center px-4 py-2 text-sm hover:bg-[#4B5563] transition-colors duration-200 ${
                                      selectedSpecialty === specialty ? 'text-[#14B8A6] bg-[#14B8A6]/10' : 'text-[#F8FAFC]'
                                    }`}
                                  >
                                    <span className="capitalize">{specialty}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDoctors.length === 0 ? (
                        <div className="col-span-2 text-center py-12">
                          <div className="w-20 h-20 bg-[#374151] rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-[#94A3B8]" />
                          </div>
                          <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">No Doctors Found</h3>
                          <p className="text-[#94A3B8] mb-4">
                            No doctors match your current search criteria. Try adjusting your search or filter.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSearchTerm('')
                              setSelectedSpecialty('all')
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Clear Filters
                          </motion.button>
                        </div>
                      ) : (
                        filteredDoctors.map((doctor) => (
                        <motion.div
                          key={doctor.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedDoctor(doctor)}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedDoctor?.id === doctor.id
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10 shadow-lg'
                              : 'border-[#374151] hover:border-[#4B5563] hover:shadow-md'
                          }`}
                        >
                          {/* Doctor Header */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="relative">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-20 h-20 rounded-full object-cover border-2 border-[#374151]"
                              />
                              {selectedDoctor?.id === doctor.id && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{doctor.name}</h3>
                              <p className="text-[#14B8A6] font-semibold text-lg mb-2">{doctor.specialty}</p>
                              <p className="text-[#94A3B8] text-sm">{doctor.education}</p>
                            </div>
                          </div>

                          {/* Doctor Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-[#374151] rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-[#F8FAFC] font-semibold">{doctor.rating}</span>
                              </div>
                              <p className="text-[#94A3B8] text-xs">{doctor.reviews} reviews</p>
                            </div>
                            <div className="bg-[#374151] rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <Award className="w-4 h-4 text-[#14B8A6]" />
                                <span className="text-[#F8FAFC] font-semibold">{doctor.experience}</span>
                              </div>
                              <p className="text-[#94A3B8] text-xs">experience</p>
                            </div>
                          </div>

                          {/* Languages */}
                          <div className="mb-4">
                            <p className="text-[#94A3B8] text-sm mb-2">Languages:</p>
                            <div className="flex flex-wrap gap-2">
                              {doctor.languages.map((language, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-[#374151] text-[#F8FAFC] text-xs rounded-full"
                                >
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Availability & Price */}
                          <div className="flex items-center justify-between pt-4 border-t border-[#374151]">
                            <div>
                              <p className="text-[#94A3B8] text-sm">Available</p>
                              <p className="text-[#F8FAFC] text-sm font-medium">
                                {doctor.availability.days.join(', ')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[#F8FAFC] font-bold text-xl">${doctor.consultationFee}</p>
                              <p className="text-[#94A3B8] text-xs">per consultation</p>
                            </div>
                          </div>
                        </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Date & Time */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Select Date & Time</h2>
                    
                    {/* Selected Doctor Info */}
                    {selectedDoctor && (
                      <div className="mb-8 p-4 bg-[#374151] rounded-xl border border-[#4B5563]">
                        <div className="flex items-center space-x-4">
                          <img
                            src={selectedDoctor.image}
                            alt={selectedDoctor.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#14B8A6]"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-[#F8FAFC]">{selectedDoctor.name}</h3>
                            <p className="text-[#14B8A6] font-medium">{selectedDoctor.specialty}</p>
                            <p className="text-[#94A3B8] text-sm">{selectedDoctor.experience} experience</p>
                          </div>
                          <div className="ml-auto">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedDoctor(null)
                                setCurrentStep(1)
                              }}
                              className="px-4 py-2 bg-[#4B5563] text-[#F8FAFC] rounded-full text-sm hover:bg-[#6B7280] transition-colors duration-300"
                            >
                              Change Doctor
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Appointment Type */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Consultation Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppointmentType('online')}
                          className={`p-4 rounded-full border-2 transition-all duration-300 ${
                            appointmentType === 'online'
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10'
                              : 'border-[#374151] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Video className="w-6 h-6 text-[#14B8A6]" />
                            <div className="text-left">
                              <h4 className="font-semibold text-[#F8FAFC]">Video Consultation</h4>
                              <p className="text-sm text-[#94A3B8]">Meet your doctor online</p>
                            </div>
                          </div>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppointmentType('in-person')}
                          className={`p-4 rounded-full border-2 transition-all duration-300 ${
                            appointmentType === 'in-person'
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10'
                              : 'border-[#374151] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-6 h-6 text-[#14B8A6]" />
                            <div className="text-left">
                              <h4 className="font-semibold text-[#F8FAFC]">In-Person Visit</h4>
                              <p className="text-sm text-[#94A3B8]">Visit our clinic</p>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Select Date</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {availableDates.slice(0, 10).map((date, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                            className={`p-3 rounded-full border transition-all duration-300 ${
                              selectedDate === date.toISOString().split('T')[0]
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#F8FAFC]'
                                : 'border-[#374151] hover:border-[#4B5563] text-[#94A3B8]'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-lg font-bold">
                                {date.getDate()}
                              </div>
                              <div className="text-xs">
                                {date.toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Select Time</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-full border transition-all duration-300 ${
                              selectedTime === time
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#F8FAFC]'
                                : 'border-[#374151] hover:border-[#4B5563] text-[#94A3B8]'
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Patient Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Patient Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={patientDetails.name}
                            onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={patientDetails.email}
                            onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={patientDetails.phone}
                            onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Age *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            max="120"
                            value={patientDetails.age}
                            onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your age"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Gender *
                          </label>
                          <select
                            required
                            value={patientDetails.gender}
                            onChange={(e) => setPatientDetails({...patientDetails, gender: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Reason for Visit
                          </label>
                          <input
                            type="text"
                            value={patientDetails.reason}
                            onChange={(e) => setPatientDetails({...patientDetails, reason: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Brief reason for consultation"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                          Symptoms (Optional)
                        </label>
                        <textarea
                          value={patientDetails.symptoms}
                          onChange={(e) => setPatientDetails({...patientDetails, symptoms: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
                          placeholder="Describe your symptoms or concerns..."
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#374151]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
                      : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 inline mr-2" />
                  Previous
                </motion.button>

                <div className="flex items-center space-x-2 text-sm text-[#94A3B8]">
                  <span>Step {currentStep} of 3</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    canProceed()
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white hover:shadow-lg'
                      : 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
                  }`}
                >
                  {currentStep === 3 ? 'Review Booking' : 'Next'}
                  {currentStep < 3 && <ChevronRight className="w-4 h-4 inline ml-2" />}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-xl p-6 border border-[#374151] sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-6">Booking Summary</h3>
              
              {selectedDoctor && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-[#374151] rounded-lg">
                    <img
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[#F8FAFC]">{selectedDoctor.name}</h4>
                      <p className="text-sm text-[#14B8A6]">{selectedDoctor.specialty}</p>
                    </div>
                  </div>

                  {appointmentType && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {appointmentType === 'online' ? (
                          <Video className="w-4 h-4 text-[#14B8A6]" />
                        ) : (
                          <MapPin className="w-4 h-4 text-[#14B8A6]" />
                        )}
                        <span className="font-medium text-[#F8FAFC]">
                          {appointmentType === 'online' ? 'Video Consultation' : 'In-Person Visit'}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#14B8A6]" />
                        <span className="font-medium text-[#F8FAFC]">
                          {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-[#14B8A6]" />
                        <span className="font-medium text-[#F8FAFC]">{selectedTime}</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-[#374151] pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#94A3B8]">Consultation Fee</span>
                      <span className="font-semibold text-[#F8FAFC]">${selectedDoctor.consultationFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Platform Fee</span>
                      <span className="font-semibold text-[#F8FAFC]">$5</span>
                    </div>
                    <div className="border-t border-[#374151] mt-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#F8FAFC]">Total</span>
                        <span className="font-bold text-[#14B8A6] text-lg">
                          ${selectedDoctor.consultationFee + 5}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-8 max-w-md w-full border border-[#374151]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">Confirm Booking</h3>
                <p className="text-[#94A3B8]">
                  Please review your appointment details before confirming.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Doctor</span>
                  <span className="font-medium text-[#F8FAFC]">{selectedDoctor.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Date & Time</span>
                  <span className="font-medium text-[#F8FAFC]">
                    {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Type</span>
                  <span className="font-medium text-[#F8FAFC]">
                    {appointmentType === 'online' ? 'Video Consultation' : 'In-Person Visit'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Total</span>
                  <span className="font-bold text-[#14B8A6]">${selectedDoctor.consultationFee + 5}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-3 bg-[#374151] text-[#F8FAFC] rounded-full hover:bg-[#4B5563] transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-[#1E293B] border-t border-[#374151] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-4">Apex Medical</h3>
              <p className="text-[#94A3B8] mb-4 leading-relaxed">
                Your trusted partner in healthcare. We provide comprehensive medical services 
                with a focus on patient care and modern technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-[#374151] rounded-full flex items-center justify-center hover:bg-[#14B8A6] transition-colors duration-300 cursor-pointer">
                  <Phone className="w-5 h-5 text-[#F8FAFC]" />
                </div>
                <div className="w-10 h-10 bg-[#374151] rounded-full flex items-center justify-center hover:bg-[#14B8A6] transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5 text-[#F8FAFC]" />
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-[#F8FAFC] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300">Home</Link></li>
                <li><Link to="/our-doctors" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300">Our Doctors</Link></li>
                <li><Link to="/services" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300">Services</Link></li>
                <li><Link to="/about" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300">About</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-[#F8FAFC] mb-4">Contact</h4>
              <ul className="space-y-2 text-[#94A3B8]">
                <li>123 Medical Center Dr</li>
                <li>Health City, HC 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@apexmedical.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#374151] mt-8 pt-6 text-center">
            <p className="text-[#94A3B8]">
              © 2024 Apex Medical. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppointmentBooking
