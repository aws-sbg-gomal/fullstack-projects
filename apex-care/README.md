# Apex Care - Smart Healthcare Platform

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.0+-purple.svg)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **A comprehensive healthcare platform connecting doctors and patients through IoT technology, remote consultations, and digital health tracking.**

## Overview

Apex Care is a modern, responsive healthcare platform that revolutionizes the way patients and doctors interact. Built with cutting-edge web technologies, it provides seamless appointment booking, live video consultations, health monitoring, and comprehensive patient management.

### Key Features

- **Secure Authentication** - Role-based access for patients and doctors
- **Smart Appointment Booking** - Multi-step booking with real-time availability
- **Live Video Consultations** - Integrated video calling with chat and file sharing
- **Doctor Directory** - Comprehensive doctor profiles with specialties and ratings
- **Health Tracking** - IoT device integration for real-time health monitoring
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Theme** - Modern glassmorphism design with smooth animations
- **Protected Routes** - Secure access to patient and doctor dashboards

## Quick Start

### Prerequisites

- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/apex-care.git
   cd apex-care
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Project Structure

```
apex-care/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Main navigation component
│   │   ├── ProtectedRoute.jsx # Authentication wrapper
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── SignIn.jsx     # User authentication
│   │   ├── DoctorDashboard.jsx # Doctor interface
│   │   ├── PatientPage.jsx # Patient interface
│   │   └── ...
│   ├── docs/              # Documentation
│   │   └── API_INTEGRATION_GUIDE.md
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── README.md              # This file
└── package.json           # Dependencies and scripts
```

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **React Router** - Declarative routing for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Styling & Design
- **Glassmorphism** - Modern glass-like UI design
- **Dark Theme** - Professional dark color scheme
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Enhanced user experience

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control

## Features Overview

### Landing Page
- **Hero Section** - Compelling value proposition with animated elements
- **About Section** - Platform overview and mission
- **Contact Form** - User inquiry system with validation
- **Responsive Navigation** - Smooth scrolling and section highlighting

### Authentication System
- **Dual Role Support** - Separate interfaces for patients and doctors
- **Secure Login** - Email/password authentication
- **Session Management** - Persistent login with token-based auth
- **Protected Routes** - Role-based access control

### Doctor Dashboard
- **Appointment Management** - View and manage patient appointments
- **Live Consultations** - Video calling with patient information
- **Patient Records** - Access to medical history and notes
- **Prescription Management** - Digital prescription system
- **Real-time Updates** - Live appointment status tracking

### Patient Dashboard
- **Appointment Booking** - Multi-step booking process
- **Health Tracking** - IoT device integration
- **Medical History** - Comprehensive health records
- **Live Consultations** - Video calling with doctors
- **File Management** - Upload and view medical documents

### Appointment System
- **Smart Booking** - Real-time availability checking
- **Doctor Selection** - Search and filter by specialty
- **Time Slot Management** - Flexible scheduling system
- **Appointment Types** - Online and in-person consultations
- **Status Tracking** - Real-time appointment updates

## Design System

### Color Palette
- **Primary Blue**: `#2563EB` - Trust and professionalism
- **Accent Teal**: `#14B8A6` - Health and vitality
- **Background**: `#0F172A` - Deep, calming dark
- **Surface**: `#1E293B` - Elevated elements
- **Text Primary**: `#F8FAFC` - High contrast text
- **Text Secondary**: `#94A3B8` - Supporting text

### Typography
- **Font Family**: Inter - Modern, readable sans-serif
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Responsive Sizing**: Fluid typography scaling

### Components
- **Glassmorphism Cards** - Translucent elements with backdrop blur
- **Gradient Buttons** - Eye-catching call-to-action elements
- **Smooth Animations** - Framer Motion powered transitions
- **Hover Effects** - Interactive feedback for better UX

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws

# File Upload
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png,gif,txt,doc,docx
```

## Backend Integration

This frontend is designed to work with a RESTful API backend. For detailed integration instructions, see:

**[API Integration Guide](src/docs/API_INTEGRATION_GUIDE.md)**

### Key Integration Points

- **Authentication**: JWT token-based authentication
- **Real-time Features**: WebSocket integration for live consultations
- **File Uploads**: Secure file handling for medical documents
- **Data Management**: CRUD operations for appointments and user data

## Deployment

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Vercel** - Recommended for React applications
- **Netlify** - Great for static site hosting
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **Docker** - Containerized deployment

### Environment Setup

1. Set up your backend API
2. Configure environment variables
3. Update API endpoints in the codebase
4. Deploy to your chosen platform

## Contributing

We welcome contributions to Apex Care! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Follow the existing code style and patterns
- Add comments for complex logic
- Ensure responsive design principles
- Test on multiple devices and browsers
- Update documentation as needed

## Roadmap

### Phase 1 - Core Features
- [x] User authentication and authorization
- [x] Appointment booking system
- [x] Doctor and patient dashboards
- [x] Basic video consultation interface

### Phase 2 - Enhanced Features
- [ ] IoT device integration
- [ ] Advanced health monitoring
- [ ] AI-powered health insights
- [ ] Mobile application

### Phase 3 - Advanced Features
- [ ] Telemedicine compliance
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Integration with hospital systems

## Bug Reports

Found a bug? Please report it using our [issue template](.github/ISSUE_TEMPLATE/bug_report.md).

## Feature Requests

Have an idea for a new feature? We'd love to hear it! Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

- **Frontend Development** - React, Tailwind CSS, Framer Motion
- **UI/UX Design** - Modern healthcare interface design
- **Backend Integration** - API development and database design

## Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons
- **Healthcare Community** - For inspiration and feedback

## Support

- **Email**: support@apexcare.com
- **Documentation**: [API Integration Guide](src/docs/API_INTEGRATION_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/apex-care/issues)

---

<div align="center">

**Made with care for better healthcare**

[Website](https://apexcare.com) • [Documentation](src/docs/API_INTEGRATION_GUIDE.md) • [Report Bug](https://github.com/your-username/apex-care/issues) • [Request Feature](https://github.com/your-username/apex-care/issues)

</div>