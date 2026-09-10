# Apex Care - API Integration Guide

## Overview
This document provides comprehensive information for backend developers to integrate with the Apex Care frontend application. It includes data structures, API endpoints, authentication flows, and component integration details.

## Table of Contents
1. [Authentication System](#authentication-system)
2. [Data Structures](#data-structures)
3. [API Endpoints](#api-endpoints)
4. [Component Integration](#component-integration)
5. [State Management](#state-management)
6. [File Uploads](#file-uploads)
7. [Real-time Features](#real-time-features)

## Authentication System

### Current Implementation
The frontend currently uses mock authentication with localStorage and sessionStorage. Replace with actual API calls.

### Authentication Flow
```javascript
// Current mock implementation in SignIn.jsx
const handleSubmit = (e) => {
  e.preventDefault()
  
  // TODO: Replace with actual API call
  // POST /api/auth/login
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      userType: userType // 'patient' or 'doctor'
    })
  })
  
  const data = await response.json()
  
  if (data.success) {
    // Store authentication data
    localStorage.setItem('authToken', data.token)
    localStorage.setItem('userData', JSON.stringify(data.user))
    sessionStorage.setItem('sessionData', JSON.stringify({
      isAuthenticated: true,
      loginTime: new Date().toISOString()
    }))
    
    // Redirect based on user type
    navigate(userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard')
  }
}
```

### Required API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/verify` - Token verification

## Data Structures

### User Data Structure
```javascript
// Patient User
const patientUser = {
  id: "patient_123",
  email: "patient@example.com",
  name: "John Doe",
  userType: "patient",
  profile: {
    age: 35,
    gender: "male",
    phone: "+1234567890",
    address: "123 Main St, City, State",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1234567891",
      relationship: "spouse"
    },
    medicalHistory: [
      {
        condition: "Diabetes Type 2",
        diagnosedDate: "2020-01-15",
        status: "active",
        medications: ["Metformin"]
      }
    ],
    allergies: ["Penicillin", "Shellfish"]
  },
  appointments: [],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}

// Doctor User
const doctorUser = {
  id: "doctor_456",
  email: "doctor@example.com",
  name: "Dr. Ayesha Malik",
  userType: "doctor",
  profile: {
    specialty: "Cardiologist",
    experience: "12 years",
    education: "MD, Johns Hopkins University",
    languages: ["English", "Urdu"],
    consultationFee: 150,
    rating: 4.9,
    reviews: 234,
    availability: {
      days: ["Mon", "Wed", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    bio: "Specialized in cardiovascular diseases and preventive care.",
    certifications: ["Board Certified Cardiologist"],
    hospitalAffiliations: ["Apex Medical Center"]
  },
  patients: [],
  appointments: [],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### Appointment Data Structure
```javascript
const appointment = {
  id: "apt_789",
  patientId: "patient_123",
  doctorId: "doctor_456",
  date: "2024-01-15",
  time: "10:00",
  duration: 30, // minutes
  type: "online", // "online" or "in-person"
  status: "scheduled", // "scheduled", "completed", "cancelled", "rescheduled"
  reason: "Regular checkup",
  symptoms: "Chest pain and shortness of breath",
  notes: "Patient reports mild chest discomfort",
  prescription: {
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days"
      }
    ],
    instructions: "Take with food, monitor blood pressure"
  },
  testResults: [
    {
      testName: "Blood Pressure",
      result: "140/90",
      unit: "mmHg",
      normalRange: "<120/80",
      status: "abnormal",
      date: "2024-01-15"
    }
  ],
  files: [
    {
      id: "file_123",
      name: "blood_test_results.pdf",
      type: "application/pdf",
      size: 1024000,
      url: "/uploads/patient_123/blood_test_results.pdf",
      uploadedAt: "2024-01-15T10:30:00Z"
    }
  ],
  createdAt: "2024-01-10T00:00:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
}
```

### Doctor Data Structure (for OurDoctors page)
```javascript
const doctor = {
  id: 1,
  name: "Dr. Ayesha Malik",
  specialty: "Cardiologist",
  experience: "12 years",
  rating: 4.9,
  reviews: 234,
  image: "https://example.com/doctor-image.jpg",
  availability: {
    days: ["Mon", "Wed", "Fri"],
    start: "09:00",
    end: "17:00"
  },
  consultationFee: 150,
  languages: ["English", "Urdu"],
  education: "MD, Johns Hopkins University",
  bio: "Specialized in cardiovascular diseases and preventive care.",
  isAvailable: true, // Real-time availability status
  nextAvailableSlot: "2024-01-16T10:00:00Z"
}
```

## API Endpoints

### Authentication Endpoints
```javascript
// Login
POST /api/auth/login
Body: {
  email: string,
  password: string,
  userType: "patient" | "doctor"
}
Response: {
  success: boolean,
  token: string,
  user: UserData,
  expiresIn: number
}

// Logout
POST /api/auth/logout
Headers: { Authorization: "Bearer <token>" }
Response: { success: boolean }

// Refresh Token
POST /api/auth/refresh
Headers: { Authorization: "Bearer <token>" }
Response: {
  success: boolean,
  token: string,
  expiresIn: number
}
```

### User Management Endpoints
```javascript
// Get User Profile
GET /api/users/profile
Headers: { Authorization: "Bearer <token>" }
Response: { success: boolean, user: UserData }

// Update User Profile
PUT /api/users/profile
Headers: { Authorization: "Bearer <token>" }
Body: Partial<UserData>
Response: { success: boolean, user: UserData }

// Get All Doctors
GET /api/doctors
Query: {
  specialty?: string,
  search?: string,
  available?: boolean,
  page?: number,
  limit?: number
}
Response: {
  success: boolean,
  doctors: DoctorData[],
  total: number,
  page: number,
  limit: number
}
```

### Appointment Endpoints
```javascript
// Create Appointment
POST /api/appointments
Headers: { Authorization: "Bearer <token>" }
Body: {
  doctorId: string,
  date: string,
  time: string,
  type: "online" | "in-person",
  reason: string,
  symptoms?: string
}
Response: { success: boolean, appointment: AppointmentData }

// Get User Appointments
GET /api/appointments
Headers: { Authorization: "Bearer <token>" }
Query: {
  status?: string,
  page?: number,
  limit?: number
}
Response: {
  success: boolean,
  appointments: AppointmentData[],
  total: number
}

// Update Appointment
PUT /api/appointments/:id
Headers: { Authorization: "Bearer <token>" }
Body: Partial<AppointmentData>
Response: { success: boolean, appointment: AppointmentData }

// Cancel Appointment
DELETE /api/appointments/:id
Headers: { Authorization: "Bearer <token>" }
Response: { success: boolean }
```

### File Upload Endpoints
```javascript
// Upload File
POST /api/files/upload
Headers: { 
  Authorization: "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
Body: FormData with file
Response: {
  success: boolean,
  file: {
    id: string,
    name: string,
    url: string,
    size: number,
    type: string
  }
}

// Get User Files
GET /api/files
Headers: { Authorization: "Bearer <token>" }
Response: {
  success: boolean,
  files: FileData[]
}
```

## Component Integration

### ProtectedRoute Component
```javascript
// Current implementation checks localStorage
// Replace with API call to verify token
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }
        
        // API call to verify token
        const response = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('authToken')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    
    verifyAuth()
  }, [])
  
  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <Navigate to="/signin" />
  
  return children
}
```

### Doctor Availability Check
```javascript
// Replace mock availability check with real-time API
const checkDoctorAvailability = async (doctorId) => {
  try {
    const response = await fetch(`/api/doctors/${doctorId}/availability`)
    const data = await response.json()
    
    return data.availability // 'available', 'busy', 'unavailable'
  } catch (error) {
    console.error('Error checking availability:', error)
    return 'unavailable'
  }
}
```

## State Management

### Current State Structure
The application uses React's built-in state management. Consider migrating to Redux or Zustand for complex state management.

### Key State Variables
```javascript
// Authentication State
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)
const [userType, setUserType] = useState('patient')

// Appointment State
const [appointments, setAppointments] = useState([])
const [selectedAppointment, setSelectedAppointment] = useState(null)

// Doctor State
const [doctors, setDoctors] = useState([])
const [selectedDoctor, setSelectedDoctor] = useState(null)

// UI State
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

## File Uploads

### Current Implementation
The PatientLiveAppointment component has file upload functionality that needs backend integration.

### Required Backend Support
```javascript
// File upload endpoint
POST /api/files/upload
Content-Type: multipart/form-data

// File storage structure
/uploads/
  /patients/
    /{patientId}/
      /appointments/
        /{appointmentId}/
          /{filename}
  /doctors/
    /{doctorId}/
      /{filename}

// File types supported
const allowedFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const maxFileSize = 10 * 1024 * 1024 // 10MB
```

## Real-time Features

### Live Appointment Features
The application includes live appointment functionality that requires WebSocket or Server-Sent Events integration.

### Required Real-time Endpoints
```javascript
// WebSocket connection for live appointments
ws://localhost:3000/ws/appointment/{appointmentId}

// Events to handle
- appointment_started
- appointment_ended
- message_received
- file_uploaded
- prescription_updated
- test_result_added

// Example WebSocket integration
const useWebSocket = (appointmentId) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/ws/appointment/${appointmentId}`)
    
    ws.onopen = () => {
      console.log('WebSocket connected')
      setSocket(ws)
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages(prev => [...prev, data])
    }
    
    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setSocket(null)
    }
    
    return () => ws.close()
  }, [appointmentId])
  
  return { socket, messages }
}
```

## Environment Configuration

### Required Environment Variables
```javascript
// .env file
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_WS_URL=ws://localhost:3000/ws
REACT_APP_FILE_UPLOAD_URL=http://localhost:3000/api/files/upload
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png,gif,txt,doc,docx
```

### API Configuration
```javascript
// src/config/api.js
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// Add authentication header
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
```

## Error Handling

### API Error Response Format
```javascript
// Standard error response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}

