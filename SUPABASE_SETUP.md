# Supabase Setup Guide

This application uses Supabase for:
- **PostgreSQL Database** - Store users, submissions, and authentication data
- **Storage** - Secure file storage for transcript PDFs
- **Real-time capabilities** - Optional future enhancement

## Quick Setup (5 minutes)

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: `transcript-verification` (or your choice)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

### 2. Get Your Credentials

Once your project is ready:

#### Database Connection Strings

1. Go to **Project Settings** (gear icon) > **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

You'll need TWO connection strings:

**For DATABASE_URL (with connection pooling):**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

**For DIRECT_URL (direct connection):**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

#### API Keys

1. Go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role**: This is your `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

### 3. Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name it: `transcripts`
4. Select **Private** (not public)
5. Click "Create bucket"

#### Set Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies:

1. Click on the `transcripts` bucket
2. Go to "Policies" tab
3. Click "New Policy"

**Policy 1: Allow service role to upload**
```sql
CREATE POLICY "Service role can upload transcripts"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'transcripts');
```

**Policy 2: Allow service role to read**
```sql
CREATE POLICY "Service role can read transcripts"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'transcripts');
```

**Policy 3: Allow service role to delete**
```sql
CREATE POLICY "Service role can delete transcripts"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'transcripts');
```

You can add these policies through the Supabase SQL Editor:
1. Go to **SQL Editor**
2. Click "New query"
3. Paste all three policies (combined)
4. Click "Run"

### 4. Update Your .env File

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# ... other environment variables
```

### 5. Set Up Database Schema

Run Prisma migrations to create tables:

```bash
npx prisma generate
npx prisma db push
```

This will create:
- Users table
- Accounts table (for OAuth)
- Sessions table (for auth sessions)
- Submissions table
- Admin table
- Verification tokens table

### 6. Verify Setup

Check that everything is working:

1. **Database**: Run `npx prisma studio` - you should see your tables
2. **Storage**: In Supabase dashboard, check that `transcripts` bucket exists
3. **Connection**: Try starting the dev server: `npm run dev`

## Storage Bucket Configuration

### File Organization

Files are stored with this structure:
```
transcripts/
  ├── {userId}/
  │   ├── {userId}_{timestamp}_{university}.pdf
  │   ├── {userId}_{timestamp}_{university}.pdf
  │   └── ...
```

### File Size Limits

Default Supabase storage limits:
- **Free tier**: 1GB storage
- **Pro tier**: 100GB storage (can be increased)
- **Max file size**: 50MB (configurable)

To increase limits:
1. Go to **Settings** > **Billing**
2. Upgrade to Pro plan if needed
3. Go to **Storage** settings to configure limits

## Security Best Practices

### Database Security

1. **Enable Row Level Security (RLS)** on all tables:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on submissions table
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Add policies as needed
```

2. **Never expose service_role key** in client-side code
   - Only use `SUPABASE_SERVICE_ROLE_KEY` in server-side code
   - Use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client-side

### Storage Security

1. Keep transcripts bucket **private**
2. Use service role for all file operations
3. Never generate public URLs for sensitive files
4. Implement proper access checks before downloads

## Monitoring and Logs

### View Database Activity

1. Go to **Database** > **Logs**
2. Monitor queries and performance

### View Storage Activity

1. Go to **Storage** > **Logs**
2. Monitor uploads, downloads, and errors

### Set Up Alerts

1. Go to **Settings** > **Integrations**
2. Set up webhooks for:
   - Database errors
   - Storage quota warnings
   - Performance issues

## Backup and Recovery

### Automatic Backups

Supabase Pro includes:
- Daily backups (retained for 7 days)
- Point-in-time recovery

### Manual Backup

Export database:
```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or use pg_dump directly
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" > backup.sql
```

### Restore Database

```bash
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" < backup.sql
```

## Troubleshooting

### Connection Issues

**Error: "Connection pool timeout"**
- Solution: Make sure you're using `?pgbouncer=true&connection_limit=1` in DATABASE_URL

**Error: "SSL required"**
- Solution: Add `?sslmode=require` to your connection string

### Storage Issues

**Error: "Bucket not found"**
- Verify bucket name is exactly `transcripts`
- Check bucket was created in correct project

**Error: "Permission denied"**
- Check RLS policies are set correctly
- Verify you're using service_role key for server operations

### Migration Issues

**Error: "Direct connection required"**
- Make sure DIRECT_URL is set without `?pgbouncer=true`
- Use DIRECT_URL for migrations only

## Cost Estimation

### Free Tier Includes:
- 500MB database space
- 1GB storage
- 2GB bandwidth
- 50,000 monthly active users

### Typical Usage:
- Each transcript: ~500KB - 2MB
- **Free tier**: ~500-1000 transcripts
- **Pro tier ($25/mo)**: Unlimited transcripts (within 100GB)

## Migration from Local Storage

If you have existing files in `/uploads`:

```bash
# Use Supabase CLI to bulk upload
supabase storage cp ./uploads/* transcripts/migration/
```

Or use the migration script (create `scripts/migrate-to-supabase.ts`):

```typescript
// Example migration script
import { getSupabaseAdmin } from '../lib/supabase'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

async function migrate() {
  const supabase = getSupabaseAdmin()
  const files = await readdir('./uploads')

  for (const file of files) {
    if (file.endsWith('.pdf')) {
      const filePath = join('./uploads', file)
      const fileBuffer = await readFile(filePath)

      const { error } = await supabase.storage
        .from('transcripts')
        .upload(`migration/${file}`, fileBuffer, {
          contentType: 'application/pdf'
        })

      if (error) console.error(`Failed to upload ${file}:`, error)
      else console.log(`Uploaded ${file}`)
    }
  }
}

migrate()
```

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure storage bucket
3. ✅ Update environment variables
4. ✅ Run database migrations
5. ✅ Test file upload and download
6. 📧 Set up email notifications (optional)
7. 📊 Configure monitoring and alerts
8. 🔐 Review and harden security policies

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Community**: https://github.com/supabase/supabase/discussions
- **Status**: https://status.supabase.com
