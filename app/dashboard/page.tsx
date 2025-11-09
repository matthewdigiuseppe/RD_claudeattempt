'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-indigo-600">REAL</span>
                <span className="text-gray-900 font-normal lowercase">degrees</span>
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {session?.user?.email}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
          </h2>
          <p className="text-xl text-gray-600">
            Ready to verify your AI-proof degree? Let's get started.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Transcript Card */}
          <Link
            href="/upload"
            className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300 p-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
              Upload Transcript
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Submit your official transcript for AI-resistance analysis and get your verification report.
            </p>
            <div className="mt-6 inline-flex items-center text-indigo-600 font-semibold">
              Get Started
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Verify Report Card */}
          <Link
            href="/verify"
            className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300 p-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
              Verify a Report
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Check the authenticity of a verification report using a QR code or verification ID.
            </p>
            <div className="mt-6 inline-flex items-center text-indigo-600 font-semibold">
              Verify Now
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload</h4>
              <p className="text-gray-600 text-sm">
                Submit your official transcript and complete payment ($29.99 one-time)
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analysis</h4>
              <p className="text-gray-600 text-sm">
                We analyze your coursework against syllabi for AI-resistant assessments
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Verify & Share</h4>
              <p className="text-gray-600 text-sm">
                Receive your report with QR code to share with employers
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
