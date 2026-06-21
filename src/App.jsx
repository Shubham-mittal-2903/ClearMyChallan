import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import SubmitCase from './components/SubmitCase.jsx'
import Pricing from './components/Pricing.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Stats from './components/Stats.jsx'
import DataSafety from './components/DataSafety.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import AdvocateContact from './components/AdvocateContact.jsx'
import Legal from './components/Legal.jsx'
import Footer from './components/Footer.jsx'
import FloatingSupport from './components/FloatingSupport.jsx'
import BackgroundOrbs from './components/ui/BackgroundOrbs.jsx'

import TrackCase from './pages/TrackCase.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminCaseDetail from './pages/AdminCaseDetail.jsx'

// ---- Public home -----------------------------------------------------
// Manual-upload flow is the primary path. ChallanSearch/ChallanResults
// (vehicle-number lookup) is removed per the user's "replace" decision.
function PublicHome() {
  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <SubmitCase />
        <Pricing />
        <WhyChooseUs />
        <HowItWorks />
        <Stats />
        <DataSafety />
        <Testimonials />
        <FAQ />
        <AdvocateContact />
        <Legal />
      </main>
      <Footer />
      <FloatingSupport />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/track" element={<TrackCase />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cases/:id"
            element={
              <ProtectedRoute>
                <AdminCaseDetail />
              </ProtectedRoute>
            }
          />

          {/* Fallback: anything else → public home */}
          <Route path="*" element={<PublicHome />} />
        </Routes>

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#111827',
              border: '1px solid #E5E7EB',
              borderRadius: '14px',
              boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)',
              fontSize: '14px'
            },
            success: { iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' } },
            error: { iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' } }
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  )
}
