/**
 * Apex Care - Patient Logout Page Component
 * 
 * This component handles the patient logout process with confirmation,
 * processing animation, and automatic redirect. It clears authentication
 * data and provides visual feedback during the logout process.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Patient logout process with confirmation and cleanup
 */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Shield,
  Clock
} from 'lucide-react'

/**
 * PatientLogout Component
 * 
 * Handles the logout process with:
 * - Confirmation step
 * - Processing animation
 * - Success confirmation
 * - Automatic redirect to home page
 * - Cleanup of authentication data
 * 
 * @returns {JSX.Element} Patient logout page component
 */
const PatientLogout = () => {
  const navigate = useNavigate()
  const [logoutStep, setLogoutStep] = useState('confirm') // 'confirm', 'processing', 'success'
  const [countdown, setCountdown] = useState(3)

  const handleLogout = () => {
    setLogoutStep('processing')
    
    // Simulate logout processing
    setTimeout(() => {
      // Clear all authentication data
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      sessionStorage.removeItem('sessionData')
      
      // Clear auth cookie
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      
      setLogoutStep('success')
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            navigate('/')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 2000)
  }

  const handleCancel = () => {
    navigate('/patient-dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1E293B] rounded-xl p-8 max-w-md w-full border border-white/10"
        style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
      >
        {logoutStep === 'confirm' && (
          <>
            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#F8FAFC] text-center mb-4">
              Confirm Logout
            </h1>

            {/* Description */}
            <p className="text-[#94A3B8] text-center mb-8">
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>

            {/* Security Notice */}
            <div className="bg-[#374151] rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Security Notice</h3>
                  <p className="text-[#94A3B8] text-sm">
                    Logging out will securely clear your session data and protect your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-[#374151] text-[#F8FAFC] rounded-lg font-medium hover:bg-[#4B5563] transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Logout
              </motion.button>
            </div>
          </>
        )}

        {logoutStep === 'processing' && (
          <>
            {/* Processing Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <LogOut className="w-10 h-10 text-blue-400" />
                </motion.div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#F8FAFC] text-center mb-4">
              Logging Out...
            </h1>

            {/* Description */}
            <p className="text-[#94A3B8] text-center mb-8">
              Please wait while we securely log you out and clear your session data.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#374151] rounded-full h-2 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
              />
            </div>

            {/* Processing Steps */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-[#94A3B8] text-sm">Clearing session data...</span>
              </div>
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-[#94A3B8] text-sm">Removing authentication tokens...</span>
              </div>
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-[#94A3B8] text-sm">Securing your account...</span>
              </div>
            </div>
          </>
        )}

        {logoutStep === 'success' && (
          <>
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-[#F8FAFC] text-center mb-4"
            >
              Successfully Logged Out
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#94A3B8] text-center mb-8"
            >
              You have been securely logged out. Redirecting to home page in {countdown} seconds...
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{countdown}</span>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-1">Account Secured</h3>
                  <p className="text-[#94A3B8] text-sm">
                    Your session has been cleared and your account is now secure.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Manual Redirect Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Go to Home Page
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default PatientLogout
