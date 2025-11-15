import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { getSupabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const formDataJson = formData.get('formData') as string

    if (!file || !formDataJson) {
      return NextResponse.json(
        { error: 'Missing file or form data' },
        { status: 400 }
      )
    }

    const metadata = JSON.parse(formDataJson)

    // Upload to Supabase Storage
    const supabaseAdmin = getSupabaseAdmin()
    const timestamp = Date.now()
    const sanitizedUniversity = metadata.university.replace(/[^a-z0-9]/gi, '_')
    const fileName = `${user.id}_${timestamp}_${sanitizedUniversity}.pdf`
    const filePath = `${user.id}/${fileName}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading to Supabase:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      )
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user's full name if provided
    if (metadata.fullName && metadata.fullName !== dbUser.fullName) {
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { fullName: metadata.fullName },
      })
    }

    // Create submission record with TEST payment status
    const submission = await prisma.submission.create({
      data: {
        userId: dbUser.id,
        university: metadata.university,
        graduationYear: parseInt(metadata.graduationYear),
        transcriptFilePath: filePath,
        paymentId: 'test_mode_' + timestamp,
        paymentStatus: 'test',
      },
    })

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      verificationCode: submission.verificationCode,
    })
  } catch (error) {
    console.error('Error uploading transcript:', error)
    return NextResponse.json(
      { error: 'Failed to upload transcript' },
      { status: 500 }
    )
  }
}
