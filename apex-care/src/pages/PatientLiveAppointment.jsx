/**
 * Apex Care - Patient Live Appointment Component
 * 
 * This component provides the patient-side interface for live video consultations.
 * It includes video controls, chat functionality, file uploads, test results
 * submission, and real-time communication with doctors.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Patient live consultation interface with video, chat, and file sharing
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Send, 
  MessageCircle,
  User,
  Clock,
  Calendar,
  MapPin,
  FileText,
  Download,
  Settings,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Upload,
  File,
  Image,
  FileImage,
  TestTube,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const PatientLiveAppointment = () => {
  // State management
  const [sessionTime, setSessionTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [isDoctorTyping, setIsDoctorTyping] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isVolumeMuted, setIsVolumeMuted] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showTestResults, setShowTestResults] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [testResults, setTestResults] = useState([])
  const [newTestResult, setNewTestResult] = useState({
    testName: '',
    result: '',
    date: '',
    file: null
  })
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      message: 'Hello! How are you feeling today?',
      time: '10:31 AM',
      read: true
    },
    {
      id: 2,
      sender: 'patient',
      message: 'Hello Doctor, thank you for taking my appointment.',
      time: '10:30 AM',
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
  
  // Mock appointment data
  const appointmentData = {
    id: "APT-001",
    doctorName: "Dr. Ayesha Malik",
    doctorSpecialty: "Cardiologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "2024-12-25",
    time: "2:30 PM",
    type: "Video Consultation",
    status: "Live",
    duration: "30 minutes"
  }

  const chatEndRef = useRef(null)

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
        sender: 'patient',
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

  const handleEndCall = () => {
    // In a real app, this would end the video call
    console.log('Call ended by patient')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
  }

  const toggleVolume = () => {
    setIsVolumeMuted(!isVolumeMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // File upload functions
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploading'
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload progress
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(file => 
          newFiles.some(newFile => newFile.id === file.id) 
            ? { ...file, status: 'uploaded' }
            : file
        )
      )
    }, 2000)
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  // Test results functions
  const handleTestResultSubmit = () => {
    if (newTestResult.testName && newTestResult.result) {
      const testResult = {
        id: Date.now(),
        testName: newTestResult.testName,
        result: newTestResult.result,
        date: newTestResult.date || new Date().toISOString().split('T')[0],
        file: newTestResult.file,
        submittedAt: new Date().toISOString()
      }
      
      setTestResults(prev => [...prev, testResult])
      setNewTestResult({ testName: '', result: '', date: '', file: null })
      setShowTestResults(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-6 space-y-6">

      {/* Main Video Call Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`bg-[#1E293B] rounded-xl border border-[#374151] relative overflow-hidden ${
              isFullscreen ? 'fixed inset-4 z-50' : ''
            }`}
            style={{ 
              aspectRatio: '16/9'
            }}
          >
            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center relative">
              {isVideoOn ? (
                <div className="text-center">
                  <div className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-16 h-16 text-blue-400" />
                  </div>
                  <p className="text-[#94A3B8] text-lg">Video Call Active</p>
                  <p className="text-[#94A3B8] text-sm">Connected to {appointmentData.doctorName}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <VideoOff className="w-16 h-16 text-red-400" />
                  </div>
                  <p className="text-[#94A3B8] text-lg">Video Disabled</p>
                </div>
              )}
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    !isVideoOn ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVolume}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isVolumeMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isVolumeMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEndCall}
                  className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                >
                  <PhoneOff className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Connection Status */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-white text-sm">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B] rounded-xl border border-[#374151] h-full flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-[#374151]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={appointmentData.doctorImage}
                    alt={appointmentData.doctorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-[#94A3B8]" />
                      <h3 className="text-lg font-semibold text-[#F8FAFC]">Chat with {appointmentData.doctorName}</h3>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-[#94A3B8] text-sm">{appointmentData.doctorSpecialty}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs">Live</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[#94A3B8] text-xs">{formatTime(sessionTime)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowChat(!showChat)}
                  className="p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-[#94A3B8]" />
                </motion.button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'patient'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                          : 'bg-[#374151] text-[#F8FAFC]'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'patient' ? 'text-blue-100' : 'text-[#94A3B8]'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-[#374151]">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* File Upload and Test Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-[#94A3B8]" />
              <h3 className="text-lg font-semibold text-[#F8FAFC]">File Upload</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Upload Files
            </motion.button>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-[#374151] rounded-lg p-6 text-center mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <FileImage className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-[#F8FAFC] font-medium">Click to upload files</p>
                <p className="text-[#94A3B8] text-sm">PDF, DOC, Images, or Text files</p>
              </div>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2">Uploaded Files</h4>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-[#374151] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-4 h-4 text-[#94A3B8]" />
                    <div>
                      <p className="text-[#F8FAFC] text-sm font-medium">{file.name}</p>
                      <p className="text-[#94A3B8] text-xs">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploading' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-400 text-xs">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-xs">Uploaded</span>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Test Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TestTube className="w-5 h-5 text-[#94A3B8]" />
              <h3 className="text-lg font-semibold text-[#F8FAFC]">Test Results</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTestResults(!showTestResults)}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg text-sm font-medium transition-all duration-300"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Results
            </motion.button>
          </div>

          {/* Test Results List */}
          {testResults.length > 0 ? (
            <div className="space-y-3">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className="p-4 bg-[#374151] rounded-lg border border-[#4B5563]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#F8FAFC] font-medium">{result.testName}</h4>
                      <p className="text-[#94A3B8] text-sm">Date: {new Date(result.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-xs">Submitted</span>
                    </div>
                  </div>
                  <p className="text-[#F8FAFC] text-sm mb-2">Result: {result.result}</p>
                  {result.file && (
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#94A3B8] text-sm">Attachment: {result.file.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="w-8 h-8 text-teal-400" />
              </div>
              <p className="text-[#94A3B8] text-sm">No test results submitted yet</p>
              <p className="text-[#94A3B8] text-xs">Click "Add Results" to submit your test results</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Test Results Modal */}
      <AnimatePresence>
        {showTestResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowTestResults(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#F8FAFC]">Submit Test Results</h3>
                <button
                  onClick={() => setShowTestResults(false)}
                  className="p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-[#94A3B8]" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Test Name
                  </label>
                  <input
                    type="text"
                    value={newTestResult.testName}
                    onChange={(e) => setNewTestResult(prev => ({ ...prev, testName: e.target.value }))}
                    placeholder="e.g., Blood Test, X-Ray, MRI"
                    className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Test Result
                  </label>
                  <textarea
                    value={newTestResult.result}
                    onChange={(e) => setNewTestResult(prev => ({ ...prev, result: e.target.value }))}
                    placeholder="Enter the test results..."
                    rows={3}
                    className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Test Date
                  </label>
                  <input
                    type="date"
                    value={newTestResult.date}
                    onChange={(e) => setNewTestResult(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Attach Report (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewTestResult(prev => ({ ...prev, file: e.target.files[0] }))}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTestResults(false)}
                  className="flex-1 px-4 py-2 bg-[#374151] text-[#F8FAFC] rounded-lg font-medium hover:bg-[#4B5563] transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTestResultSubmit}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Submit Results
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatientLiveAppointment
