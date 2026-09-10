import React from 'react'
import { motion } from 'framer-motion'
import { Construction, ArrowLeft, Wrench } from 'lucide-react'

/**
 * FeatureUnderUpdate Component
 * Displays a placeholder page for features that are under development
 * 
 * @param {Object} props - Component props
 * @param {string} props.featureName - Name of the feature (e.g., "Settings", "Profile")
 * @param {string} props.description - Description of what the feature will do
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @returns {JSX.Element} Feature under update component
 */
const FeatureUnderUpdate = ({ featureName, description, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Construction Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-r from-[#2563EB]/20 to-[#14B8A6]/20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.3), 0 0 30px rgba(20, 184, 166, 0.3)'
          }}
        >
          <Construction size={48} className="text-[#14B8A6]" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-6">
            {featureName}
          </h1>
          
          <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#1E293B]/50 mb-8"
               style={{
                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
               }}>
            <h2 className="text-2xl font-semibold text-[#14B8A6] mb-4 flex items-center justify-center">
              <Wrench size={24} className="mr-2" />
              Feature Under Update
            </h2>
            
            <p className="text-lg text-[#94A3B8] mb-6 leading-relaxed">
              {description}
            </p>
            
            <div className="bg-[#0F172A]/50 rounded-xl p-6 border border-[#1E293B]/30">
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                What's Coming Soon:
              </h3>
              <ul className="text-[#94A3B8] space-y-2 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></div>
                  Enhanced user interface and experience
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></div>
                  Advanced functionality and features
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></div>
                  Improved security and data management
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></div>
                  Seamless integration with existing features
                </li>
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
            }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </motion.button>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-20 left-20 w-32 h-32 border border-[#14B8A6]/20 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-20 right-20 w-24 h-24 border border-[#2563EB]/20 rounded-full"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureUnderUpdate
