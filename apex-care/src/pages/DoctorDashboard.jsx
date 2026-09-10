/**
 * Apex Care - Doctor Dashboard Component
 * 
 * This component provides the main dashboard interface for doctors.
 * It includes appointment management, patient information, live consultations,
 * and various dashboard sections with real-time updates.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Doctor dashboard with appointment management and live consultation features
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FeatureUnderUpdate from '../components/FeatureUnderUpdate'
import DoctorProfile from './DoctorProfile'
import { 
  LayoutDashboard, 
  CalendarDays, 
  ClipboardList, 
  CreditCard, 
  UserCircle, 
  Settings, 
  LogOut,
  Users,
  Building2,
  Calendar,
  Phone,
  FileText,
  MessageCircle,
  Check,
  X,
  Circle,
  Monitor,
  Building,
  Bell,
  Mail,
  Clock,
  AlertCircle,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Send,
  Save,
  User,
  Pill,
  TestTube,
  Eye
} from 'lucide-react'

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B]/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-[#94A3B8] text-sm mb-4">
            © 2025 Apex Care. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Chat Modal Component
const ChatModal = ({ patient, onClose }) => {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'patient', text: 'Hello Doctor, I have a question about my medication.', time: '2:30 PM' },
    { id: 2, sender: 'doctor', text: 'Hello! I\'m here to help. What would you like to know?', time: '2:31 PM' },
    { id: 3, sender: 'patient', text: 'Are my reports ready?', time: '2:32 PM' }
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'doctor',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages([...chatMessages, newMessage])
      setMessage('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${patient.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {patient.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === 'doctor'
                    ? 'bg-[#14B8A6] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'doctor' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Embedded LiveAppointment Component
const LiveAppointmentEmbedded = ({ appointmentData, onEndSession }) => {
  // State management
  const [sessionTime, setSessionTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [isPatientTyping, setIsPatientTyping] = useState(false)
  const [showPatientRecord, setShowPatientRecord] = useState(false)
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      message: 'Hello Doctor, thank you for taking my appointment.',
      time: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'doctor',
      message: 'Hello! How are you feeling today?',
      time: '10:31 AM',
      read: true
    },
    {
      id: 3,
      sender: 'patient',
      message: 'I have been experiencing some discomfort.',
      time: '10:32 AM',
      read: true
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  
  // Notes state
  const [notes, setNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  
  // Prescription state
  const [prescriptions, setPrescriptions] = useState([])
  const [newPrescription, setNewPrescription] = useState({
    medicine: '',
    dosage: '',
    duration: ''
  })
  
  // Test recommendation state
  const [testRecommendations, setTestRecommendations] = useState([])
  const [newTest, setNewTest] = useState({
    type: '',
    comments: ''
  })
  
  const chatEndRef = useRef(null)
  const notesTextareaRef = useRef(null)


  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  // Auto-save notes every 2 minutes
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (notes.trim()) {
        handleSaveNotes()
      }
    }, 120000) // 2 minutes
    return () => clearInterval(autoSaveTimer)
  }, [notes])

  // Format session time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Chat functions
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'doctor',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Notes functions
  const handleSaveNotes = () => {
    console.log('Saving notes:', notes)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  // Prescription functions
  const handleSendPrescription = () => {
    if (newPrescription.medicine && newPrescription.dosage && newPrescription.duration) {
      const prescription = {
        id: prescriptions.length + 1,
        ...newPrescription,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
      }
      setPrescriptions([...prescriptions, prescription])
      setNewPrescription({ medicine: '', dosage: '', duration: '' })
    }
  }

  // Test recommendation functions
  const handleSendTestRecommendation = () => {
    if (newTest.type) {
      const test = {
        id: testRecommendations.length + 1,
        ...newTest,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
      }
      setTestRecommendations([...testRecommendations, test])
      setNewTest({ type: '', comments: '' })
    }
  }

  const testTypes = [
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'ECG',
    'Ultrasound',
    'Urine Test',
    'Stool Test'
  ]

  return (
    <div className="p-6 space-y-6">

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Panel - Live Interaction Area (65% width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Call Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              {/* Patient Video Frame */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Patient Video</p>
                  <p className="text-gray-500 text-sm">{appointmentData.patientName}</p>
                </div>
              </div>
              
              {/* Doctor's Preview (small corner frame) */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-[#14B8A6] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isMuted ? 'bg-red-600 text-white' : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                }`}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  !isVideoOn ? 'bg-red-600 text-white' : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                }`}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEndSession}
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
              >
                <Phone size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Live Chat</h3>
            
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-4 mb-4 pr-2">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === 'doctor'
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white'
                        : 'bg-[#374151] text-[#F8FAFC]'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        msg.sender === 'doctor' ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {msg.time}
                      </p>
                      {msg.sender === 'doctor' && (
                        <Check size={12} className="text-white/70" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Tools & Patient Info (35% width on desktop) */}
        <div className="space-y-6">
          
          {/* Patient Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            {/* Session Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-[#14B8A6]" />
                <div>
                  <h3 className="text-lg font-semibold text-[#F8FAFC]">{appointmentData.patientName}</h3>
                  <p className="text-[#94A3B8] text-sm">Appointment ID: {appointmentData.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium text-sm">Live</span>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-[#374151] rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#F8FAFC] font-mono text-sm">Session: {formatTime(sessionTime)}</span>
                </div>
                <span className="text-[#94A3B8] text-sm">{appointmentData.consultationType}</span>
              </div>
            </div>

            {/* Patient Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Age:</span>
                <span className="text-[#F8FAFC]">{appointmentData.patientAge} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Gender:</span>
                <span className="text-[#F8FAFC]">{appointmentData.patientGender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Patient ID:</span>
                <span className="text-[#F8FAFC]">{appointmentData.patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Last Visit:</span>
                <span className="text-[#F8FAFC]">{appointmentData.lastVisit}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#94A3B8] text-sm mb-2">Medical History:</p>
              <p className="text-[#F8FAFC] text-sm">{appointmentData.medicalHistory}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPatientRecord(true)}
                className="w-full px-4 py-2 bg-[#374151] text-[#F8FAFC] rounded-xl hover:bg-[#4B5563] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Eye size={16} />
                <span>View Full Record</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEndSession}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone size={16} />
                <span>End Appointment</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#F8FAFC]">Notes</h3>
              {notesSaved && (
                <span className="text-green-400 text-sm flex items-center space-x-1">
                  <Check size={14} />
                  <span>Saved</span>
                </span>
              )}
            </div>
            <textarea
              ref={notesTextareaRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your consultation notes here..."
              className="w-full h-32 px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveNotes}
              className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Save Notes</span>
            </motion.button>
          </motion.div>

          {/* Prescription Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Prescription</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newPrescription.medicine}
                onChange={(e) => setNewPrescription({...newPrescription, medicine: e.target.value})}
                placeholder="Medicine Name"
                className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
              <input
                type="text"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                placeholder="Dosage"
                className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
              <input
                type="text"
                value={newPrescription.duration}
                onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                placeholder="Duration"
                className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendPrescription}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Pill size={16} />
                <span>Send Prescription</span>
              </motion.button>
            </div>
            
            {/* Sent Prescriptions */}
            {prescriptions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-[#94A3B8] mb-2">Sent Prescriptions:</h4>
                <div className="space-y-2">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="bg-[#374151] rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#F8FAFC] font-medium">{prescription.medicine}</p>
                          <p className="text-[#94A3B8] text-sm">{prescription.dosage} - {prescription.duration}</p>
                        </div>
                        <span className="text-[#94A3B8] text-xs">{prescription.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Test Recommendation Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Test Recommendations</h3>
            <div className="space-y-3">
              <select
                value={newTest.type}
                onChange={(e) => setNewTest({...newTest, type: e.target.value})}
                className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              >
                <option value="">Select Test Type</option>
                {testTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                value={newTest.comments}
                onChange={(e) => setNewTest({...newTest, comments: e.target.value})}
                placeholder="Additional comments (optional)"
                className="w-full h-20 px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendTestRecommendation}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <TestTube size={16} />
                <span>Send to Patient</span>
              </motion.button>
            </div>
            
            {/* Sent Test Recommendations */}
            {testRecommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-[#94A3B8] mb-2">Sent Recommendations:</h4>
                <div className="space-y-2">
                  {testRecommendations.map((test) => (
                    <div key={test.id} className="bg-[#374151] rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#F8FAFC] font-medium">{test.type}</p>
                          {test.comments && (
                            <p className="text-[#94A3B8] text-sm">{test.comments}</p>
                          )}
                        </div>
                        <span className="text-[#94A3B8] text-xs">{test.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>


      {/* Patient Record Modal */}
      <AnimatePresence>
        {showPatientRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPatientRecord(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Record</h2>
                  <button
                    onClick={() => setShowPatientRecord(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientAge} years</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientGender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient ID</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientId}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Medical History</label>
                    <p className="text-gray-900 dark:text-white mt-1">{appointmentData.medicalHistory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Visit</label>
                    <p className="text-gray-900 dark:text-white">{appointmentData.lastVisit}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('upcoming')
  const [availabilityStatus, setAvailabilityStatus] = useState('online')
  const [showSettings, setShowSettings] = useState(false)
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false)
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [currentView, setCurrentView] = useState('appointments') // 'appointments' or 'liveAppointment'
  const [selectedAppointmentForLive, setSelectedAppointmentForLive] = useState(null)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showLogoutToast, setShowLogoutToast] = useState(false)
  const [notificationAlerts, setNotificationAlerts] = useState([
    { id: 1, text: "New appointment booked by Ali Raza at 3:00 PM", time: "5m ago", type: "calendar", read: false },
    { id: 2, text: "Prescription updated for Sara Khan", time: "30m ago", type: "file", read: false },
    { id: 3, text: "System update scheduled tonight", time: "1h ago", type: "alert", read: true },
    { id: 4, text: "Patient Ayesha Khan uploaded new reports", time: "2h ago", type: "file", read: true },
    { id: 5, text: "Appointment reminder: Bilal Ahmed at 4:30 PM", time: "3h ago", type: "calendar", read: true }
  ])

  // Doctor profile data - now using state for dynamic updates
  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Ayesha Malik",
    specialty: "Cardiologist",
    role: "MBBS, FCPS",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
  })

  // Placeholder data arrays
  const appointments = [
    { id: 1, patientName: "M.J. Mical", reason: "Health Checkup", time: "09:30", status: "ongoing", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 2, patientName: "Sanath Deo", reason: "Follow-up", time: "12:30", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { id: 3, patientName: "Ahmed Khan", reason: "Chest pain evaluation", time: "14:00", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { id: 4, patientName: "Fatima Ali", reason: "Blood pressure check", time: "16:30", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
  ]

  const patients = [
    { id: 101, name: "Sanath Deo", dob: "1989-01-15", sex: "Male", weight: "59 kg", lastAppointment: "2025-01-15", height: "5'8\"", regDate: "2024-03-10" },
    { id: 102, name: "M.J. Mical", dob: "1975-08-22", sex: "Female", weight: "65 kg", lastAppointment: "2025-01-19", height: "5'6\"", regDate: "2024-01-15" },
    { id: 103, name: "Ahmed Khan", dob: "1982-12-03", sex: "Male", weight: "72 kg", lastAppointment: "2025-01-18", height: "5'10\"", regDate: "2024-05-20" }
  ]

  const appointmentRequests = [
    { id: 1, patientName: "John Smith", reason: "General consultation", time: "10:00 AM", date: "2025-01-20" },
    { id: 2, patientName: "Sarah Johnson", reason: "Follow-up visit", time: "2:00 PM", date: "2025-01-20" },
    { id: 3, patientName: "Mike Wilson", reason: "Health screening", time: "4:00 PM", date: "2025-01-21" }
  ]

  // Mock data for messages and notifications
  const messages = [
    { id: 1, name: "Ayesha Khan", message: "Doctor, are my reports ready?", time: "2m ago", online: true, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { id: 2, name: "Bilal Ahmed", message: "Thanks for your help!", time: "15m ago", online: false, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { id: 3, name: "Fatima Ali", message: "Can I schedule a follow-up?", time: "1h ago", online: true, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { id: 4, name: "Hassan Khan", message: "The medication is working well", time: "2h ago", online: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 5, name: "Sara Ahmed", message: "Thank you for the consultation", time: "3h ago", online: true, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" }
  ]


  // Extended appointments data for the appointments page
  const allAppointments = [
    {
      id: 1,
      name: "Ayesha Khan",
      age: 27,
      date: "2025-01-20",
      time: "10:00 AM",
      purpose: "Follow-up on test results",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://media.istockphoto.com/id/1206181103/photo/face-of-happy-young-persian-woman-smiling-in-traditional-clothing.jpg?s=612x612&w=0&k=20&c=6Kos894F11JWo5BmnqFladEquUeHTmvv6UK8m4gHJRk=",
      phone: "+92 300 1234567",
      email: "ayesha.khan@email.com"
    },
    {
      id: 2,
      name: "Bilal Ahmed",
      age: 35,
      date: "2025-01-19",
      time: "4:30 PM",
      purpose: "General Consultation",
      mode: "In-person",
      status: "Completed",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 2345678",
      email: "bilal.ahmed@email.com"
    },
    {
      id: 3,
      name: "Fatima Ali",
      age: 42,
      date: "2025-01-21",
      time: "2:00 PM",
      purpose: "Blood pressure check",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 3456789",
      email: "fatima.ali@email.com"
    },
    {
      id: 4,
      name: "Hassan Khan",
      age: 29,
      date: "2025-01-18",
      time: "11:30 AM",
      purpose: "Chest pain evaluation",
      mode: "In-person",
      status: "Completed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 4567890",
      email: "hassan.khan@email.com"
    },
    {
      id: 5,
      name: "Sara Ahmed",
      age: 31,
      date: "2025-01-22",
      time: "3:15 PM",
      purpose: "Diabetes management",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 5678901",
      email: "sara.ahmed@email.com"
    },
    {
      id: 6,
      name: "Omar Sheikh",
      age: 45,
      date: "2025-01-17",
      time: "9:00 AM",
      purpose: "Annual health checkup",
      mode: "In-person",
      status: "Cancelled",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 6789012",
      email: "omar.sheikh@email.com"
    }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'appointment-page', label: 'Live Appointment', icon: ClipboardList, isExternal: true },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ]

  const handleAvailabilityToggle = (status) => {
    setAvailabilityStatus(status)
  }

  const handleAppointmentAction = (appointmentId, action) => {
    console.log(`${action} appointment ${appointmentId}`)
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setShowPatientDetails(true)
  }

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment)
    setShowAppointmentModal(true)
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} status to ${newStatus}`)
    // In a real app, this would update the backend
  }

  const handleMessagesToggle = () => {
    setShowMessagesDropdown(!showMessagesDropdown)
    setShowNotificationsDropdown(false) // Close notifications if open
  }

  const handleNotificationsToggle = () => {
    setShowNotificationsDropdown(!showNotificationsDropdown)
    setShowMessagesDropdown(false) // Close messages if open
  }

  const handleMessageClick = (message) => {
    console.log(`Opening chat with ${message.name}`)
    setActiveChat(message)
    setShowChatModal(true)
    // Close dropdown with smooth transition
    setTimeout(() => setShowMessagesDropdown(false), 200)
  }

  const handleNotificationClick = (notificationId) => {
    console.log(`Handling notification ${notificationId}`)
    // Mark notification as read
    setNotificationAlerts(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
    // Close dropdown with smooth transition
    setTimeout(() => setShowNotificationsDropdown(false), 200)
  }

  const markAllNotificationsRead = () => {
    console.log('Marking all notifications as read')
    setNotificationAlerts(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const closeChatModal = () => {
    setShowChatModal(false)
    setActiveChat(null)
  }

  const handleJoinLive = (appointmentData) => {
    setSelectedAppointmentForLive(appointmentData)
    setCurrentView('liveAppointment')
  }

  const handleEndSession = () => {
    setCurrentView('appointments')
    setSelectedAppointmentForLive(null)
    // Show success toast
    console.log('Appointment Ended Successfully')
  }

  // Logout functionality
  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    // Clear all authentication/session data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('sessionData')
    sessionStorage.clear()
    
    // Clear any cookies (if using document.cookie)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
    
    // Show logout toast
    setShowLogoutToast(true)
    setShowLogoutDialog(false)
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowLogoutToast(false)
    }, 3000)
    
    // Redirect to login after a short delay
    setTimeout(() => {
      navigate('/signin')
    }, 1500)
  }

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'calendar': return <Calendar size={16} className="text-[#2563EB]" />
      case 'file': return <FileText size={16} className="text-[#14B8A6]" />
      case 'alert': return <AlertCircle size={16} className="text-[#F59E0B]" />
      default: return <Bell size={16} className="text-[#6B7280]" />
    }
  }

  const unreadNotificationsCount = notificationAlerts.filter(n => !n.read).length

  // Load doctor data from localStorage on component mount
  useEffect(() => {
    const savedDoctorData = localStorage.getItem('doctorData')
    if (savedDoctorData) {
      const data = JSON.parse(savedDoctorData)
      setDoctorProfile(prev => ({
        ...prev,
        name: data.name || prev.name,
        image: data.avatar || prev.image
      }))
    }
  }, [])

  // Listen for doctor data updates from DoctorProfile component
  useEffect(() => {
    const handleStorageChange = () => {
      const savedDoctorData = localStorage.getItem('doctorData')
      if (savedDoctorData) {
        const data = JSON.parse(savedDoctorData)
        setDoctorProfile(prev => ({
          ...prev,
          name: data.name || prev.name,
          image: data.avatar || prev.image
        }))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('doctorDataUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('doctorDataUpdated', handleStorageChange)
    }
  }, [])

  // Click outside to close dropdowns
  const messagesRef = useRef(null)
  const notificationsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessagesDropdown(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotificationsDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getAppointmentStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return '#22C55E'
      case 'Completed': return '#2563EB'
      case 'Cancelled': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getModeIcon = (mode) => {
    return mode === 'Online' ? <Monitor size={16} className="text-[#14B8A6]" /> : <Building size={16} className="text-[#2563EB]" />
  }

  // Filter appointments based on search and status
  const filteredAppointments = allAppointments.filter(appointment => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.date.includes(searchTerm) ||
                         appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22C55E'
      case 'busy': return '#3B82F6'
      case 'offline': return '#EF4444'
      case 'ongoing': return '#22C55E'
      case 'upcoming': return '#3B82F6'
      case 'pending': return '#F59E0B'
      case 'confirmed': return '#22C55E'
      case 'completed': return '#6B7280'
      default: return '#6B7280'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      case 'ongoing': return 'On Going'
      case 'upcoming': return 'Upcoming'
      case 'pending': return 'Pending'
      case 'confirmed': return 'Confirmed'
      case 'completed': return 'Completed'
      default: return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <Circle size={8} className="text-green-500 fill-current" />
      case 'busy': return <Circle size={8} className="text-blue-500 fill-current" />
      case 'offline': return <Circle size={8} className="text-red-500 fill-current" />
      case 'ongoing': return <Circle size={8} className="text-green-500 fill-current" />
      case 'upcoming': return <Circle size={8} className="text-blue-500 fill-current" />
      case 'pending': return <Circle size={8} className="text-yellow-500 fill-current" />
      case 'confirmed': return <Circle size={8} className="text-green-500 fill-current" />
      case 'completed': return <Circle size={8} className="text-gray-500 fill-current" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-0 bg-[#0F172A]/80 backdrop-blur-md border-b border-[#1E293B]/30 p-6 z-10 pt-24"
        style={{
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
        }}
      >
         <div className="flex items-center justify-between">
           <h1 className="text-3xl font-bold text-[#F8FAFC] ml-16">Dashboard</h1>
           <div className="flex items-center space-x-4">
             {/* Messages Icon */}
             <div className="relative" ref={messagesRef}>
               <button 
                 onClick={handleMessagesToggle}
                 className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative"
               >
                 <MessageCircle className="w-6 h-6" />
               </button>
               
               {/* Messages Dropdown */}
               <AnimatePresence>
                 {showMessagesDropdown && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: -10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                   >
                     <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                     </div>
                     <div className="max-h-80 overflow-y-auto">
                       {messages.map((message) => (
                         <motion.div
                           key={message.id}
                           initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.1 }}
                           onClick={() => handleMessageClick(message)}
                           className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                         >
                           <div className="flex items-start space-x-3">
                             <div className="relative">
                               <img
                                 src={message.avatar}
                                 alt={message.name}
                                 className="w-10 h-10 rounded-full object-cover"
                               />
                               <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                 message.online ? 'bg-green-500' : 'bg-gray-400'
                               }`}></div>
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between">
                                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                   {message.name}
                                 </p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">
                                   {message.time}
                                 </p>
                               </div>
                               <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                                 {message.message}
                               </p>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             {/* Notifications Icon */}
             <div className="relative" ref={notificationsRef}>
               <button 
                 onClick={handleNotificationsToggle}
                 className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative"
               >
                 <Bell className="w-6 h-6" />
                 {unreadNotificationsCount > 0 && (
                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center">
                     <span className="text-xs text-white font-medium">
                       {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                     </span>
                   </div>
                 )}
               </button>
               
               {/* Notifications Dropdown */}
               <AnimatePresence>
                 {showNotificationsDropdown && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: -10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                   >
                     <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                       {unreadNotificationsCount > 0 && (
                         <button
                           onClick={markAllNotificationsRead}
                           className="text-sm text-[#14B8A6] hover:text-[#14B8A6]/80 transition-colors"
                         >
                           Mark all read
                         </button>
                       )}
                     </div>
                     <div className="max-h-80 overflow-y-auto">
                       {notificationAlerts.map((notification) => (
                         <motion.div
                           key={notification.id}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.1 }}
                           onClick={() => handleNotificationClick(notification.id)}
                           className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                             !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-transparent'
                           }`}
                         >
                           <div className="flex items-start space-x-3">
                             <div className="flex-shrink-0 mt-1">
                               {getNotificationIcon(notification.type)}
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between">
                                 <p className="text-sm text-gray-900 dark:text-white">
                                   {notification.text}
                                 </p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                   {notification.time}
                                 </p>
                               </div>
                               <div className="flex items-center justify-between mt-2">
                                 {!notification.read ? (
                                   <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                                 ) : (
                                   <div className="flex items-center space-x-1">
                                     <Check size={12} className="text-green-500" />
                                     <span className="text-xs text-green-500">Read</span>
                                   </div>
                                 )}
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           </div>
         </div>
      </motion.div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${sidebarCollapsed ? 'w-18' : 'w-70'} bg-[#111827] rounded-r-xl transition-all duration-300 flex flex-col`}
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            minHeight: 'calc(100vh - 120px)'
          }}
        >
          {/* Toggle Button */}
          <div className="relative w-full">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute p-3 text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300 z-30 bg-[#111827] rounded-lg hover:bg-[#1E293B] border border-[#1E293B] shadow-lg ${
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

          {/* Doctor Profile */}
          <div className={`${sidebarCollapsed ? 'p-2 pt-16' : 'p-6 pt-16'}`}>
            <div className="text-center">
              <div className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-32 h-32'} mx-auto mb-4 flex-shrink-0`}>
                <img
                  src={doctorProfile.image}
                  alt={doctorProfile.name}
                  className="w-full h-full rounded-full object-cover transition-all duration-300"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                />
              </div>
              <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">{doctorProfile.name}</h3>
                  <p className="text-[#14B8A6] font-semibold text-sm mb-1">{doctorProfile.specialty}</p>
                  <p className="text-[#94A3B8] text-xs mb-1">{doctorProfile.role}</p>
                  <p className="text-[#94A3B8] text-xs">{doctorProfile.experience}</p>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Availability Toggle */}
            <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-6"
              >
                  <div className="flex h-10 w-full sm:w-96 border border-gray-700 rounded-full overflow-hidden bg-transparent gap-0">
                    <button
                      onClick={() => handleAvailabilityToggle('online')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'online'
                          ? 'bg-green-600 text-white shadow-[0_0_8px_#22c55e]'
                          : 'text-gray-400 hover:bg-gray-800'
                      } rounded-l-full`}
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                      }}
                    >
                      Online
                    </button>

                    <button
                      onClick={() => handleAvailabilityToggle('busy')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'busy'
                          ? 'bg-blue-600 text-white shadow-[0_0_8px_#2563eb]'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                      style={{
                        transform: 'skewX(-15deg)'
                      }}
                    >
                      <span style={{ transform: 'skewX(15deg)' }}>Busy</span>
                    </button>

                    <button
                      onClick={() => handleAvailabilityToggle('offline')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'offline'
                          ? 'bg-red-600 text-white shadow-[0_0_8px_#dc2626]'
                          : 'text-gray-400 hover:bg-gray-800'
                      } rounded-r-full`}
                      style={{
                        clipPath: 'polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%)'
                      }}
                    >
                      Offline
                    </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
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
                      handleLogoutClick()
                    } else if (item.isExternal) {
                      // Switch to live appointment view with demo data
                      setSelectedAppointmentForLive({
                        id: 'APT-DEMO-001',
                        patientName: 'Demo Patient',
                        patientAge: 30,
                        patientGender: 'Not specified',
                        patientId: 'PAT-DEMO-001',
                        consultationType: 'Video Consultation',
                        startTime: new Date(),
                        medicalHistory: 'Demo consultation for testing purposes.',
                        lastVisit: '2024-12-15'
                      })
                      setCurrentView('liveAppointment')
                      setActiveMenu('appointment-page') // Highlight appointment-page menu
                    } else {
                      setActiveMenu(item.id)
                      if (item.id === 'appointments') {
                        setCurrentView('appointments') // Reset to appointments list
                      }
                    }
                  }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-lg transition-all duration-300 group ${
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
                        className="font-medium ml-3"
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
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 'calc(100vh - 120px)' }}>

          {/* Dashboard Content */}
          {activeMenu === 'dashboard' && (
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Total Patients", value: "2000+", icon: Users, color: "#2563EB" },
                { title: "Today Patients", value: "068", icon: Building2, color: "#14B8A6" },
                { title: "Today Appointments", value: "085", icon: Calendar, color: "#22C55E" }
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-semibold text-sm mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{kpi.title}</p>
                      <p className="text-3xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                      <kpi.icon size={24} style={{ color: kpi.color }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Patients Summary */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2 bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-6">Patients Summary</h3>
                
                {/* Donut Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    {/* Single conic gradient for both segments */}
                    <div 
                      className="w-48 h-48 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, #2563EB 0deg, #2563EB ${57 * 3.6}deg, #14B8A6 ${57 * 3.6}deg, #14B8A6 360deg)`
                      }}
                    ></div>
                    {/* Center circle */}
                    <div className="absolute top-6 left-6 w-36 h-36 rounded-full bg-[#1E293B] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#F8FAFC]">57%</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#2563EB] rounded-full mr-2"></div>
                    <span className="text-[#94A3B8] text-sm">New Patients</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#14B8A6] rounded-full mr-2"></div>
                    <span className="text-[#94A3B8] text-sm">Old Patients</span>
                  </div>
                </div>

                {/* Patient Reviews */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[#F8FAFC]">Patient Reviews</h4>
                  {[
                    { label: "Excellent", percentage: 85, color: "#22C55E" },
                    { label: "Great", percentage: 70, color: "#14B8A6" },
                    { label: "Good", percentage: 60, color: "#2563EB" },
                    { label: "Average", percentage: 40, color: "#F59E0B" }
                  ].map((review) => (
                    <div key={review.label} className="flex items-center justify-between">
                      <span className="text-[#94A3B8] text-sm w-20">{review.label}</span>
                      <div className="flex-1 mx-4 bg-[#0F172A] rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${review.percentage}%`,
                            backgroundColor: review.color
                          }}
                        ></div>
                      </div>
                      <span className="text-[#F8FAFC] text-sm w-12 text-right">{review.percentage}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Today's Appointments */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Today's Appointments</h3>
                  <div className="space-y-3">
                    {appointments.slice(0, 4).map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-3 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors cursor-pointer"
                        onClick={() => handlePatientSelect(appointment)}
                      >
                        <img
                          src={appointment.avatar}
                          alt={appointment.patientName}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-[#F8FAFC] font-medium text-sm">{appointment.patientName}</p>
                          <p className="text-[#94A3B8] text-xs">{appointment.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#F8FAFC] text-xs font-medium">{appointment.time}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                          <span
                            className="px-2 py-1 rounded-full text-xs text-white"
                            style={{ backgroundColor: getStatusColor(appointment.status) }}
                          >
                            {getStatusText(appointment.status)}
                          </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full text-[#14B8A6] text-sm font-medium hover:text-[#14B8A6]/80 transition-colors">
                      See All
                    </button>
                  </div>
                </motion.div>

                {/* Next Patient Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Next Patient Details</h3>
                  <div className="flex items-center mb-4">
                    <img
                      src={appointments[0].avatar}
                      alt={appointments[0].patientName}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-[#F8FAFC] font-medium">{appointments[0].patientName}</p>
                      <p className="text-[#94A3B8] text-sm">ID: #{appointments[0].id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-[#94A3B8]">DOB:</span>
                      <p className="text-[#F8FAFC]">1989-01-15</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Sex:</span>
                      <p className="text-[#F8FAFC]">Male</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Weight:</span>
                      <p className="text-[#F8FAFC]">59 kg</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Height:</span>
                      <p className="text-[#F8FAFC]">5'8"</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Last Visit:</span>
                      <p className="text-[#F8FAFC]">2025-01-15</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Reg. Date:</span>
                      <p className="text-[#F8FAFC]">2024-03-10</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-[#14B8A6] text-white rounded-lg text-xs font-medium hover:bg-[#14B8A6]/80 transition-colors flex items-center justify-center gap-1">
                      <Phone size={14} />
                      Call
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-medium hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center gap-1">
                      <FileText size={14} />
                      Document
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#22C55E] text-white rounded-lg text-xs font-medium hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center gap-1">
                      <MessageCircle size={14} />
                      Chat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointment Requests */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Appointment Requests</h3>
                <div className="space-y-3">
                  {appointmentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-[#0F172A] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#14B8A6] rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {request.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#F8FAFC] font-medium text-sm">{request.patientName}</p>
                          <p className="text-[#94A3B8] text-xs">{request.reason}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-[#22C55E] text-white rounded text-xs hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center">
                          <Check size={12} />
                        </button>
                        <button className="px-3 py-1 bg-[#EF4444] text-white rounded text-xs hover:bg-[#EF4444]/80 transition-colors flex items-center justify-center">
                          <X size={12} />
                        </button>
                        <button className="px-3 py-1 bg-[#2563EB] text-white rounded text-xs hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center">
                          <MessageCircle size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Calendar</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F8FAFC] mb-2">January 2025</div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="p-2 text-[#94A3B8] font-medium">{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`p-2 text-[#F8FAFC] cursor-pointer hover:bg-[#14B8A6]/20 rounded ${
                          i + 1 === 19 ? 'bg-[#14B8A6] text-white' : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-2"></div>
                      <span className="text-[#94A3B8] text-xs">Online</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-2"></div>
                      <span className="text-[#94A3B8] text-xs">In-clinic</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          )}

          {/* Appointments Page */}
          {activeMenu === 'appointments' && currentView === 'appointments' && (
            <div className="p-6 space-y-6">
              {/* Page Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <h1 className="text-3xl font-bold text-[#F8FAFC]">Appointments</h1>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name, date, or purpose..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#1E293B] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 w-full sm:w-80"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-[#1E293B] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
                  >
                    <option value="All">All Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </motion.div>

              {/* Appointments Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50 cursor-pointer hover:bg-[#1E293B]/80 transition-all duration-300"
                    style={{
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                    }}
                    onClick={() => handleAppointmentSelect(appointment)}
                  >
                    {/* Patient Info */}
                    <div className="flex items-center mb-4">
                      <img
                        src={appointment.avatar}
                        alt={appointment.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-[#F8FAFC]">{appointment.name}</h3>
                        <p className="text-[#94A3B8] text-sm">Age: {appointment.age}</p>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Date & Time</span>
                        <span className="text-[#F8FAFC] text-sm font-medium">{appointment.date} at {appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Purpose</span>
                        <span className="text-[#F8FAFC] text-sm">{appointment.purpose}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Mode</span>
                        <div className="flex items-center gap-2">
                          {getModeIcon(appointment.mode)}
                          <span className="text-[#F8FAFC] text-sm">{appointment.mode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getAppointmentStatusColor(appointment.status) }}
                      >
                        {appointment.status}
                      </span>
                      
                      <div className="flex gap-2">
                        {appointment.status === 'Upcoming' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleJoinLive({
                                id: `APT-${appointment.id}`,
                                patientName: appointment.name,
                                patientAge: appointment.age,
                                patientGender: 'Not specified',
                                patientId: `PAT-${appointment.id}`,
                                consultationType: appointment.mode === 'Online' ? 'Video Consultation' : 'In-Person Consultation',
                                startTime: new Date(),
                                medicalHistory: 'Previous consultation records available.',
                                lastVisit: '2024-12-15'
                              })
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-xs font-medium"
                            title="Join Live Appointment"
                          >
                            Join Live
                          </motion.button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle call action
                          }}
                          className="p-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#14B8A6]/80 transition-colors"
                          title="Call Patient"
                        >
                          <Phone size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle chat action
                          }}
                          className="p-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#2563EB]/80 transition-colors"
                          title="Chat with Patient"
                        >
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results */}
              {filteredAppointments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-[#94A3B8] text-lg">No appointments found</div>
                  <div className="text-[#94A3B8] text-sm mt-2">Try adjusting your search or filter criteria</div>
                </motion.div>
              )}
            </div>
          )}

          {/* Live Appointment View */}
          {activeMenu === 'appointment-page' && currentView === 'liveAppointment' && selectedAppointmentForLive && (
            <LiveAppointmentEmbedded 
              appointmentData={selectedAppointmentForLive}
              onEndSession={handleEndSession}
            />
          )}

          {/* Settings View */}
          {activeMenu === 'settings' && (
            <FeatureUnderUpdate
              featureName="Settings"
              description="The Settings page is currently under development. Soon you'll be able to customize your dashboard preferences, notification settings, account security, and much more."
              onBack={() => setActiveMenu('dashboard')}
            />
          )}

          {/* Profile View */}
          {activeMenu === 'profile' && (
            <DoctorProfile />
          )}

          {/* Payments View */}
          {activeMenu === 'payments' && (
            <FeatureUnderUpdate
              featureName="Payments"
              description="The Payments page is currently under development. Soon you'll be able to view payment history, manage billing information, track earnings, and handle financial transactions."
              onBack={() => setActiveMenu('dashboard')}
            />
          )}
        </div>
      </div>

      {/* Patient Details Drawer */}
      <AnimatePresence>
        {showPatientDetails && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
            onClick={() => setShowPatientDetails(false)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 h-full bg-[#1E293B] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F8FAFC]">Patient Details</h3>
                <button
                  onClick={() => setShowPatientDetails(false)}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center mb-6">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.patientName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-lg font-bold text-[#F8FAFC]">{selectedPatient.patientName}</h4>
                <p className="text-[#94A3B8] text-sm">{selectedPatient.reason}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Contact Information</h5>
                  <p className="text-[#94A3B8] text-sm">Phone: +92 300 1234567</p>
                  <p className="text-[#94A3B8] text-sm">Email: patient@example.com</p>
                </div>
                
                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Medical History</h5>
                  <p className="text-[#94A3B8] text-sm">No significant medical history</p>
                </div>

                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Last Prescription</h5>
                  <p className="text-[#94A3B8] text-sm">Medication: Aspirin 100mg</p>
                  <p className="text-[#94A3B8] text-sm">Dosage: Once daily</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {showAppointmentModal && selectedAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAppointmentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#1E293B]/50"
              style={{
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#F8FAFC]">Appointment Details</h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Patient Info */}
              <div className="text-center mb-6">
                <img
                  src={selectedAppointment.avatar}
                  alt={selectedAppointment.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-xl font-bold text-[#F8FAFC]">{selectedAppointment.name}</h4>
                <p className="text-[#94A3B8]">Age: {selectedAppointment.age}</p>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[#F8FAFC] font-medium mb-2">Appointment Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Date:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Time:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Mode:</span>
                        <div className="flex items-center gap-2">
                          {getModeIcon(selectedAppointment.mode)}
                          <span className="text-[#F8FAFC]">{selectedAppointment.mode}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Status:</span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getAppointmentStatusColor(selectedAppointment.status) }}
                        >
                          {selectedAppointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-[#F8FAFC] font-medium mb-2">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Phone:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Email:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div className="mb-6">
                <h5 className="text-[#F8FAFC] font-medium mb-2">Purpose / Problem Summary</h5>
                <p className="text-[#94A3B8] bg-[#0F172A] p-3 rounded-lg">{selectedAppointment.purpose}</p>
              </div>

              {/* Status Change */}
              <div className="mb-6">
                <h5 className="text-[#F8FAFC] font-medium mb-2">Change Status</h5>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value)}
                  className="w-full px-4 py-2 bg-[#0F172A] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#14B8A6]/80 transition-colors flex items-center justify-center gap-2">
                  <Phone size={16} />
                  Call Patient
                </button>
                <button className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={16} />
                  Send Message
                </button>
                <button className="flex-1 px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center gap-2">
                  <FileText size={16} />
                  Add Prescription
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && activeChat && (
          <ChatModal
            patient={activeChat}
            onClose={closeChatModal}
          />
        )}
      </AnimatePresence>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleLogoutCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-md border border-[#1E293B]/50"
              style={{
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogOut size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">Logout Confirmation</h3>
                  <p className="text-[#94A3B8] text-lg">
                    Are you sure you want to log out?
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogoutCancel}
                    className="flex-1 px-6 py-3 bg-[#374151] text-[#F8FAFC] rounded-xl hover:bg-[#4B5563] transition-all duration-300 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogoutConfirm}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg"
                  >
                    Yes, Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Success Toast */}
      <AnimatePresence>
        {showLogoutToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-[#1E293B] border border-green-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-sm"
                 style={{
                   boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 20px rgba(0, 0, 0, 0.5)'
                 }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="text-[#F8FAFC] font-medium">Success!</p>
                  <p className="text-[#94A3B8] text-sm">You've been logged out successfully.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default DoctorDashboard