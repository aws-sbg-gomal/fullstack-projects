/**
 * Apex Care - Patient Profile Page Component
 * 
 * This component provides comprehensive patient profile management including
 * personal information, medical history, emergency contacts, preferences,
 * and privacy settings. It includes form validation and data persistence.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Complete patient profile management with all user settings
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  Bell, 
  Camera, 
  Save, 
  Edit3, 
  Eye, 
  EyeOff,
  Plus,
  Trash2,
  Upload,
  Check,
  X,
  AlertCircle,
  UserPlus,
  FileText,
  Settings
} from 'lucide-react'

/**
 * PatientProfile Component
 * 
 * Comprehensive profile management system with:
 * - Personal information editing
 * - Medical history management
 * - Emergency contacts
 * - Notification preferences
 * - Privacy settings
 * - Profile picture upload
 * 
 * BACKEND INTEGRATION NOTES:
 * - All data is currently stored in localStorage for demo purposes
 * - Replace localStorage calls with actual API endpoints
 * - Implement proper error handling and loading states
 * - Add authentication headers to API requests
 * - Consider implementing optimistic updates for better UX
 * 
 * API ENDPOINTS NEEDED:
 * - GET /api/patient/profile - Fetch patient profile data
 * - PUT /api/patient/profile - Update patient profile
 * - POST /api/patient/profile/image - Upload profile image
 * - GET /api/patient/medical-history - Fetch medical history
 * - PUT /api/patient/medical-history - Update medical history
 * - GET /api/patient/emergency-contacts - Fetch emergency contacts
 * - PUT /api/patient/emergency-contacts - Update emergency contacts
 * - GET /api/patient/notifications - Fetch notification preferences
 * - PUT /api/patient/notifications - Update notification preferences
 * - GET /api/patient/privacy - Fetch privacy settings
 * - PUT /api/patient/privacy - Update privacy settings
 * 
 * @returns {JSX.Element} Patient profile management page
 */
