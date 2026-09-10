/**
 * Apex Care - Doctor Profile Management Component
 * 
 * This component provides comprehensive profile management for doctors.
 * It includes personal information, professional details, availability settings,
 * consultation preferences, and account security management.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Doctor profile management with comprehensive settings and preferences
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Shield, 
  Bell, 
  Camera, 
  Save, 
  Edit3, 
  Check, 
  X, 
  Upload,
  GraduationCap,
  Award,
  Briefcase,
  Globe,
  Languages,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  Monitor,
  Building,
  Heart,
  Stethoscope,
  FileText,
  Settings,
  UserPlus,
  Trash2
} from 'lucide-react'

/**
 * Doctor Profile Management Component
 * 
 * Provides comprehensive profile management interface for doctors including:
 * - Personal Information Management
 * - Professional Details & Credentials
 * - Availability & Schedule Settings
 * - Consultation Preferences
 * - Account Security & Privacy
 * 
 * @component
 * @returns {JSX.Element} Doctor profile management interface
 */
const DoctorProfile = () => {
  // State management for different profile sections
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // 'saving', 'saved', 'error'

  // Profile image state with localStorage integration
  const [profileImage, setProfileImage] = useState(() => {
    const savedDoctorData = localStorage.getItem('doctorData')
    if (savedDoctorData) {
      const data = JSON.parse(savedDoctorData)
      return data.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    }
    return "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
  })

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Dr. Ayesha",
    lastName: "Malik",
    email: "ayesha.malik@apexcare.com",
    phone: "+92 300 1234567",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    address: "123 Medical Plaza, Block 6, PECHS, Karachi",
    city: "Karachi",
    country: "Pakistan",
    postalCode: "75400",
    emergencyContacts: []
  })

  // Emergency contact form state
  const [showEmergencyForm, setShowEmergencyForm] = useState(false)
  const [emergencyForm, setEmergencyForm] = useState({
    name: "",
    relationship: "",
    phone: ""
  })

  // Education form modal state
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    currentlyStudying: false,
    country: ""
  })

  // Certification form modal state
  const [showCertificationModal, setShowCertificationModal] = useState(false)
  const [certificationForm, setCertificationForm] = useState({
    name: "",
    issuingOrganization: "",
    issueMonth: "",
    issueYear: "",
    expirationMonth: "",
    expirationYear: "",
    credentialId: "",
    credentialUrl: "",
    skills: [],
    media: []
  })

  // Professional Information State
  const [professionalInfo, setProfessionalInfo] = useState({
    specialty: "Cardiologist",
    subSpecialties: ["Interventional Cardiology", "Heart Failure"],
    licenseNumber: "PMC-12345",
    licenseExpiry: "2026-12-31",
    experience: "12 years",
    education: [
      {
        degree: "MBBS",
        institution: "Aga Khan University",
        year: "2008",
        country: "Pakistan"
      },
      {
        degree: "FCPS Cardiology",
        institution: "College of Physicians and Surgeons Pakistan",
        year: "2015",
        country: "Pakistan"
      }
    ],
    certifications: [
      {
        name: "Advanced Cardiac Life Support (ACLS)",
        issuer: "American Heart Association",
        expiry: "2025-06-30"
      },
      {
        name: "Interventional Cardiology Fellowship",
        issuer: "Johns Hopkins Hospital",
        expiry: "2024-12-31"
      }
    ],
    languages: ["English", "Urdu", "Arabic"],
    consultationFee: 5000,
    currency: "PKR"
  })

  // Availability Settings State
  const [availabilitySettings, setAvailabilitySettings] = useState({
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    breakTime: {
      start: "13:00",
      end: "14:00"
    },
    consultationTypes: {
      inPerson: true,
      online: true,
      homeVisit: false
    },
    maxPatientsPerDay: 20,
    appointmentDuration: 30, // minutes
    advanceBookingDays: 30
  })

  // Consultation Preferences State
  const [consultationPreferences, setConsultationPreferences] = useState({
    preferredCommunication: "Video Call",
    autoConfirmAppointments: false,
    sendReminders: true,
    reminderTiming: "24 hours",
    followUpRequired: true,
    prescriptionDelivery: "Digital",
    reportSharing: "Secure Portal",
    emergencyAvailability: true,
    weekendConsultations: false
  })

  // Security & Privacy State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    dataSharing: false,
    marketingEmails: false,
    profileVisibility: "Public",
    contactSharing: false
  })

  // Password Change State
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  /**
   * Handle profile image upload with progress simulation
   * 
   * @param {Event} e - File input change event
   * 
   * TODO: Backend Integration
   * - Implement actual file upload to cloud storage (AWS S3, Cloudinary, etc.)
   * - Add image compression and optimization
   * - Implement proper error handling for upload failures
   * - Add support for multiple image formats and size validation
   * - Store image URL in doctor profile database
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            const newImageUrl = URL.createObjectURL(file)
            setProfileImage(newImageUrl)

            // Update localStorage with new image
            const updatedDoctorData = {
              name: "Dr. Ayesha Malik",
              avatar: newImageUrl,
              email: "ayesha.malik@apexcare.com",
              phone: "+92 300 1234567"
            }
            localStorage.setItem('doctorData', JSON.stringify(updatedDoctorData))
            window.dispatchEvent(new CustomEvent('doctorDataUpdated'))
            return 100
          }
          return prev + 10
        })
      }, 100)
    }
  }

  /**
   * Save profile changes to backend
   * 
   * @param {string} section - The section being saved
   * 
   * TODO: Backend Integration
   * - Implement API endpoint: PUT /api/doctors/{doctorId}/profile
   * - Add proper validation for all form fields
   * - Implement optimistic updates with rollback on failure
   * - Add audit logging for profile changes
   * - Implement rate limiting for profile updates
   */
  const handleSave = async (section) => {
    setSaveStatus('saving')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/doctors/${doctorId}/profile/${section}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${authToken}`
      //   },
      //   body: JSON.stringify(getSectionData(section))
      // })
      
      setSaveStatus('saved')
      // Exit edit mode after successful save
      setIsEditing(false)
      setTimeout(() => setSaveStatus(null), 2000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  /**
   * Get data for specific section
   * 
   * @param {string} section - The section name
   * @returns {Object} Section data
   */
  const getSectionData = (section) => {
    switch (section) {
      case 'personal': return personalInfo
      case 'professional': return professionalInfo
      case 'availability': return availabilitySettings
      case 'consultation': return consultationPreferences
      case 'security': return securitySettings
      default: return {}
    }
  }

  /**
   * Handle adding emergency contact
   */
  const handleAddEmergencyContact = () => {
    if (emergencyForm.name && emergencyForm.relationship && emergencyForm.phone) {
      const newContact = {
        id: Date.now(), // Simple ID generation
        name: emergencyForm.name,
        relationship: emergencyForm.relationship,
        phone: emergencyForm.phone
      }
      
      setPersonalInfo({
        ...personalInfo,
        emergencyContacts: [...personalInfo.emergencyContacts, newContact]
      })
      
      // Reset form
      setEmergencyForm({ name: "", relationship: "", phone: "" })
      setShowEmergencyForm(false)
    }
  }

  /**
   * Handle removing emergency contact
   * 
   * @param {number} contactId - The contact ID to remove
   */
  const handleRemoveEmergencyContact = (contactId) => {
    setPersonalInfo({
      ...personalInfo,
      emergencyContacts: personalInfo.emergencyContacts.filter(contact => contact.id !== contactId)
    })
  }

  /**
   * Cancel emergency contact form
   */
  const handleCancelEmergencyForm = () => {
    setEmergencyForm({ name: "", relationship: "", phone: "" })
    setShowEmergencyForm(false)
  }

  /**
   * Handle adding education entry
   */
  const handleAddEducation = () => {
    if (educationForm.institution && educationForm.degree && educationForm.startYear) {
      const newEducation = {
        degree: educationForm.degree,
        institution: educationForm.institution,
        year: educationForm.currentlyStudying 
          ? `${educationForm.startYear} - Present`
          : `${educationForm.startYear} - ${educationForm.endYear}`,
        country: educationForm.country || "Pakistan"
      }
      
      setProfessionalInfo({
        ...professionalInfo,
        education: [...professionalInfo.education, newEducation]
      })
      
      // Reset form and close modal
      setEducationForm({
        institution: "",
        degree: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyStudying: false,
        country: ""
      })
      setShowEducationModal(false)
    }
  }

  /**
   * Cancel education form
   */
  const handleCancelEducationForm = () => {
    setEducationForm({
      institution: "",
      degree: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyStudying: false,
      country: ""
    })
    setShowEducationModal(false)
  }

  /**
   * Handle adding certification entry
   */
  const handleAddCertification = () => {
    if (certificationForm.name && certificationForm.issuingOrganization && certificationForm.issueYear) {
      const newCertification = {
        name: certificationForm.name,
        issuer: certificationForm.issuingOrganization,
        expiry: certificationForm.expirationYear 
          ? `${certificationForm.expirationYear}-${certificationForm.expirationMonth || '01'}-01`
          : '2025-12-31' // Default expiry if not provided
      }
      
      setProfessionalInfo({
        ...professionalInfo,
        certifications: [...professionalInfo.certifications, newCertification]
      })
      
      // Reset form and close modal
      setCertificationForm({
        name: "",
        issuingOrganization: "",
        issueMonth: "",
        issueYear: "",
        expirationMonth: "",
        expirationYear: "",
        credentialId: "",
        credentialUrl: "",
        skills: [],
        media: []
      })
      setShowCertificationModal(false)
    }
  }

  /**
   * Cancel certification form
   */
  const handleCancelCertificationForm = () => {
    setCertificationForm({
      name: "",
      issuingOrganization: "",
      issueMonth: "",
      issueYear: "",
      expirationMonth: "",
      expirationYear: "",
      credentialId: "",
      credentialUrl: "",
      skills: [],
      media: []
    })
    setShowCertificationModal(false)
  }

  /**
   * Handle password change
   * 
   * TODO: Backend Integration
   * - Implement API endpoint: PUT /api/doctors/{doctorId}/password
   * - Add password strength validation
   * - Implement secure password hashing
   * - Add password history to prevent reuse
   * - Send email notification on password change
   */
  const handlePasswordChange = async () => {
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setSaveStatus('saving')
    try {
      // TODO: Implement actual password change API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveStatus('saved')
      setPasswordChange({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      setSaveStatus('error')
    }
  }

  // Tab configuration with icons
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'professional', label: 'Professional', icon: GraduationCap },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'consultation', label: 'Consultation', icon: Stethoscope },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0F172A]/80 backdrop-blur-md border-b border-[#1E293B]/30 p-6 pt-6"
        style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Profile Management</h1>
          <p className="text-[#94A3B8]">Manage your professional profile and preferences</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Capsule Toggler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex h-12 w-full max-w-6xl border border-[#374151] rounded-full overflow-hidden bg-transparent gap-0">
            {tabs.map((tab, index) => (
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

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {/* Personal Information Section */}
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
                  <User className="w-6 h-6 text-[#14B8A6]" />
                  Personal Information
                </h2>
                <div className="flex items-center gap-3">
                  {saveStatus === 'saving' && (
                    <div className="flex items-center gap-2 text-[#F59E0B]">
                      <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-lg animate-spin"></div>
                      <span className="text-sm">Saving...</span>
                    </div>
                  )}
                  {saveStatus === 'saved' && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle size={16} />
                      <span className="text-sm">Saved</span>
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle size={16} />
                      <span className="text-sm">Error</span>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </motion.button>
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-[#0F172A] rounded-xl">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-[#14B8A6]"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#14B8A6]/80 transition-colors">
                      <Camera size={12} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">{personalInfo.firstName} {personalInfo.lastName}</h3>
                  <p className="text-[#14B8A6] font-medium">{professionalInfo.specialty}</p>
                  <p className="text-[#94A3B8] text-sm">{professionalInfo.experience} experience</p>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="ml-auto">
                    <div className="w-32 bg-[#374151] rounded-lg h-2">
                      <div
                        className="bg-[#14B8A6] h-2 rounded-lg transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-[#94A3B8] text-xs mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>

              {/* Personal Information Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Gender</label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#F8FAFC] font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={personalInfo.country}
                    onChange={(e) => setPersonalInfo({...personalInfo, country: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#14B8A6]" />
                  Emergency Contacts
                </h3>
                
                {/* Display existing emergency contacts */}
                {personalInfo.emergencyContacts.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {personalInfo.emergencyContacts.map((contact) => (
                      <div key={contact.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-[#F8FAFC] font-medium mb-2">Name</label>
                          <input
                            type="text"
                            value={contact.name}
                            disabled={true}
                            className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] opacity-75 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-[#F8FAFC] font-medium mb-2">Relationship</label>
                          <input
                            type="text"
                            value={contact.relationship}
                            disabled={true}
                            className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] opacity-75 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-[#F8FAFC] font-medium mb-2">Phone</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="tel"
                              value={contact.phone}
                              disabled={true}
                              className="flex-1 px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] opacity-75 cursor-not-allowed"
                            />
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveEmergencyContact(contact.id)}
                                  className="p-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                  title="Remove contact"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Emergency Contact Form */}
                {showEmergencyForm && (
                  <div className="p-4 bg-[#0F172A] rounded-lg border border-[#374151] mb-4">
                    <h4 className="text-[#F8FAFC] font-medium mb-4">Add Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={emergencyForm.name}
                          onChange={(e) => setEmergencyForm({...emergencyForm, name: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Relationship</label>
                        <input
                          type="text"
                          value={emergencyForm.relationship}
                          onChange={(e) => setEmergencyForm({...emergencyForm, relationship: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="e.g., Spouse, Parent, Sibling"
                        />
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={emergencyForm.phone}
                          onChange={(e) => setEmergencyForm({...emergencyForm, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddEmergencyContact}
                        disabled={!emergencyForm.name || !emergencyForm.relationship || !emergencyForm.phone}
                        className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-lg hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Check size={16} />
                        Add Contact
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancelEmergencyForm}
                        className="px-6 py-3 bg-[#374151] text-[#F8FAFC] rounded-full hover:bg-[#4B5563] transition-colors flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Add Contact Button */}
                {personalInfo.emergencyContacts.length < 3 && !showEmergencyForm && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmergencyForm(true)}
                    disabled={!isEditing}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus size={16} />
                    Add Emergency Contact
                  </motion.button>
                )}

                {/* Max contacts reached message */}
                {personalInfo.emergencyContacts.length >= 3 && (
                  <div className="text-center p-4 text-[#94A3B8] text-sm">
                    Maximum of 3 emergency contacts allowed
                  </div>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSave('personal')}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

                    {/* Professional Information Section */}
                    {activeTab === 'professional' && (
            <motion.div
              key="professional"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#14B8A6]" />
                  Professional Information
                </h2>
                <div className="flex items-center gap-3">
                  {saveStatus === 'saving' && (
                    <div className="flex items-center gap-2 text-[#F59E0B]">
                      <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-lg animate-spin"></div>
                      <span className="text-sm">Saving...</span>
                    </div>
                  )}
                  {saveStatus === 'saved' && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle size={16} />
                      <span className="text-sm">Saved</span>
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle size={16} />
                      <span className="text-sm">Error</span>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </motion.button>
                </div>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">Specialty</label>
                  <input
                    type="text"
                    value={professionalInfo.specialty}
                    onChange={(e) => setProfessionalInfo({...professionalInfo, specialty: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[#F8FAFC] font-medium mb-2">License Number</label>
                  <input
                    type="text"
                    value={professionalInfo.licenseNumber}
                    onChange={(e) => setProfessionalInfo({...professionalInfo, licenseNumber: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">License Expiry</label>
                    <input
                      type="date"
                      value={professionalInfo.licenseExpiry}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, licenseExpiry: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Experience</label>
                    <input
                      type="text"
                      value={professionalInfo.experience}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, experience: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Consultation Fee ({professionalInfo.currency})</label>
                    <input
                      type="number"
                      value={professionalInfo.consultationFee}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, consultationFee: parseInt(e.target.value)})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
  
                {/* Sub-specialties */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-2">Sub-specialties</label>
                  <div className="flex flex-wrap gap-2">
                    {professionalInfo.subSpecialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-[#14B8A6]/20 text-[#14B8A6] rounded-lg text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
  
                {/* Languages */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {professionalInfo.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-[#2563EB]/20 text-[#2563EB] rounded-lg text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
  
                {/* Education */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#14B8A6]" />
                      Education
                    </h3>
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowEducationModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2 text-sm"
                      >
                        <UserPlus size={16} />
                        Add Education
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {professionalInfo.education.map((edu, index) => (
                      <div key={index} className="bg-[#0F172A] border border-[#374151] rounded-lg p-6 hover:border-[#14B8A6]/30 transition-colors">
                        <div className="flex items-start gap-4">
                          {/* Education Icon */}
                          <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-6 h-6 text-[#14B8A6]" />
                          </div>
                          
                          {/* Education Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-[#F8FAFC] font-semibold text-lg">
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={edu.degree}
                                      onChange={(e) => {
                                        const newEducation = [...professionalInfo.education]
                                        newEducation[index].degree = e.target.value
                                        setProfessionalInfo({...professionalInfo, education: newEducation})
                                      }}
                                      className="bg-transparent border-none text-[#F8FAFC] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                      placeholder="Degree Title"
                                    />
                                  ) : (
                                    edu.degree
                                  )}
                                </h4>
                                <p className="text-[#14B8A6] font-medium">
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={edu.institution}
                                      onChange={(e) => {
                                        const newEducation = [...professionalInfo.education]
                                        newEducation[index].institution = e.target.value
                                        setProfessionalInfo({...professionalInfo, education: newEducation})
                                      }}
                                      className="bg-transparent border-none text-[#14B8A6] font-medium focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                      placeholder="Institution Name"
                                    />
                                  ) : (
                                    edu.institution
                                  )}
                                </p>
                              </div>
                              {isEditing && (
                                <button
                                  onClick={() => {
                                    const newEducation = professionalInfo.education.filter((_, i) => i !== index)
                                    setProfessionalInfo({...professionalInfo, education: newEducation})
                                  }}
                                  className="p-2 text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="Remove education"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                            
                            <p className="text-[#94A3B8] text-sm mb-3">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={`${edu.degree} from ${edu.institution}, ${edu.year} (${edu.country})`}
                                  onChange={(e) => {
                                    // Parse the combined string back to individual fields
                                    const parts = e.target.value.split(', ')
                                    if (parts.length >= 3) {
                                      const newEducation = [...professionalInfo.education]
                                      newEducation[index].degree = parts[0].split(' from ')[0]
                                      newEducation[index].institution = parts[0].split(' from ')[1] || ''
                                      newEducation[index].year = parts[1] || ''
                                      newEducation[index].country = parts[2].replace(/[()]/g, '') || ''
                                      setProfessionalInfo({...professionalInfo, education: newEducation})
                                    }
                                  }}
                                  className="bg-transparent border-none text-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1 w-full"
                                  placeholder="Degree description and details"
                                />
                              ) : (
                                `${edu.degree} from ${edu.institution}, ${edu.year} (${edu.country})`
                              )}
                            </p>
                            
                            <div className="flex items-center gap-4 text-[#94A3B8] text-sm">
                              <span>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={edu.year}
                                    onChange={(e) => {
                                      const newEducation = [...professionalInfo.education]
                                      newEducation[index].year = e.target.value
                                      setProfessionalInfo({...professionalInfo, education: newEducation})
                                    }}
                                    className="bg-transparent border-none text-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                    placeholder="Year"
                                  />
                                ) : (
                                  edu.year
                                )}
                              </span>
                              <span>•</span>
                              <span>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={edu.country}
                                    onChange={(e) => {
                                      const newEducation = [...professionalInfo.education]
                                      newEducation[index].country = e.target.value
                                      setProfessionalInfo({...professionalInfo, education: newEducation})
                                    }}
                                    className="bg-transparent border-none text-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                    placeholder="Country"
                                  />
                                ) : (
                                  edu.country
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show all education link */}
                  {professionalInfo.education.length > 2 && (
                    <div className="text-center mt-6">
                      <button className="text-[#14B8A6] hover:text-[#0F766E] transition-colors flex items-center gap-2 mx-auto">
                        <span>Show all {professionalInfo.education.length} education entries</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
  
                {/* Certifications */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#14B8A6]" />
                      Certifications
                    </h3>
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCertificationModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2 text-sm"
                      >
                        <UserPlus size={16} />
                        Add Certification
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {professionalInfo.certifications.map((cert, index) => (
                      <div key={index} className="bg-[#0F172A] border border-[#374151] rounded-lg p-6 hover:border-[#14B8A6]/30 transition-colors">
                        <div className="flex items-start gap-4">
                          {/* Certification Icon */}
                          <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-[#14B8A6]" />
                          </div>
                          
                          {/* Certification Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-[#F8FAFC] font-semibold text-lg">
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={cert.name}
                                      onChange={(e) => {
                                        const newCertifications = [...professionalInfo.certifications]
                                        newCertifications[index].name = e.target.value
                                        setProfessionalInfo({...professionalInfo, certifications: newCertifications})
                                      }}
                                      className="bg-transparent border-none text-[#F8FAFC] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                      placeholder="Certification Name"
                                    />
                                  ) : (
                                    cert.name
                                  )}
                                </h4>
                                <p className="text-[#14B8A6] font-medium">
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={cert.issuer}
                                      onChange={(e) => {
                                        const newCertifications = [...professionalInfo.certifications]
                                        newCertifications[index].issuer = e.target.value
                                        setProfessionalInfo({...professionalInfo, certifications: newCertifications})
                                      }}
                                      className="bg-transparent border-none text-[#14B8A6] font-medium focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                      placeholder="Issuing Organization"
                                    />
                                  ) : (
                                    cert.issuer
                                  )}
                                </p>
                              </div>
                              {isEditing && (
                                <button
                                  onClick={() => {
                                    const newCertifications = professionalInfo.certifications.filter((_, i) => i !== index)
                                    setProfessionalInfo({...professionalInfo, certifications: newCertifications})
                                  }}
                                  className="p-2 text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="Remove certification"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                            
                            {/* Skills/Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-[#14B8A6]/20 text-[#14B8A6] rounded-full text-sm">
                                Professional Certification
                              </span>
                              <span className="px-3 py-1 bg-[#2563EB]/20 text-[#2563EB] rounded-full text-sm">
                                Medical License
                              </span>
                              <span className="px-3 py-1 bg-[#22C55E]/20 text-[#22C55E] rounded-full text-sm">
                                Continuing Education
                              </span>
                              <span className="text-[#14B8A6] text-sm">+ 2 more</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-[#94A3B8] text-sm">
                              <span>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={cert.expiry}
                                    onChange={(e) => {
                                      const newCertifications = [...professionalInfo.certifications]
                                      newCertifications[index].expiry = e.target.value
                                      setProfessionalInfo({...professionalInfo, certifications: newCertifications})
                                    }}
                                    className="bg-transparent border-none text-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6] rounded px-2 py-1"
                                  />
                                ) : (
                                  `Expires ${new Date(cert.expiry).toLocaleDateString()}`
                                )}
                              </span>
                              <span>•</span>
                              <button className="text-[#14B8A6] hover:text-[#0F766E] transition-colors">
                                View certificate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show all certifications link */}
                  {professionalInfo.certifications.length > 2 && (
                    <div className="text-center mt-6">
                      <button className="text-[#14B8A6] hover:text-[#0F766E] transition-colors flex items-center gap-2 mx-auto">
                        <span>Show all {professionalInfo.certifications.length} certifications</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
  
                {/* Save Button */}
                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSave('professional')}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
  
            {/* Availability Settings Section */}
            {activeTab === 'availability' && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#14B8A6]" />
                    Availability Settings
                  </h2>
                  <div className="flex items-center gap-3">
                    {saveStatus === 'saving' && (
                      <div className="flex items-center gap-2 text-[#F59E0B]">
                        <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-lg animate-spin"></div>
                        <span className="text-sm">Saving...</span>
                      </div>
                    )}
                    {saveStatus === 'saved' && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle size={16} />
                        <span className="text-sm">Saved</span>
                      </div>
                    )}
                    {saveStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle size={16} />
                        <span className="text-sm">Error</span>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </motion.button>
                  </div>
                </div>
  
                {/* Working Days */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-4">Working Days</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label key={day} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={availabilitySettings.workingDays.includes(day)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAvailabilitySettings({
                                ...availabilitySettings,
                                workingDays: [...availabilitySettings.workingDays, day]
                              })
                            } else {
                              setAvailabilitySettings({
                                ...availabilitySettings,
                                workingDays: availabilitySettings.workingDays.filter(d => d !== day)
                              })
                            }
                          }}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                        <span className="text-[#F8FAFC] text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
                {/* Working Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Start Time</label>
                    <input
                      type="time"
                      value={availabilitySettings.workingHours.start}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        workingHours: {...availabilitySettings.workingHours, start: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">End Time</label>
                    <input
                      type="time"
                      value={availabilitySettings.workingHours.end}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        workingHours: {...availabilitySettings.workingHours, end: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
  
                {/* Break Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Break Start Time</label>
                    <input
                      type="time"
                      value={availabilitySettings.breakTime.start}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        breakTime: {...availabilitySettings.breakTime, start: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Break End Time</label>
                    <input
                      type="time"
                      value={availabilitySettings.breakTime.end}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        breakTime: {...availabilitySettings.breakTime, end: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Consultation Types */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-4">Consultation Types</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={availabilitySettings.consultationTypes.inPerson}
                        onChange={(e) => setAvailabilitySettings({
                          ...availabilitySettings,
                          consultationTypes: {...availabilitySettings.consultationTypes, inPerson: e.target.checked}
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <Building className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-[#F8FAFC]">In-Person</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={availabilitySettings.consultationTypes.online}
                        onChange={(e) => setAvailabilitySettings({
                          ...availabilitySettings,
                          consultationTypes: {...availabilitySettings.consultationTypes, online: e.target.checked}
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <Monitor className="w-5 h-5 text-[#14B8A6]" />
                      <span className="text-[#F8FAFC]">Online</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={availabilitySettings.consultationTypes.homeVisit}
                        onChange={(e) => setAvailabilitySettings({
                          ...availabilitySettings,
                          consultationTypes: {...availabilitySettings.consultationTypes, homeVisit: e.target.checked}
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <MapPin className="w-5 h-5 text-[#22C55E]" />
                      <span className="text-[#F8FAFC]">Home Visit</span>
                    </label>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Max Patients Per Day</label>
                    <input
                      type="number"
                      value={availabilitySettings.maxPatientsPerDay}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        maxPatientsPerDay: parseInt(e.target.value)
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Appointment Duration (minutes)</label>
                    <input
                      type="number"
                      value={availabilitySettings.appointmentDuration}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        appointmentDuration: parseInt(e.target.value)
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] font-medium mb-2">Advance Booking (days)</label>
                    <input
                      type="number"
                      value={availabilitySettings.advanceBookingDays}
                      onChange={(e) => setAvailabilitySettings({
                        ...availabilitySettings,
                        advanceBookingDays: parseInt(e.target.value)
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSave('availability')}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Consultation Preferences Section */}
            {activeTab === 'consultation' && (
              <motion.div
                key="consultation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
                    <Stethoscope className="w-6 h-6 text-[#14B8A6]" />
                    Consultation Preferences
                  </h2>
                  <div className="flex items-center gap-3">
                    {saveStatus === 'saving' && (
                      <div className="flex items-center gap-2 text-[#F59E0B]">
                        <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-lg animate-spin"></div>
                        <span className="text-sm">Saving...</span>
                      </div>
                    )}
                    {saveStatus === 'saved' && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle size={16} />
                        <span className="text-sm">Saved</span>
                      </div>
                    )}
                    {saveStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle size={16} />
                        <span className="text-sm">Error</span>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </motion.button>
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-4">Preferred Communication Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Video Call', 'Phone Call', 'Chat'].map((method) => (
                      <label key={method} className="flex items-center space-x-3 cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <input
                          type="radio"
                          name="communication"
                          value={method}
                          checked={consultationPreferences.preferredCommunication === method}
                          onChange={(e) => setConsultationPreferences({
                            ...consultationPreferences,
                            preferredCommunication: e.target.value
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                        <span className="text-[#F8FAFC]">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Appointment Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationPreferences.autoConfirmAppointments}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          autoConfirmAppointments: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <span className="text-[#F8FAFC]">Auto-confirm appointments</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationPreferences.sendReminders}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          sendReminders: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <span className="text-[#F8FAFC]">Send appointment reminders</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationPreferences.followUpRequired}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          followUpRequired: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <span className="text-[#F8FAFC]">Require follow-up appointments</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationPreferences.emergencyAvailability}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          emergencyAvailability: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <span className="text-[#F8FAFC]">Emergency availability</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationPreferences.weekendConsultations}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          weekendConsultations: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                      />
                      <span className="text-[#F8FAFC]">Weekend consultations</span>
                    </label>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">Reminder Timing</label>
                      <select
                        value={consultationPreferences.reminderTiming}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          reminderTiming: e.target.value
                        })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="1 hour">1 hour before</option>
                        <option value="24 hours">24 hours before</option>
                        <option value="48 hours">48 hours before</option>
                        <option value="1 week">1 week before</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">Prescription Delivery</label>
                      <select
                        value={consultationPreferences.prescriptionDelivery}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          prescriptionDelivery: e.target.value
                        })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="Digital">Digital</option>
                        <option value="Physical">Physical</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">Report Sharing</label>
                      <select
                        value={consultationPreferences.reportSharing}
                        onChange={(e) => setConsultationPreferences({
                          ...consultationPreferences,
                          reportSharing: e.target.value
                        })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="Secure Portal">Secure Portal</option>
                        <option value="Email">Email</option>
                        <option value="Physical Copy">Physical Copy</option>
                        <option value="All Methods">All Methods</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSave('consultation')}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Security & Privacy Section */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[#14B8A6]" />
                    Security & Privacy
                  </h2>
                  <div className="flex items-center gap-3">
                    {saveStatus === 'saving' && (
                      <div className="flex items-center gap-2 text-[#F59E0B]">
                        <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-lg animate-spin"></div>
                        <span className="text-sm">Saving...</span>
                      </div>
                    )}
                    {saveStatus === 'saved' && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle size={16} />
                        <span className="text-sm">Saved</span>
                      </div>
                    )}
                    {saveStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle size={16} />
                        <span className="text-sm">Error</span>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </motion.button>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#14B8A6]" />
                      Security Settings
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-[#14B8A6]" />
                          <span className="text-[#F8FAFC]">Two-Factor Authentication</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: e.target.checked
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-[#14B8A6]" />
                          <span className="text-[#F8FAFC]">Login Notifications</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.loginNotifications}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            loginNotifications: e.target.checked
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#14B8A6]" />
                      Privacy Settings
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-[#14B8A6]" />
                          <span className="text-[#F8FAFC]">Data Sharing</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.dataSharing}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            dataSharing: e.target.checked
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-[#14B8A6]" />
                          <span className="text-[#F8FAFC]">Marketing Emails</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.marketingEmails}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            marketingEmails: e.target.checked
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-[#14B8A6]" />
                          <span className="text-[#F8FAFC]">Contact Sharing</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={securitySettings.contactSharing}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            contactSharing: e.target.checked
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] rounded focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Profile Visibility */}
                <div className="mb-8">
                  <label className="block text-[#F8FAFC] font-medium mb-4">Profile Visibility</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Public', 'Private', 'Professional Only'].map((visibility) => (
                      <label key={visibility} className="flex items-center space-x-3 cursor-pointer p-4 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors">
                        <input
                          type="radio"
                          name="visibility"
                          value={visibility}
                          checked={securitySettings.profileVisibility === visibility}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            profileVisibility: e.target.value
                          })}
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#14B8A6] bg-[#0F172A] border-[#374151] focus:ring-[#14B8A6] disabled:opacity-50"
                        />
                        <span className="text-[#F8FAFC]">{visibility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Password Change Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#14B8A6]" />
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordChange.currentPassword}
                          onChange={(e) => setPasswordChange({...passwordChange, currentPassword: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordChange.newPassword}
                          onChange={(e) => setPasswordChange({...passwordChange, newPassword: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#F8FAFC] font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordChange.confirmPassword}
                          onChange={(e) => setPasswordChange({...passwordChange, confirmPassword: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-[#0F172A] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePasswordChange}
                        className="px-6 py-3 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-lg hover:from-[#DC2626] hover:to-[#B91C1C] transition-all duration-300 flex items-center gap-2"
                      >
                        <Lock size={16} />
                        Change Password
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSave('security')}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
        </AnimatePresence>

        {/* Education Modal */}
        <AnimatePresence>
          {showEducationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0F172A] border border-[#374151] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC]">Education</h2>
                  <button
                    onClick={handleCancelEducationForm}
                    className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#374151] rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Description */}
                <p className="text-[#94A3B8] mb-6 leading-relaxed">
                  Add your educational background to let patients and colleagues know where you studied or are currently studying. 
                  Even if you didn't finish, it's important to include it here. And if you've earned a college degree, 
                  you don't need to add your high school/GED.
                </p>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Institution Name */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">Name of institution</label>
                    <input
                      type="text"
                      value={educationForm.institution}
                      onChange={(e) => setEducationForm({...educationForm, institution: e.target.value})}
                      placeholder="Enter institution name"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                    <p className="text-[#94A3B8] text-sm mt-1">100 characters remaining</p>
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">Degree</label>
                    <select
                      value={educationForm.degree}
                      onChange={(e) => setEducationForm({...educationForm, degree: e.target.value})}
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                    >
                      <option value="">Select Degree</option>
                      <option value="MBBS">MBBS (Bachelor of Medicine, Bachelor of Surgery)</option>
                      <option value="MD">MD (Doctor of Medicine)</option>
                      <option value="MS">MS (Master of Surgery)</option>
                      <option value="FCPS">FCPS (Fellow of College of Physicians and Surgeons)</option>
                      <option value="MRCP">MRCP (Member of Royal College of Physicians)</option>
                      <option value="FRCS">FRCS (Fellow of Royal College of Surgeons)</option>
                      <option value="PhD">PhD (Doctor of Philosophy)</option>
                      <option value="MSc">MSc (Master of Science)</option>
                      <option value="BSc">BSc (Bachelor of Science)</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <h3 className="text-[#F8FAFC] font-semibold mb-4">Start date</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Month</label>
                        <select
                          value={educationForm.startMonth}
                          onChange={(e) => setEducationForm({...educationForm, startMonth: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Select month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Year</label>
                        <select
                          value={educationForm.startYear}
                          onChange={(e) => setEducationForm({...educationForm, startYear: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Select year</option>
                          {Array.from({length: 50}, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[#374151]"></div>

                  {/* End Date */}
                  <div>
                    <h3 className="text-[#F8FAFC] font-semibold mb-4">Graduation date or expected graduation date</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Month</label>
                        <select
                          value={educationForm.endMonth}
                          onChange={(e) => setEducationForm({...educationForm, endMonth: e.target.value})}
                          disabled={educationForm.currentlyStudying}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Year</label>
                        <select
                          value={educationForm.endYear}
                          onChange={(e) => setEducationForm({...educationForm, endYear: e.target.value})}
                          disabled={educationForm.currentlyStudying}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select year</option>
                          {Array.from({length: 50}, (_, i) => {
                            const year = new Date().getFullYear() + 10 - i
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Currently Studying Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="currentlyStudying"
                      checked={educationForm.currentlyStudying}
                      onChange={(e) => setEducationForm({...educationForm, currentlyStudying: e.target.checked})}
                      className="w-4 h-4 text-[#14B8A6] bg-[#1E293B] border-[#374151] rounded focus:ring-[#14B8A6]"
                    />
                    <label htmlFor="currentlyStudying" className="text-[#F8FAFC] cursor-pointer">
                      I currently study here
                    </label>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">Country</label>
                    <input
                      type="text"
                      value={educationForm.country}
                      onChange={(e) => setEducationForm({...educationForm, country: e.target.value})}
                      placeholder="Enter country"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelEducationForm}
                    className="px-6 py-3 bg-[#374151] text-[#F8FAFC] rounded-full hover:bg-[#4B5563] transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddEducation}
                    disabled={!educationForm.institution || !educationForm.degree || !educationForm.startYear}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certification Modal */}
        <AnimatePresence>
          {showCertificationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0F172A] border border-[#374151] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC]">Add license or certification</h2>
                  <button
                    onClick={handleCancelCertificationForm}
                    className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#374151] rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Required fields note */}
                <p className="text-[#94A3B8] text-sm mb-6">* Indicates required</p>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">
                      Name<span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={certificationForm.name}
                      onChange={(e) => setCertificationForm({...certificationForm, name: e.target.value})}
                      placeholder="Ex: Advanced Cardiac Life Support (ACLS)"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                  </div>

                  {/* Issuing Organization */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">
                      Issuing organization<span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={certificationForm.issuingOrganization}
                      onChange={(e) => setCertificationForm({...certificationForm, issuingOrganization: e.target.value})}
                      placeholder="Ex: American Heart Association"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                  </div>

                  {/* Issue Date */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-4">Issue date</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Month</label>
                        <select
                          value={certificationForm.issueMonth}
                          onChange={(e) => setCertificationForm({...certificationForm, issueMonth: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Year</label>
                        <select
                          value={certificationForm.issueYear}
                          onChange={(e) => setCertificationForm({...certificationForm, issueYear: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Year</option>
                          {Array.from({length: 50}, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-4">Expiration date</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Month</label>
                        <select
                          value={certificationForm.expirationMonth}
                          onChange={(e) => setCertificationForm({...certificationForm, expirationMonth: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#F8FAFC] font-medium mb-2">Year</label>
                        <select
                          value={certificationForm.expirationYear}
                          onChange={(e) => setCertificationForm({...certificationForm, expirationYear: e.target.value})}
                          className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                        >
                          <option value="">Year</option>
                          {Array.from({length: 50}, (_, i) => {
                            const year = new Date().getFullYear() + 10 - i
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Credential ID */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">Credential ID</label>
                    <input
                      type="text"
                      value={certificationForm.credentialId}
                      onChange={(e) => setCertificationForm({...certificationForm, credentialId: e.target.value})}
                      placeholder="Ex: ACLS-2024-12345"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                  </div>

                  {/* Credential URL */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">Credential URL</label>
                    <input
                      type="url"
                      value={certificationForm.credentialUrl}
                      onChange={(e) => setCertificationForm({...certificationForm, credentialUrl: e.target.value})}
                      placeholder="Ex: https://www.heart.org/certification"
                      className="w-full px-4 py-3 bg-[#1E293B] border border-[#374151] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] placeholder-[#94A3B8]"
                    />
                  </div>


                  {/* Media Section */}
                  <div>
                    <h3 className="text-[#F8FAFC] font-semibold mb-2">Media</h3>
                    <p className="text-[#94A3B8] text-sm mb-4">
                      Add media like certification documents, license images, or verification links. 
                      <button className="text-[#14B8A6] hover:text-[#0F766E] transition-colors ml-1">
                        Learn more about supported file types
                      </button>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      <UserPlus size={16} />
                      Add media
                    </motion.button>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddCertification}
                    disabled={!certificationForm.name || !certificationForm.issuingOrganization || !certificationForm.issueYear}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-full hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DoctorProfile
             