import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add proper admin authentication check

    const { submissionId } = await req.json()

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const submission = await prisma.submission.update({
      where: {
        id: submissionId,
      },
      data: {
        analysisStatus: 'completed',
        analysisSentDate: new Date(),
      },
    })

    // TODO: Send email to user notifying them that analysis is complete

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Error marking submission as complete:', error)
    return NextResponse.json(
      { error: 'Failed to mark submission as complete' },
      { status: 500 }
    )
  }
}
