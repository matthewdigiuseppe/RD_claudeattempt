import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900">REAL</span>
                <span className="text-gray-900 font-normal lowercase">degrees</span>
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-700 hover:text-gray-900 transition font-medium">
                Services
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-gray-900 transition font-medium">
                About
              </Link>
              <Link href="/verify" className="text-gray-700 hover:text-gray-900 transition font-medium">
                Verify Report
              </Link>
              <Link
                href="/auth/signin"
                className="bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Verify Your AI-Proof Degree
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Stand out to employers by proving your coursework was resistant to AI-assisted shortcuts.
              Get a verified credential that demonstrates authentic learning and academic integrity.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded font-semibold text-lg hover:bg-gray-800 transition"
            >
              Get Your Verification
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Our systematic approach ensures comprehensive verification of your AI-resistant credentials
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Submit Transcript',
                description: 'Securely upload your official university transcript through our encrypted platform',
                icon: 'fa-upload'
              },
              {
                title: 'AI Resistance Analysis',
                description: 'We analyze your coursework against public syllabi for AI-resistant assessment methods',
                icon: 'fa-shield-alt'
              },
              {
                title: 'Generate Report',
                description: 'Receive a comprehensive verification report with unique QR code identifier',
                icon: 'fa-file-alt'
              },
              {
                title: 'Share with Employers',
                description: 'Add verification to your resume, LinkedIn, or share directly with hiring managers',
                icon: 'fa-share-nodes'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded border border-gray-200 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${step.icon} text-2xl text-gray-700`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Verification Matters</h2>
            <p className="text-xl text-gray-600">
              Creating a common benchmark to assess the true value of your college degree
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In an era where AI tools can complete assignments, employers need verifiable proof that academic
                credentials represent genuine learning and skill development. Traditional degrees no longer provide
                the clear signal of competence they once did.
              </p>
              <p>
                <strong>Our goal is to create "a common benchmark"</strong> so students, parents, employers and educators can
                accurately assess the true value of a college degree. By verifying that your coursework was resistant to
                AI shortcuts, we help you stand out in the job market.
              </p>
              <p>
                Your verification report provides third-party confirmation that your degree represents authentic intellectual
                engagement, critical thinking, and problem-solving skills—the real human capital that employers are seeking.
              </p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check text-gray-900 mt-1 mr-3"></i>
                    <span>Comprehensive coursework analysis</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-gray-900 mt-1 mr-3"></i>
                    <span>Unique verification QR code</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-gray-900 mt-1 mr-3"></i>
                    <span>Shareable digital credential</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-gray-900 mt-1 mr-3"></i>
                    <span>Lifetime verification access</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">One-Time Investment</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$29.99</div>
                <p className="text-gray-600 mb-6">Permanent verification credential</p>
                <Link
                  href="/auth/signin"
                  className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">For Employers</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Verify candidate credentials instantly by scanning their QR code or entering their unique verification ID.
          </p>
          <Link
            href="/verify"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-medium hover:bg-gray-100 transition"
          >
            Verify a Credential
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-3">
                <span className="text-gray-900">REAL</span>
                <span className="text-gray-900 font-normal lowercase">degrees</span>
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Providing human solutions for the AI crisis in education.
                Verifying AI-proof degrees for the modern workforce.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="text-gray-600 hover:text-gray-900 transition">Services</Link></li>
                <li><Link href="#about" className="text-gray-600 hover:text-gray-900 transition">About</Link></li>
                <li><Link href="/verify" className="text-gray-600 hover:text-gray-900 transition">Verify Report</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-600">admin@realdegrees.ai</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2025 REALdegrees, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
