/**
 * Apex Care - Patient History Page Component
 * 
 * This component displays the patient's medical history including
 * past appointments, prescriptions, test results, and medical records.
 * It provides filtering and detailed view capabilities.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Patient medical history with records and test results
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Pill, 
  TestTube, 
  Heart,
  Activity,
  Thermometer,
  Stethoscope,
  Download,
  Eye,
  Filter,
  ChevronDown,
  X
} from 'lucide-react'

const PatientHistory = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState(null)
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

  // Mock medical history data
  const medicalHistory = [
    {
      id: 1,
      date: '2024-12-15',
      type: 'consultation',
      doctor: 'Dr. Ayesha Malik',
      specialty: 'Cardiologist',
      diagnosis: 'Hypertension Management',
      notes: 'Patient shows improvement in blood pressure control. Continue current medication.',
      prescriptions: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' }
      ],
      tests: [
        { name: 'Blood Pressure', result: '130/85 mmHg', status: 'Normal' },
        { name: 'ECG', result: 'Normal sinus rhythm', status: 'Normal' }
      ],
      vitals: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '70 kg'
      }
    },
    {
      id: 2,
      date: '2024-11-20',
      type: 'consultation',
      doctor: 'Dr. Hassan Khan',
      specialty: 'Dermatologist',
      diagnosis: 'Acne Treatment',
      notes: 'Mild acne breakout. Recommended topical treatment and lifestyle changes.',
      prescriptions: [
        { name: 'Benzoyl Peroxide', dosage: '2.5%', frequency: 'Twice daily' },
        { name: 'Adapalene', dosage: '0.1%', frequency: 'Once daily at night' }
      ],
      tests: [
        { name: 'Skin Examination', result: 'Mild inflammatory acne', status: 'Mild' }
      ],
      vitals: {
        bloodPressure: '125/80',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '69 kg'
      }
    },
    {
      id: 3,
      date: '2024-10-10',
      type: 'lab',
      doctor: 'Dr. Sara Ahmed',
      specialty: 'General Practitioner',
      diagnosis: 'Annual Health Checkup',
      notes: 'Comprehensive health screening. All results within normal range.',
      prescriptions: [],
      tests: [
        { name: 'Complete Blood Count', result: 'All values normal', status: 'Normal' },
        { name: 'Lipid Panel', result: 'Cholesterol: 180 mg/dL', status: 'Normal' },
        { name: 'Blood Glucose', result: '95 mg/dL', status: 'Normal' },
        { name: 'Liver Function', result: 'All enzymes normal', status: 'Normal' }
      ],
      vitals: {
        bloodPressure: '120/78',
        heartRate: '70 bpm',
        temperature: '98.2°F',
        weight: '68 kg'
      }
    },
    {
      id: 4,
      date: '2024-09-05',
      type: 'emergency',
      doctor: 'Dr. Fahad Ali',
      specialty: 'Emergency Medicine',
      diagnosis: 'Minor Injury',
      notes: 'Patient presented with minor cut on hand. Cleaned and bandaged. No stitches required.',
      prescriptions: [
        { name: 'Antibiotic Ointment', dosage: 'Apply thin layer', frequency: 'Twice daily' }
      ],
      tests: [
        { name: 'Wound Assessment', result: 'Superficial cut, no infection', status: 'Good' }
      ],
      vitals: {
        bloodPressure: '118/75',
        heartRate: '75 bpm',
        temperature: '98.8°F',
        weight: '68 kg'
      }
    }
  ]

  const categories = [
    { id: 'all', label: 'All Records', icon: FileText },
    { id: 'consultation', label: 'Consultations', icon: Stethoscope },
    { id: 'lab', label: 'Lab Results', icon: TestTube },
    { id: 'emergency', label: 'Emergency', icon: Activity }
  ]

  const filteredHistory = selectedCategory === 'all' 
    ? medicalHistory 
    : medicalHistory.filter(record => record.type === selectedCategory)

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'text-blue-400 bg-blue-500/20'
      case 'lab': return 'text-green-400 bg-green-500/20'
      case 'emergency': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation': return Stethoscope
      case 'lab': return TestTube
      case 'emergency': return Activity
      default: return FileText
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E293B] rounded-xl p-6 border border-[#374151]"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F8FAFC] mb-2">Medical History</h1>
            <p className="text-[#94A3B8]">View your complete medical records and history</p>
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
                  {categories.find(cat => cat.id === selectedCategory)?.label}
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
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setShowFilterDropdown(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-[#4B5563] transition-colors duration-200 ${
                          selectedCategory === category.id ? 'text-blue-400 bg-blue-500/10' : 'text-[#F8FAFC]'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium transition-all duration-300"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Export Records
            </motion.button>
          </div>
        </div>
      </motion.div>


      {/* Medical Records List */}
      <div className="space-y-4">
        {filteredHistory.map((record, index) => {
          const TypeIcon = getTypeIcon(record.type)
          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-[#1E293B] rounded-xl p-6 border border-[#374151] hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(record.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F8FAFC]">{record.diagnosis}</h3>
                      <p className="text-[#94A3B8] text-sm">{record.doctor} • {record.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">10:30 AM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{record.doctor}</span>
                    </div>
                  </div>

                  <p className="text-[#94A3B8] text-sm mb-4">{record.notes}</p>

                  {/* Vitals */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-[#374151] rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-[#F8FAFC] text-sm font-medium">BP</span>
                      </div>
                      <p className="text-[#94A3B8] text-xs">{record.vitals.bloodPressure}</p>
                    </div>
                    <div className="bg-[#374151] rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-[#F8FAFC] text-sm font-medium">HR</span>
                      </div>
                      <p className="text-[#94A3B8] text-xs">{record.vitals.heartRate}</p>
                    </div>
                    <div className="bg-[#374151] rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-yellow-400" />
                        <span className="text-[#F8FAFC] text-sm font-medium">Temp</span>
                      </div>
                      <p className="text-[#94A3B8] text-xs">{record.vitals.temperature}</p>
                    </div>
                    <div className="bg-[#374151] rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-400" />
                        <span className="text-[#F8FAFC] text-sm font-medium">Weight</span>
                      </div>
                      <p className="text-[#94A3B8] text-xs">{record.vitals.weight}</p>
                    </div>
                  </div>

                  {/* Prescriptions and Tests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {record.prescriptions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2 flex items-center">
                          <Pill className="w-4 h-4 mr-2 text-green-400" />
                          Prescriptions
                        </h4>
                        <div className="space-y-2">
                          {record.prescriptions.map((prescription, idx) => (
                            <div key={idx} className="bg-[#374151] rounded-lg p-3">
                              <p className="text-[#F8FAFC] text-sm font-medium">{prescription.name}</p>
                              <p className="text-[#94A3B8] text-xs">{prescription.dosage} • {prescription.frequency}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.tests.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2 flex items-center">
                          <TestTube className="w-4 h-4 mr-2 text-blue-400" />
                          Test Results
                        </h4>
                        <div className="space-y-2">
                          {record.tests.map((test, idx) => (
                            <div key={idx} className="bg-[#374151] rounded-lg p-3">
                              <p className="text-[#F8FAFC] text-sm font-medium">{test.name}</p>
                              <p className="text-[#94A3B8] text-xs">{test.result}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                test.status === 'Normal' ? 'bg-green-500/20 text-green-400' :
                                test.status === 'Mild' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {test.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRecord(record)}
                  className="ml-4 p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors duration-300"
                >
                  <Eye className="w-5 h-5 text-[#94A3B8] hover:text-[#F8FAFC]" />
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRecord(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E293B] rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Medical Record Details</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors duration-300"
              >
                <X className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Record Header */}
              <div className="bg-[#374151] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{selectedRecord.diagnosis}</h3>
                <p className="text-[#94A3B8]">{selectedRecord.doctor} • {selectedRecord.specialty}</p>
                <p className="text-[#94A3B8] text-sm">{new Date(selectedRecord.date).toLocaleDateString()}</p>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-semibold text-[#F8FAFC] mb-2">Doctor's Notes</h4>
                <p className="text-[#94A3B8] bg-[#374151] rounded-lg p-4">{selectedRecord.notes}</p>
              </div>

              {/* Full Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prescriptions */}
                {selectedRecord.prescriptions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">Prescriptions</h4>
                    <div className="space-y-3">
                      {selectedRecord.prescriptions.map((prescription, idx) => (
                        <div key={idx} className="bg-[#374151] rounded-lg p-4">
                          <p className="text-[#F8FAFC] font-medium">{prescription.name}</p>
                          <p className="text-[#94A3B8] text-sm">Dosage: {prescription.dosage}</p>
                          <p className="text-[#94A3B8] text-sm">Frequency: {prescription.frequency}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Test Results */}
                {selectedRecord.tests.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">Test Results</h4>
                    <div className="space-y-3">
                      {selectedRecord.tests.map((test, idx) => (
                        <div key={idx} className="bg-[#374151] rounded-lg p-4">
                          <p className="text-[#F8FAFC] font-medium">{test.name}</p>
                          <p className="text-[#94A3B8] text-sm">{test.result}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                            test.status === 'Normal' ? 'bg-green-500/20 text-green-400' :
                            test.status === 'Mild' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {test.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default PatientHistory
