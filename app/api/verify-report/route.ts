import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { verificationCode } = await req.json()

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Verification code is required' },
        { status: 400 }
      )
    }

    // Find the submission by verification code
    const submission = await prisma.submission.findUnique({
      where: {
        verificationCode: verificationCode,
      },
      include: {
        user: true,
      },
    })

    if (!submission) {
      return NextResponse.json(
        { error: 'Invalid verification code. No report found.' },
        { status: 404 }
      )
    }

    // Return submission details (excluding sensitive info)
    return NextResponse.json({
      fullName: submission.user.fullName,
      university: submission.university,
      graduationYear: submission.graduationYear,
      submissionDate: submission.submissionDate,
      analysisStatus: submission.analysisStatus,
      analysisSentDate: submission.analysisSentDate,
      verificationCode: submission.verificationCode,
    })
  } catch (error) {
    console.error('Error verifying report:', error)
    return NextResponse.json(
      { error: 'Failed to verify report' },
      { status: 500 }
    )
  }
}