const PatientProfile = () => {
  // ============================================================================
  // STATE MANAGEMENT - BACKEND INTEGRATION READY
  // ============================================================================
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('personal') // 'personal', 'medical', 'contacts', 'preferences', 'privacy'
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Profile Image State - TODO: Replace with API call
  const [profileImage, setProfileImage] = useState(() => {
    // BACKEND TODO: Replace localStorage with API call
    // const response = await fetch('/api/patient/profile/image', { headers: { Authorization: token } })
    // return response.data.imageUrl || defaultImage
    
    // Current localStorage implementation (demo only)
    const savedPatientData = localStorage.getItem('patientData')
    if (savedPatientData) {
      const data = JSON.parse(savedPatientData)
      return data.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzt3XBMupEnVPQ66F4TI5ejPbN6RYBl9xeIg&s"
    }
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzt3XBMupEnVPQ66F4TI5ejPbN6RYBl9xeIg&s"
  })
  const [uploadProgress, setUploadProgress] = useState(0)

  // ============================================================================
  // DATA STRUCTURES - BACKEND API SCHEMA
  // ============================================================================
  
  /**
   * Personal Information State
   * BACKEND API: GET/PUT /api/patient/profile
   * Expected API Response Schema:
   * {
   *   "id": "patient_id",
   *   "firstName": "string",
   *   "lastName": "string", 
   *   "email": "string (validated)",
   *   "phone": "string (formatted)",
   *   "dateOfBirth": "ISO date string",
   *   "gender": "male|female|other|prefer-not-to-say",
   *   "address": "string",
   *   "emergencyContact": "string",
   *   "bloodType": "A+|A-|B+|B-|AB+|AB-|O+|O-",
   *   "allergies": "string (comma-separated)",
   *   "currentMedications": "string (comma-separated)",
   *   "createdAt": "ISO timestamp",
   *   "updatedAt": "ISO timestamp"
   * }
   */
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Sarah',
    lastName: 'Ahmad',
    email: 'sarah.ahmed@email.com',
    phone: '+92 300 1234567',
    dateOfBirth: '1990-05-15',
    gender: 'female',
    address: '123 Main Street, City, State 12345',
    emergencyContact: '+92 300 9876543',
    bloodType: 'O+',
    allergies: 'Penicillin, Shellfish',
    currentMedications: 'Metformin, Lisinopril'
  })

  /**
   * Medical History State
   * BACKEND API: GET/PUT /api/patient/medical-history
   * Expected API Response Schema:
   * {
   *   "conditions": [
   *     {
   *       "id": "string",
   *       "condition": "string",
   *       "diagnosed": "ISO date string",
   *       "status": "Active|Controlled|Resolved",
   *       "severity": "Mild|Moderate|Severe",
   *       "notes": "string"
   *     }
   *   ],
   *   "surgeries": [
   *     {
   *       "id": "string",
   *       "surgery": "string",
   *       "date": "ISO date string",
   *       "hospital": "string",
   *       "surgeon": "string",
   *       "notes": "string"
   *     }
   *   ],
   *   "immunizations": [
   *     {
   *       "id": "string",
   *       "vaccine": "string",
   *       "date": "ISO date string",
   *       "nextDue": "ISO date string",
   *       "batchNumber": "string",
   *       "provider": "string"
   *     }
   *   ]
   * }
   */
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: [
      { id: 1, condition: 'Type 2 Diabetes', diagnosed: '2020-03-15', status: 'Active' },
      { id: 2, condition: 'Hypertension', diagnosed: '2019-08-22', status: 'Controlled' }
    ],
    surgeries: [
      { id: 1, surgery: 'Appendectomy', date: '2015-06-10', hospital: 'City General Hospital' }
    ],
    immunizations: [
      { id: 1, vaccine: 'COVID-19', date: '2021-03-15', nextDue: '2022-03-15' },
      { id: 2, vaccine: 'Flu Shot', date: '2023-10-01', nextDue: '2024-10-01' }
    ]
  })

  /**
   * Emergency Contacts State
   * BACKEND API: GET/PUT /api/patient/emergency-contacts
   * Expected API Response Schema:
   * [
   *   {
   *     "id": "string",
   *     "name": "string",
   *     "relationship": "string",
   *     "phone": "string (formatted)",
   *     "email": "string (validated)",
   *     "isPrimary": "boolean",
   *     "address": "string (optional)",
   *     "createdAt": "ISO timestamp",
   *     "updatedAt": "ISO timestamp"
   *   }
   * ]
   */
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'Ahmad Hassan',
      relationship: 'Spouse',
      phone: '+92 300 9876543',
      email: 'ahmad.hassan@email.com',
      isPrimary: true
    },
    {
      id: 2,
      name: 'Fatima Ahmad',
      relationship: 'Sister',
      phone: '+92 300 4567890',
      email: 'fatima.ahmad@email.com',
      isPrimary: false
    }
  ])

  /**
   * Notification Preferences State
   * BACKEND API: GET/PUT /api/patient/notifications
   * Expected API Response Schema:
   * {
   *   "email": {
   *     "appointmentReminders": "boolean",
   *     "prescriptionRefills": "boolean",
   *     "testResults": "boolean",
   *     "healthTips": "boolean",
   *     "promotional": "boolean",
   *     "billing": "boolean"
   *   },
   *   "sms": {
   *     "appointmentReminders": "boolean",
   *     "prescriptionRefills": "boolean",
   *     "testResults": "boolean",
   *     "emergencyAlerts": "boolean"
   *   },
   *   "push": {
   *     "appointmentReminders": "boolean",
   *     "prescriptionRefills": "boolean",
   *     "testResults": "boolean",
   *     "healthTips": "boolean"
   *   }
   * }
   */
  const [notifications, setNotifications] = useState({
    email: {
      appointmentReminders: true,
      prescriptionRefills: true,
      testResults: true,
      healthTips: false,
      promotional: false
    },
    sms: {
      appointmentReminders: true,
      prescriptionRefills: false,
      testResults: true,
      emergencyAlerts: true
    },
    push: {
      appointmentReminders: true,
      prescriptionRefills: true,
      testResults: true,
      healthTips: true
    }
  })

  /**
   * Privacy Settings State
   * BACKEND API: GET/PUT /api/patient/privacy
   * Expected API Response Schema:
   * {
   *   "profileVisibility": "public|private|doctors-only",
   *   "dataSharing": {
   *     "withDoctors": "boolean",
   *     "withFamily": "boolean",
   *     "withResearchers": "boolean",
   *     "withInsurance": "boolean",
   *     "withThirdParties": "boolean"
   *   },
   *   "twoFactorAuth": "boolean",
   *   "sessionTimeout": "number (minutes)",
   *   "dataRetention": "number (years)",
   *   "auditLogging": "boolean"
   * }
   */
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private', // 'public', 'private', 'doctors-only'
    dataSharing: {
      withDoctors: true,
      withFamily: false,
      withResearchers: false,
      withInsurance: true
    },
    twoFactorAuth: false,
    sessionTimeout: 30 // minutes
  })

  // ============================================================================
  // FORM VALIDATION & ERROR HANDLING
  // ============================================================================
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  // ============================================================================
  // EVENT HANDLERS - BACKEND INTEGRATION READY
  // ============================================================================
  
  /**
   * Handle personal information changes
   * BACKEND TODO: Implement real-time validation with API
   * - Add debounced validation calls to backend
   * - Implement optimistic updates for better UX
   * - Add field-specific validation (email format, phone format, etc.)
   * 
   * @param {Event} e - Input change event
   */
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // BACKEND TODO: Add real-time validation
    // debounceValidation(name, value)
  }

  /**
   * Handle profile image upload
   * BACKEND TODO: Replace with actual file upload API
   * - Implement proper file validation (size, type, dimensions)
   * - Add image compression/resizing before upload
   * - Implement proper error handling for upload failures
   * - Add progress tracking for large files
   * - Store image in cloud storage (AWS S3, Cloudinary, etc.)
   * 
   * API ENDPOINT: POST /api/patient/profile/image
   * Expected Request: FormData with image file
   * Expected Response: { "imageUrl": "string", "thumbnailUrl": "string" }
   * 
   * @param {Event} e - File input change event
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // BACKEND TODO: Add file validation
      // if (!validateImageFile(file)) return
      
      // Simulate upload progress (replace with real upload)
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            const newImageUrl = URL.createObjectURL(file)
            setProfileImage(newImageUrl)
            
            // BACKEND TODO: Replace with API call
            // const formData = new FormData()
            // formData.append('image', file)
            // const response = await fetch('/api/patient/profile/image', {
            //   method: 'POST',
            //   headers: { Authorization: `Bearer ${token}` },
            //   body: formData
            // })
            // const { imageUrl } = await response.json()
            
            // Current localStorage implementation (demo only)
            const updatedPatientData = {
              name: "Sarah Ahmad",
              avatar: newImageUrl,
              email: "sarah.ahmed@email.com",
              phone: "+92 300 1234567"
            }
            localStorage.setItem('patientData', JSON.stringify(updatedPatientData))
            
            // Dispatch custom event to notify PatientPage of the update
            window.dispatchEvent(new CustomEvent('patientDataUpdated'))
            
            return 100
          }
          return prev + 10
        })
      }, 100)
    }
  }

  /**
   * Add new emergency contact
   */
  const addEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      relationship: '',
      phone: '',
      email: '',
      isPrimary: emergencyContacts.length === 0
    }
    setEmergencyContacts(prev => [...prev, newContact])
  }

  /**
   * Remove emergency contact
   * @param {number} id - Contact ID to remove
   */
  const removeEmergencyContact = (id) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id))
  }

  /**
   * Update emergency contact
   * @param {number} id - Contact ID
   * @param {string} field - Field to update
   * @param {string} value - New value
   */
  const updateEmergencyContact = (id, field, value) => {
    setEmergencyContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ))
  }

  /**
   * Set primary emergency contact
   * @param {number} id - Contact ID to set as primary
   */
  const setPrimaryContact = (id) => {
    setEmergencyContacts(prev => prev.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })))
  }

  /**
   * Handle notification preference changes
   * @param {string} type - Notification type (email, sms, push)
   * @param {string} setting - Setting name
   * @param {boolean} value - New value
   */
  const handleNotificationChange = (type, setting, value) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: value
      }
    }))
  }

  /**
   * Handle privacy setting changes
   * @param {string} setting - Setting name
   * @param {any} value - New value
   */
  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  /**
   * Validate form data
   * BACKEND TODO: Implement server-side validation
   * - Add comprehensive validation rules
   * - Implement async validation for unique fields (email, phone)
   * - Add validation for medical data (blood type, allergies format)
   * - Implement proper error message localization
   * 
   * @returns {boolean} True if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {}

    // Basic required field validation
    if (!personalInfo.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!personalInfo.email.trim()) newErrors.email = 'Email is required'
    if (!personalInfo.phone.trim()) newErrors.phone = 'Phone number is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (personalInfo.email && !emailRegex.test(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // BACKEND TODO: Add more comprehensive validation
    // - Phone number format validation
    // - Date of birth validation (not in future, reasonable age)
    // - Blood type validation against allowed values
    // - Address format validation
    // - Medical history data validation

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Save profile changes
   * BACKEND TODO: Implement actual API calls for saving data
   * - Replace localStorage with proper API endpoints
   * - Implement proper error handling and retry logic
   * - Add loading states and progress indicators
   * - Implement optimistic updates for better UX
   * - Add audit logging for data changes
   * - Implement proper success/error notifications
   */
  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)

    try {
      // BACKEND TODO: Replace with actual API calls
      // const requests = [
      //   fetch('/api/patient/profile', {
      //     method: 'PUT',
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}` 
      //     },
      //     body: JSON.stringify(personalInfo)
      //   }),
      //   fetch('/api/patient/medical-history', {
      //     method: 'PUT',
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}` 
      //     },
      //     body: JSON.stringify(medicalHistory)
      //   }),
      //   fetch('/api/patient/emergency-contacts', {
      //     method: 'PUT',
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}` 
      //     },
      //     body: JSON.stringify(emergencyContacts)
      //   }),
      //   fetch('/api/patient/notifications', {
      //     method: 'PUT',
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}` 
      //     },
      //     body: JSON.stringify(notifications)
      //   }),
      //   fetch('/api/patient/privacy', {
      //     method: 'PUT',
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}` 
      //     },
      //     body: JSON.stringify(privacySettings)
      //   })
      // ]
      // 
      // const responses = await Promise.all(requests)
      // const hasErrors = responses.some(response => !response.ok)
      // 
      // if (hasErrors) {
      //   throw new Error('Some updates failed')
      // }

      // Simulate API call (current demo implementation)
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSaving(false)
      setIsEditing(false)

      // BACKEND TODO: Replace with proper notification system
      // toast.success('Profile updated successfully!')
      alert('Profile updated successfully!')
      
    } catch (error) {
      setIsSaving(false)
      // BACKEND TODO: Implement proper error handling
      // toast.error('Failed to update profile. Please try again.')
      alert('Failed to update profile. Please try again.')
      console.error('Save error:', error)
    }
  }

  /**
   * Cancel editing and reset changes
   */
  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
    // Reset to original values (in a real app, you'd reload from API)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Profile Management</h1>
            <p className="text-[#94A3B8]">Manage your personal information, medical history, and preferences</p>
          </div>
          <div className="flex items-center space-x-4">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[#374151] text-[#F8FAFC] rounded-full hover:bg-[#4B5563] transition-colors duration-300 flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>


      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex h-12 w-full max-w-6xl border border-[#374151] rounded-full overflow-hidden bg-transparent gap-0">
          {[
            { id: 'personal', label: 'Personal', icon: User },
            { id: 'medical', label: 'Medical', icon: Heart },
            { id: 'contacts', label: 'Contacts', icon: UserPlus },
            { id: 'preferences', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Shield }
          ].map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white shadow-[0_0_8px_rgba(37,99,235,0.5)]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#374151]'
              } ${
                index === 0 ? 'rounded-l-full' : 
                index === 4 ? 'rounded-r-full' : ''
              }`}
              style={{
                ...(index === 0 && {
                  clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                }),
                ...(index === 1 && {
                  transform: 'skewX(-15deg)'
                }),
                ...(index === 2 && {
                  transform: 'skewX(-15deg)'
                }),
                ...(index === 3 && {
                  transform: 'skewX(-15deg)'
                }),
                ...(index === 4 && {
                  clipPath: 'polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%)'
                })
              }}
            >
              <span style={{ 
                transform: index >= 1 && index <= 3 ? 'skewX(15deg)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Personal Information</h3>
              
              {/* Profile Image and Basic Info */}
              <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-[#374151]">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white text-2xl font-bold">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      personalInfo.firstName.charAt(0) + personalInfo.lastName.charAt(0)
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0F766E] transition-colors duration-300">
                      <Camera size={16} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#F8FAFC]">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </h2>
                  <p className="text-[#94A3B8]">{personalInfo.email}</p>
                          <p className="text-[#94A3B8] text-sm">Patient since 2021</p>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-32">
                    <div className="bg-[#374151] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-[#94A3B8] text-xs mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      errors.firstName ? 'border-red-500' : 'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      errors.lastName ? 'border-red-500' : 'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Gender</label>
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Address</label>
                  <textarea
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    rows="3"
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 resize-none ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Blood Type</label>
                  <select
                    name="bloodType"
                    value={personalInfo.bloodType}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Allergies</label>
                  <input
                    type="text"
                    name="allergies"
                    value={personalInfo.allergies}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    placeholder="List any known allergies"
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-full text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Current Medications</label>
                  <textarea
                    name="currentMedications"
                    value={personalInfo.currentMedications}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    rows="2"
                    placeholder="List current medications and dosages"
                    className={`w-full px-4 py-3 bg-[#0F172A] border rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 resize-none ${
                      'border-[#374151]'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              {/* Medical Conditions */}
              <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#F8FAFC]">Medical Conditions</h3>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-[#14B8A6] text-white rounded-full hover:bg-[#0F766E] transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Condition</span>
                    </motion.button>
                  )}
                </div>
                <div className="space-y-3">
                  {medicalHistory.conditions.map(condition => (
                    <div key={condition.id} className="bg-[#0F172A] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[#F8FAFC] font-medium">{condition.condition}</h4>
                          <p className="text-[#94A3B8] text-sm">Diagnosed: {condition.diagnosed}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            condition.status === 'Active' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {condition.status}
                          </span>
                        </div>
                        {isEditing && (
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-300">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surgeries */}
              <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#F8FAFC]">Surgical History</h3>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-[#14B8A6] text-white rounded-full hover:bg-[#0F766E] transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Surgery</span>
                    </motion.button>
                  )}
                </div>
                <div className="space-y-3">
                  {medicalHistory.surgeries.map(surgery => (
                    <div key={surgery.id} className="bg-[#0F172A] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[#F8FAFC] font-medium">{surgery.surgery}</h4>
                          <p className="text-[#94A3B8] text-sm">Date: {surgery.date}</p>
                          <p className="text-[#94A3B8] text-sm">Hospital: {surgery.hospital}</p>
                        </div>
                        {isEditing && (
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-300">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immunizations */}
              <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#F8FAFC]">Immunizations</h3>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-[#14B8A6] text-white rounded-full hover:bg-[#0F766E] transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Immunization</span>
                    </motion.button>
                  )}
                </div>
                <div className="space-y-3">
                  {medicalHistory.immunizations.map(immunization => (
                    <div key={immunization.id} className="bg-[#0F172A] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[#F8FAFC] font-medium">{immunization.vaccine}</h4>
                          <p className="text-[#94A3B8] text-sm">Date: {immunization.date}</p>
                          <p className="text-[#94A3B8] text-sm">Next Due: {immunization.nextDue}</p>
                        </div>
                        {isEditing && (
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-300">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#F8FAFC]">Emergency Contacts</h3>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addEmergencyContact}
                    className="px-4 py-2 bg-[#14B8A6] text-white rounded-full hover:bg-[#0F766E] transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add Contact</span>
                  </motion.button>
                )}
              </div>
              <div className="space-y-4">
                {emergencyContacts.map(contact => (
                  <div key={contact.id} className="bg-[#0F172A] rounded-lg p-4 border border-[#374151]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white font-semibold">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-[#F8FAFC] font-medium">{contact.name || 'New Contact'}</h4>
                          <p className="text-[#94A3B8] text-sm">{contact.relationship || 'Relationship'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contact.isPrimary && (
                          <span className="px-2 py-1 bg-[#14B8A6] text-white text-xs rounded-full">Primary</span>
                        )}
                        {isEditing && (
                          <button
                            onClick={() => removeEmergencyContact(contact.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Name</label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 bg-[#1E293B] border rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                            'border-[#374151]'
                          } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Relationship</label>
                        <input
                          type="text"
                          value={contact.relationship}
                          onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 bg-[#1E293B] border rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                            'border-[#374151]'
                          } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Phone</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 bg-[#1E293B] border rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                            'border-[#374151]'
                          } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-1">Email</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => updateEmergencyContact(contact.id, 'email', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 bg-[#1E293B] border rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                            'border-[#374151]'
                          } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>
                    {isEditing && !contact.isPrimary && (
                      <div className="mt-3">
                        <button
                          onClick={() => setPrimaryContact(contact.id)}
                          className="px-3 py-1 bg-[#2563EB] text-white text-sm rounded-full hover:bg-[#1D4ED8] transition-colors duration-300"
                        >
                          Set as Primary
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notification Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4 flex items-center space-x-2">
                    <Mail size={20} />
                    <span>Email Notifications</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[#94A3B8] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                            disabled={!isEditing}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4 flex items-center space-x-2">
                    <Phone size={20} />
                    <span>SMS Notifications</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notifications.sms).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[#94A3B8] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('sms', key, e.target.checked)}
                            disabled={!isEditing}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4 flex items-center space-x-2">
                    <Bell size={20} />
                    <span>Push Notifications</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notifications.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[#94A3B8] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('push', key, e.target.checked)}
                            disabled={!isEditing}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Security Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]">
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Privacy & Security Settings</h3>
              <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4">Profile Visibility</h4>
                  <div className="space-y-3">
                    {[
                      { value: 'private', label: 'Private - Only you can see your profile' },
                      { value: 'doctors-only', label: 'Doctors Only - Visible to healthcare providers' },
                      { value: 'public', label: 'Public - Visible to all users' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option.value}
                          checked={privacySettings.profileVisibility === option.value}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] focus:ring-[#14B8A6] focus:ring-2"
                        />
                        <span className="text-[#94A3B8]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Data Sharing */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4">Data Sharing Preferences</h4>
                  <div className="space-y-3">
                    {Object.entries(privacySettings.dataSharing).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[#94A3B8] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handlePrivacyChange('dataSharing', {
                              ...privacySettings.dataSharing,
                              [key]: e.target.checked
                            })}
                            disabled={!isEditing}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#94A3B8]">Add an extra layer of security to your account</p>
                      <p className="text-[#94A3B8] text-sm">Recommended for enhanced security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.twoFactorAuth}
                        onChange={(e) => handlePrivacyChange('twoFactorAuth', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                </div>

                {/* Session Timeout */}
                <div>
                  <h4 className="text-lg font-medium text-[#F8FAFC] mb-4">Session Timeout</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#94A3B8]">Auto-logout after:</span>
                    <select
                      value={privacySettings.sessionTimeout}
                      onChange={(e) => handlePrivacyChange('sessionTimeout', parseInt(e.target.value))}
                      disabled={!isEditing}
                      className={`px-3 py-2 bg-[#0F172A] border rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ${
                        'border-[#374151]'
                      } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PatientProfile

// ============================================================================
// BACKEND INTEGRATION GUIDE
// ============================================================================

/**
 * BACKEND INTEGRATION CHECKLIST:
 * 
 * 1. AUTHENTICATION & AUTHORIZATION:
 *    - Implement JWT token-based authentication
 *    - Add token refresh mechanism
 *    - Implement role-based access control (patient vs doctor)
 *    - Add session management and timeout handling
 * 
 * 2. API ENDPOINTS TO IMPLEMENT:
 *    - GET /api/patient/profile - Fetch patient profile data
 *    - PUT /api/patient/profile - Update patient profile
 *    - POST /api/patient/profile/image - Upload profile image
 *    - GET /api/patient/medical-history - Fetch medical history
 *    - PUT /api/patient/medical-history - Update medical history
 *    - GET /api/patient/emergency-contacts - Fetch emergency contacts
 *    - PUT /api/patient/emergency-contacts - Update emergency contacts
 *    - GET /api/patient/notifications - Fetch notification preferences
 *    - PUT /api/patient/notifications - Update notification preferences
 *    - GET /api/patient/privacy - Fetch privacy settings
 *    - PUT /api/patient/privacy - Update privacy settings
 * 
 * 3. DATA VALIDATION:
 *    - Implement server-side validation for all fields
 *    - Add email uniqueness validation
 *    - Add phone number format validation
 *    - Add medical data validation (blood type, allergies)
 *    - Implement file upload validation (image size, type, dimensions)
 * 
 * 4. ERROR HANDLING:
 *    - Implement proper HTTP status codes
 *    - Add detailed error messages
 *    - Implement retry logic for failed requests
 *    - Add offline support with data synchronization
 * 
 * 5. SECURITY CONSIDERATIONS:
 *    - Implement rate limiting for API endpoints
 *    - Add input sanitization to prevent XSS
 *    - Implement CSRF protection
 *    - Add audit logging for sensitive data changes
 *    - Implement data encryption for sensitive information
 * 
 * 6. PERFORMANCE OPTIMIZATIONS:
 *    - Implement data pagination for large datasets
 *    - Add caching for frequently accessed data
 *    - Implement optimistic updates for better UX
 *    - Add image compression and CDN integration
 * 
 * 7. TESTING:
 *    - Add unit tests for all functions
 *    - Implement integration tests for API calls
 *    - Add end-to-end tests for user workflows
 *    - Implement error scenario testing
 * 
 * 8. MONITORING & ANALYTICS:
 *    - Add performance monitoring
 *    - Implement user behavior analytics
 *    - Add error tracking and reporting
 *    - Implement health checks for API endpoints
 */