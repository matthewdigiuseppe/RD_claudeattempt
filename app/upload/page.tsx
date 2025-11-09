'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function UploadPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: 'Texas A&M University - College Station',
    graduationYear: new Date().getFullYear(),
  })
  const [file, setFile] = useState<File | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin?callbackUrl=/upload')
      } else {
        setUser(user)
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          fullName: user.user_metadata?.full_name || '',
        }))
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file')
        return
      }
      if (selectedFile.size > 25 * 1024 * 1024) {
        setError('File size must be less than 25MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    setError('')

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          university: formData.university,
          graduationYear: formData.graduationYear,
        }),
      })

      const { sessionId, url } = await response.json()

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        setError('Failed to create checkout session')
      }
    } catch (err) {
      setError('Failed to initiate payment. Please try again.')
    } finally {
      setPaymentLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="john.doe@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University *
        </label>
        <select
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Texas A&M University - College Station">
            Texas A&M University - College Station
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Graduation Year *
        </label>
        <select
          name="graduationYear"
          value={formData.graduationYear}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Array.from({ length: 11 }, (_, i) => 2015 + i).map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Continue to Payment
      </button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Transcript Analysis</span>
            <span className="font-semibold">$29.99</span>
          </div>
          <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">$29.99</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold mb-2">What you'll receive:</p>
        <ul className="space-y-1 ml-4">
          <li>• Comprehensive AI-resistance analysis</li>
          <li>• Unique verification QR code</li>
          <li>• Shareable digital report</li>
          <li>• Employer-accessible verification</li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={paymentLoading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {paymentLoading ? 'Processing...' : 'Pay $29.99'}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Secure payment processing by Stripe
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Your Transcript
          </h1>
          <p className="text-gray-600">
            Complete your information and payment to receive your verification report
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Information</span>
            </div>
            <div className="w-12 h-1 bg-gray-200"></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
        </div>
      </div>
    </div>
  )
}