// Common error codes
const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR'
}
```

### Frontend Error Handling
```javascript
// API utility function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...getAuthHeaders(),
        ...options.headers
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API call failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
```

## Testing

### API Testing Endpoints
```javascript
// Test data for development
const TEST_USERS = {
  patient: {
    email: 'patient@test.com',
    password: 'password123',
    userType: 'patient'
  },
  doctor: {
    email: 'doctor@test.com',
    password: 'password123',
    userType: 'doctor'
  }
}

// Test appointments
const TEST_APPOINTMENTS = [
  {
    id: 'test_apt_1',
    patientId: 'test_patient_1',
    doctorId: 'test_doctor_1',
    date: '2024-01-20',
    time: '10:00',
    type: 'online',
    status: 'scheduled'
  }
]
```

## Security Considerations

### Authentication Security
- Use JWT tokens with expiration
- Implement token refresh mechanism
- Store tokens securely (httpOnly cookies recommended)
- Validate tokens on every protected request

### Data Security
- Sanitize all user inputs
- Validate file uploads (type, size, content)
- Use HTTPS in production
- Implement rate limiting
- Log security events

### CORS Configuration
```javascript
// Backend CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
}
```

## Deployment

### Production Configuration
- Set up proper environment variables
- Configure HTTPS
- Set up file storage (AWS S3, Google Cloud Storage, etc.)
- Configure WebSocket server
- Set up monitoring and logging
- Implement backup strategies

### Docker Configuration
```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

This guide provides a comprehensive foundation for backend integration. Each section should be implemented according to your specific backend technology stack and requirements.
