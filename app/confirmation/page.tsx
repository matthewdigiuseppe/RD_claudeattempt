import Link from 'next/link'

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submission Complete!</h1>
          <p className="text-lg text-gray-600">
            Your transcript has been successfully submitted for analysis
          </p>
        </div>

        {/* What's Next Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive an email confirmation of your submission within the next few minutes
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analysis Process</h3>
                <p className="text-gray-600 text-sm">
                  Our team will analyze your transcript against public syllabi and assessment methods
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Receive Your Report</h3>
                <p className="text-gray-600 text-sm">
                  Within 3-5 business days, you'll receive your comprehensive verification report with QR code
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Features */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your report will include:</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Detailed AI-resistance analysis for each course
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Overall integrity score and credibility rating
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Unique verification QR code for employer scanning
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Shareable PDF report for your CV and LinkedIn
            </li>
          </ul>
        </div>

        {/* Important Notice */}
        <div className="border-l-4 border-blue-600 bg-blue-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Important:</strong> Check your email (including spam folder) for the confirmation message.
                If you don't receive it within 10 minutes, please contact support.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
          <a
            href="mailto:support@transcriptverify.com"
            className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
