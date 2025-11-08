import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { downloadTranscript } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add proper admin authentication check

    const { id } = await params
    const submission = await prisma.submission.findUnique({
      where: {
        id: id,
      },
    })

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    // Download from Supabase Storage
    const { data: fileBlob, error: downloadError } = await downloadTranscript(
      submission.transcriptFilePath
    )

    if (downloadError || !fileBlob) {
      console.error('Error downloading from Supabase:', downloadError)
      return NextResponse.json(
        { error: 'Failed to download transcript' },
        { status: 500 }
      )
    }

    // Convert Blob to ArrayBuffer
    const arrayBuffer = await fileBlob.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="transcript_${id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error downloading transcript:', error)
    return NextResponse.json(
      { error: 'Failed to download transcript' },
      { status: 500 }
    )
  }
}
