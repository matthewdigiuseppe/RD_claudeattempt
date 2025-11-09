'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/verify-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to verify report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-indigo-600">REAL</span>
              <span className="text-gray-900 font-normal lowercase">degrees</span>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Verify Academic Report
            </h1>
            <p className="text-lg text-gray-600">
              Enter the verification code to view the authenticated transcript analysis
            </p>
          </div>

          {/* Verification Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 mb-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="verification-code" className="block text-sm font-semibold text-gray-900 mb-2">
                  Verification Code
                </label>
                <input
                  id="verification-code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-lg"
                />
                <p className="mt-2 text-sm text-gray-600">
                  The verification code can be found on the candidate's report or by scanning their QR code
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !verificationCode}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Verifying...' : 'Verify Report'}
              </button>
            </form>
          </div>

          {/* Verification Result */}
          {result && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Report Verified</h2>
                  <p className="text-gray-600">This is an authentic transcript analysis report</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Student Name:</dt>
                    <dd className="font-semibold text-gray-900">{result.fullName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">University:</dt>
                    <dd className="font-semibold text-gray-900">{result.university}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Graduation Year:</dt>
                    <dd className="font-semibold text-gray-900">{result.graduationYear}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Submission Date:</dt>
                    <dd className="font-semibold text-gray-900">
                      {new Date(result.submissionDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Analysis Status:</dt>
                    <dd className="font-semibold">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        result.analysisStatus === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.analysisStatus === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </dd>
                  </div>
                  {result.analysisSentDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Report Sent:</dt>
                      <dd className="font-semibold text-gray-900">
                        {new Date(result.analysisSentDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {result.analysisStatus === 'pending' && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> The analysis for this transcript is still in progress.
                    The full report will be available once the analysis is completed.
                  </p>
                </div>
              )}

              <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-900">
                  This report has been verified as authentic. The verification code matches our records and
                  confirms that this transcript analysis was conducted by REALdegrees.
                </p>
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <h3 className="font-bold text-xl text-gray-900 mb-6">For Employers</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Each verification code is unique and tied to a specific student's transcript analysis</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Reports analyze the AI-resistance of assessment methods used in the student's courses</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified reports provide third-party assurance of academic integrity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
