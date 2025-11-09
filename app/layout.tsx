import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'REALdegrees - Verify Your AI-Proof Degree',
  description: 'Providing human solutions for the AI crisis in education. Verify your AI-resistant credentials and stand out to employers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
