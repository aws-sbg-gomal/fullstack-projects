/**
 * Apex Care - Patient Appointments Page Component
 * 
 * This component displays the patient's appointment history and management.
 * It includes appointment filtering, status tracking, and actions like
 * rescheduling, canceling, and joining live appointments.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Patient appointments management with filtering and actions
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  ChevronDown
} from 'lucide-react'

const PatientAppointments = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
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

  // Mock appointments data
  const appointments = {
    upcoming: [
      {
        id: 1,
        doctor: 'Dr. Ayesha Malik',
        specialty: 'Cardiologist',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
        date: '2024-12-20',
        time: '2:30 PM',
        type: 'Video Consultation',
        status: 'Confirmed',
        duration: '30 minutes',
        notes: 'Follow-up appointment for hypertension management',
        meetingLink: '#'
      },
      {
        id: 2,
        doctor: 'Dr. Hassan Khan',
        specialty: 'Dermatologist',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
        date: '2024-12-25',
        time: '10:00 AM',
        type: 'In-Person',
        status: 'Confirmed',
        duration: '45 minutes',
        notes: 'Skin consultation for acne treatment',
        address: '123 Medical Center, Health District'
      }
    ],
    completed: [
      {
        id: 3,
        doctor: 'Dr. Sara Ahmed',
        specialty: 'General Practitioner',
        doctorImage: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=100&h=100&fit=crop&crop=face',
        date: '2024-12-10',
        time: '3:00 PM',
        type: 'Video Consultation',
        status: 'Completed',
        duration: '25 minutes',
        notes: 'Annual health checkup and vaccination',
        diagnosis: 'General health checkup completed',
        prescriptions: ['Multivitamin', 'Vitamin D3']
      },
      {
        id: 4,
        doctor: 'Dr. Fahad Ali',
        specialty: 'Orthopedic Surgeon',
        doctorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
        date: '2024-11-28',
        time: '11:30 AM',
        type: 'In-Person',
        status: 'Completed',
        duration: '40 minutes',
        notes: 'Knee pain consultation',
        diagnosis: 'Mild knee strain',
        prescriptions: ['Ibuprofen', 'Physical therapy recommended']
      }
    ],
    cancelled: [
      {
        id: 5,
        doctor: 'Dr. Omar Sheikh',
        specialty: 'Psychiatrist',
        doctorImage: 'https://plus.unsplash.com/premium_photo-1661578549774-7906388bc733?w=100&h=100&fit=crop&crop=face',
        date: '2024-11-15',
        time: '4:00 PM',
        type: 'Video Consultation',
        status: 'Cancelled',
        duration: '60 minutes',
        notes: 'Mental health consultation',
        reason: 'Patient requested cancellation'
      }
    ]
  }

  const tabs = [
    { id: 'all', label: 'All', count: appointments.upcoming.length + appointments.completed.length + appointments.cancelled.length, icon: Calendar },
    { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length, icon: Calendar },
    { id: 'completed', label: 'Completed', count: appointments.completed.length, icon: CheckCircle },
    { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length, icon: XCircle }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-400 bg-green-500/20'
      case 'Completed': return 'text-blue-400 bg-blue-500/20'
      case 'Cancelled': return 'text-red-400 bg-red-500/20'
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return CheckCircle
      case 'Completed': return CheckCircle
      case 'Cancelled': return XCircle
      case 'Pending': return AlertCircle
      default: return Calendar
    }
  }

  const handleJoinAppointment = (appointment) => {
    console.log('Joining appointment:', appointment.id)
    // In a real app, this would open the video call or redirect to the meeting
  }

  const handleReschedule = (appointment) => {
    console.log('Rescheduling appointment:', appointment.id)
    // In a real app, this would open a rescheduling modal
  }

  const handleCancel = (appointment) => {
    console.log('Cancelling appointment:', appointment.id)
    // In a real app, this would show a confirmation dialog
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
        style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F8FAFC] mb-2">My Appointments</h1>
            <p className="text-[#94A3B8]">Manage your medical appointments and consultations</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Filter Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#374151] rounded-lg text-[#F8FAFC] hover:bg-[#4B5563] transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
              
              {/* Dropdown Menu */}
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#374151] rounded-lg shadow-lg border border-[#4B5563] z-10"
                >
                  <div className="py-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id)
                          setShowFilterDropdown(false)
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[#4B5563] transition-colors duration-200 ${
                          activeTab === tab.id ? 'text-blue-400 bg-blue-500/10' : 'text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <tab.icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                        <span className="px-2 py-1 bg-[#1E293B] rounded-full text-xs">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Book Appointment
            </motion.button>
          </div>
        </div>
      </motion.div>


      {/* Appointments List */}
      <div className="space-y-4">
        {(() => {
          const currentAppointments = activeTab === 'all' 
            ? [...appointments.upcoming, ...appointments.completed, ...appointments.cancelled]
            : appointments[activeTab]
          
          return currentAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E293B] rounded-xl p-12 text-center border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <Calendar className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">
              No {activeTab === 'all' ? '' : activeTab} appointments
            </h3>
            <p className="text-[#94A3B8] mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming appointments. Book one now!"
                : activeTab === 'all'
                ? "You don't have any appointments yet. Book one now!"
                : `You don't have any ${activeTab} appointments.`
              }
            </p>
            {(activeTab === 'upcoming' || activeTab === 'all') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBookModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Book Appointment
              </motion.button>
            )}
          </motion.div>
        ) : (
          currentAppointments.map((appointment, index) => {
            const StatusIcon = getStatusIcon(appointment.status)
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50 hover:border-blue-500/30 transition-all duration-300 relative"
                style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-start space-x-4">
                  {/* Doctor Image */}
                  <img
                    src={appointment.doctorImage}
                    alt={appointment.doctor}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#F8FAFC]">{appointment.doctor}</h3>
                          <p className="text-[#94A3B8] text-sm">{appointment.specialty}</p>
                        </div>
                        {appointment.status === 'Confirmed' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleJoinAppointment(appointment)}
                            className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full text-xs font-medium transition-all duration-300"
                          >
                            Join Live
                          </motion.button>
                        )}
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{appointment.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.type === 'Video Consultation' ? (
                          <Video className="w-4 h-4 text-[#94A3B8]" />
                        ) : (
                          <MapPin className="w-4 h-4 text-[#94A3B8]" />
                        )}
                        <span className="text-[#F8FAFC] text-sm">{appointment.type}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <p className="text-[#94A3B8] text-sm mb-4">{appointment.notes}</p>
                    )}

                    {appointment.address && (
                      <div className="flex items-center space-x-2 mb-4">
                        <MapPin className="w-4 h-4 text-[#94A3B8]" />
                        <span className="text-[#F8FAFC] text-sm">{appointment.address}</span>
                      </div>
                    )}

                    {/* Completed appointment details */}
                    {appointment.status === 'Completed' && (
                      <div className="bg-[#374151] rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2">Appointment Summary</h4>
                        {appointment.diagnosis && (
                          <p className="text-[#94A3B8] text-sm mb-2">
                            <span className="font-medium">Diagnosis:</span> {appointment.diagnosis}
                          </p>
                        )}
                        {appointment.prescriptions && appointment.prescriptions.length > 0 && (
                          <div>
                            <p className="text-[#94A3B8] text-sm font-medium mb-1">Prescriptions:</p>
                            <ul className="text-[#94A3B8] text-sm list-disc list-inside">
                              {appointment.prescriptions.map((prescription, idx) => (
                                <li key={idx}>{prescription}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cancelled appointment reason */}
                    {appointment.status === 'Cancelled' && appointment.reason && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                        <p className="text-red-400 text-sm">
                          <span className="font-medium">Cancellation Reason:</span> {appointment.reason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons - Lower Corner */}
                  {appointment.status === 'Confirmed' && (
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReschedule(appointment)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-xs font-medium transition-all duration-300"
                      >
                        Reschedule
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancel(appointment)}
                        className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs font-medium transition-all duration-300"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  )}
                  
                  {appointment.status === 'Completed' && (
                    <div className="absolute bottom-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAppointment(appointment)}
                        className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        View Details
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })
        )
        })()}
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowBookModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Book Appointment</h3>
            <p className="text-[#94A3B8] mb-6">
              Ready to book your appointment? You'll be redirected to our booking page where you can select a doctor, choose your preferred date and time.
            </p>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBookModal(false)}
                className="flex-1 px-4 py-2 bg-[#374151] text-[#F8FAFC] rounded-lg font-medium hover:bg-[#4B5563] transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowBookModal(false)
                  navigate('/book-appointment')
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue to Booking
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAppointment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E293B] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Appointment Details</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors duration-300"
              >
                <XCircle className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedAppointment.doctorImage}
                  alt={selectedAppointment.doctor}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#F8FAFC]">{selectedAppointment.doctor}</h3>
                  <p className="text-[#94A3B8]">{selectedAppointment.specialty}</p>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full mt-2 ${getStatusColor(selectedAppointment.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedAppointment.status}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="bg-[#374151] rounded-lg p-4">
                <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">Appointment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Date</p>
                    <p className="text-[#F8FAFC]">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-sm">Time</p>
                    <p className="text-[#F8FAFC]">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-sm">Type</p>
                    <p className="text-[#F8FAFC]">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-sm">Duration</p>
                    <p className="text-[#F8FAFC]">{selectedAppointment.duration}</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {selectedAppointment.diagnosis && (
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2">Diagnosis</h4>
                  <p className="text-[#94A3B8] bg-[#374151] rounded-lg p-4">{selectedAppointment.diagnosis}</p>
                </div>
              )}

              {selectedAppointment.prescriptions && selectedAppointment.prescriptions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2">Prescriptions</h4>
                  <div className="space-y-2">
                    {selectedAppointment.prescriptions.map((prescription, idx) => (
                      <div key={idx} className="bg-[#374151] rounded-lg p-3">
                        <p className="text-[#F8FAFC]">{prescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default PatientAppointments
