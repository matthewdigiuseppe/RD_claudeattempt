import Link from 'next/link'

// Force rebuild to clear Vercel build cache
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600">Transcript</span>
                <span className="text-gray-800">Verify</span>
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition font-medium">
                How It Works
              </Link>
              <Link href="#benefits" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Benefits
              </Link>
              <Link href="/verify" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Verify Report
              </Link>
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-gradient text-white py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <svg className="w-5 h-5 mr-2 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold text-sm">Professional Academic Credential Verification</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Verify Academic Integrity in the AI Era
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Stand out to employers by proving your coursework was resistant to AI-assisted shortcuts.
              Get a verified report with a QR code that demonstrates authentic learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signin"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition shadow-2xl w-full sm:w-auto"
              >
                Get Your Verification Report
              </Link>
              <span className="text-blue-100 font-medium">One-time fee: $29.99</span>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Bank-level encryption
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                3-5 business days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Our systematic approach ensures comprehensive analysis of your academic credentials
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1',
                title: 'Submit Transcript',
                description: 'Securely upload your official university transcript through our encrypted platform',
                icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              },
              {
                number: '2',
                title: 'AI Resistance Analysis',
                description: 'We analyze your coursework against public syllabi for AI-resistant assessment methods',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                number: '3',
                title: 'Generate Report',
                description: 'Receive a comprehensive verification report with unique QR code identifier',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              },
              {
                number: '4',
                title: 'Share with Employers',
                description: 'Add verification to your resume, LinkedIn, or share directly with hiring managers',
                icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
                <div className="w-14 h-14 bg-blue-card-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                  </svg>
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.number}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Verification Matters</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                In an era where AI tools can complete assignments, employers need verifiable proof that academic
                credentials represent genuine learning and skill development.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'For Graduates',
                    description: 'Stand apart from candidates with unverified credentials. Demonstrate intellectual rigor and authentic learning outcomes.',
                    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  },
                  {
                    title: 'For Employers',
                    description: 'Make data-driven hiring decisions with third-party verification of academic integrity and coursework quality.',
                    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-600 transition">
                      <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-gradient-light rounded-3xl p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Verification Report Includes</h3>
              <div className="space-y-5">
                {[
                  { text: 'Comprehensive coursework analysis', sub: 'Detailed assessment of course rigor and methods' },
                  { text: 'Unique verification QR code', sub: 'Instant employer verification via secure portal' },
                  { text: 'Shareable digital credential', sub: 'Add to LinkedIn, resume, or portfolio' },
                  { text: 'Lifetime verification access', sub: 'One-time fee for permanent credentials' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.text}</p>
                      <p className="text-sm text-gray-600">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="py-24 bg-gray-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Employer Verification Portal</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Instantly verify candidate credentials by scanning their QR code or entering their unique verification ID.
            All verifications are secure, encrypted, and accessible in real-time.
          </p>
          <Link
            href="/verify"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-2xl"
          >
            Access Verification Portal
          </Link>
          <p className="text-sm text-gray-400 mt-6">No account required • Instant results</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-blue-400">Transcript</span>
                <span>Verify</span>
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Third-party academic credential verification service for the modern workforce.
                Ensuring authentic learning outcomes in an AI-enabled world.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/auth/signin" className="text-gray-400 hover:text-blue-400 transition">Credential Verification</Link></li>
                <li><Link href="/verify" className="text-gray-400 hover:text-blue-400 transition">Employer Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-3">
                <li className="text-gray-400">support@transcriptverify.com</li>
                <li className="text-gray-400">Monday-Friday 9AM-5PM EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 TranscriptVerify. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-blue-400 transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-blue-400 transition cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
