import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-900 tracking-tight">TranscriptVerify</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/verify" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Employer Verification
              </Link>
              <Link
                href="/auth/signin"
                className="bg-gray-900 text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-800 transition"
              >
                Get Verified
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional Academic Credential Verification
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Verify Academic Integrity<br />
              <span className="text-gray-600">in the AI Era</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Differentiate yourself in the job market with third-party verification of your academic credentials.
              Demonstrate that your coursework represents genuine learning, not AI-assisted shortcuts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signin"
                className="bg-gray-900 text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition w-full sm:w-auto"
              >
                Get Your Verification Report
              </Link>
              <span className="text-gray-500 text-sm">One-time fee: $29.99</span>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Bank-level encryption
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                3-5 business days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Verification Process
            </h2>
            <p className="text-lg text-gray-600">
              Our systematic approach ensures comprehensive analysis of your academic credentials
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-3">STEP 01</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Submit Transcript</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Securely upload your official university transcript through our encrypted platform
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-3">STEP 02</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Syllabus Analysis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cross-reference coursework against publicly available syllabi and assessment methods
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-3">STEP 03</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Generate Report</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive comprehensive verification report with unique QR code identifier
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-3">STEP 04</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Share Credentials</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add verification to resume, LinkedIn, or share directly with prospective employers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                The Value Proposition
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                In an era where AI tools can complete assignments, employers need verifiable proof
                that academic credentials represent genuine learning and skill development.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-gray-900 pl-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">For Graduates</h3>
                  <p className="text-gray-600">Stand apart from candidates with unverified credentials. Demonstrate intellectual rigor and authentic learning outcomes to prospective employers.</p>
                </div>
                <div className="border-l-2 border-gray-900 pl-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">For Employers</h3>
                  <p className="text-gray-600">Make data-driven hiring decisions with third-party verification of academic integrity and coursework quality.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Verification Report Includes</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Comprehensive coursework analysis</p>
                    <p className="text-sm text-gray-600">Detailed assessment of course rigor and evaluation methods</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Unique verification QR code</p>
                    <p className="text-sm text-gray-600">Instant employer verification via secure portal</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Shareable digital credential</p>
                    <p className="text-sm text-gray-600">Add to LinkedIn, resume, or professional portfolio</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Lifetime verification access</p>
                    <p className="text-sm text-gray-600">One-time fee for permanent credential verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Verification */}
      <section className="bg-gray-50 py-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Employer Verification Portal
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Instantly verify candidate credentials by scanning their QR code or entering their unique verification identifier.
            All verifications are secure, encrypted, and accessible in real-time.
          </p>
          <Link
            href="/verify"
            className="inline-block bg-gray-900 text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition"
          >
            Access Verification Portal
          </Link>
          <p className="text-sm text-gray-500 mt-6">No account required • Instant verification results</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 tracking-tight">TranscriptVerify</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Third-party academic credential verification service for the modern workforce.
                Ensuring authentic learning outcomes in an AI-enabled world.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm text-gray-300">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/auth/signin" className="text-gray-400 hover:text-white transition">Credential Verification</Link></li>
                <li><Link href="/verify" className="text-gray-400 hover:text-white transition">Employer Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm text-gray-300">Support</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-400">support@transcriptverify.com</li>
                <li className="text-gray-400">M-F 9AM-5PM EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2025 TranscriptVerify. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-gray-300 transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-300 transition cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
