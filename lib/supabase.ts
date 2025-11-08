import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (with service role key for admin operations)
export const getSupabaseAdmin = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Storage helpers
export const STORAGE_BUCKET = 'transcripts'

export async function uploadTranscript(
  file: File,
  userId: string,
  timestamp: number,
  university: string
): Promise<{ path: string; error: any }> {
  const supabaseAdmin = getSupabaseAdmin()

  const sanitizedUniversity = university.replace(/[^a-z0-9]/gi, '_')
  const fileName = `${userId}_${timestamp}_${sanitizedUniversity}.pdf`
  const filePath = `${userId}/${fileName}`

  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType: 'application/pdf',
      upsert: false
    })

  if (error) {
    return { path: '', error }
  }

  return { path: data.path, error: null }
}

export async function downloadTranscript(
  filePath: string
): Promise<{ data: Blob | null; error: any }> {
  const supabaseAdmin = getSupabaseAdmin()

  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .download(filePath)

  return { data, error }
}

export async function getTranscriptPublicUrl(filePath: string): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin()

  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath)

  return data.publicUrl
}

export async function deleteTranscript(filePath: string): Promise<{ error: any }> {
  const supabaseAdmin = getSupabaseAdmin()

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .remove([filePath])

  return { error }
}
