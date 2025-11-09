# Deployment Guide - Vercel

This guide will help you deploy your Transcript Verification Platform to production using Vercel (recommended) or other hosting platforms.

## Why Vercel?

- **Built by Next.js creators**: Perfect integration
- **Automatic deployments**: Push to GitHub = automatic deploy
- **Serverless functions**: API routes work out of the box
- **Free tier**: Generous limits for starting out
- **Global CDN**: Fast worldwide performance
- **Zero configuration**: Works with Next.js automatically

## Prerequisites

Before deploying:

✅ GitHub repository with your code
✅ Supabase project set up (database + storage)
✅ Google OAuth credentials (with production URLs)
✅ Stripe account (can use test mode initially)
✅ All environment variables ready

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
# Check your current branch
git branch

# Push to GitHub
git push origin claude/transcript-analysis-platform-011CUuxS2MMyr1mkoyxgvosw
```

### 2. Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 3. Import Your Project

1. Click "Add New" → "Project"
2. Find your repository: `matthewdigiuseppe/RD_claudeattempt`
3. Click "Import"
4. **Important**: Configure the build settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 4. Configure Environment Variables

Click "Environment Variables" and add ALL of these:

#### Database (Supabase)
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

#### Supabase API
```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### NextAuth
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-new-secret-with-openssl-rand-base64-32
```

**⚠️ Important**: Generate a NEW `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

#### Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**⚠️ Important**: Update Google OAuth settings:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your OAuth client
3. Add to "Authorized redirect URIs":
   - `https://your-domain.vercel.app/api/auth/callback/google`

#### Apple OAuth (Optional)
```
APPLE_CLIENT_ID=your-apple-client-id
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY=your-apple-private-key
```

**Note**: Apple Sign In requires HTTPS and custom domain configuration.

#### Stripe
```
STRIPE_SECRET_KEY=sk_test_or_sk_live_your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_or_pk_live_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

**For Production**: Switch to live mode keys when ready.

### 5. Deploy!

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://your-project.vercel.app`

## Post-Deployment Configuration

### 1. Set Up Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy: Settings → Deployments → [Latest] → Redeploy

### 2. Update OAuth Redirect URIs

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", add:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
5. Click "Save"

#### Apple OAuth (if using)
1. Go to [Apple Developer](https://developer.apple.com/account)
2. Certificates, Identifiers & Profiles → Identifiers
3. Select your Services ID
4. Configure "Sign in with Apple"
5. Update Return URLs:
   ```
   https://your-domain.vercel.app/api/auth/callback/apple
   ```

### 3. Update NEXTAUTH_URL

After deployment, update the environment variable:

1. In Vercel dashboard, go to Settings → Environment Variables
2. Find `NEXTAUTH_URL`
3. Update to your actual domain: `https://your-domain.vercel.app`
4. Redeploy the application

### 4. Verify Database Connection

Check that Prisma can connect:

1. Go to Vercel dashboard → Deployments → [Latest] → Logs
2. Look for database connection messages
3. Should see successful Prisma client initialization

### 5. Test Supabase Storage

1. Sign in to your deployed app
2. Try uploading a test transcript
3. Check Supabase dashboard → Storage → transcripts bucket
4. Verify file was uploaded

## Custom Domain (Optional)

### 1. Add Custom Domain in Vercel

1. Go to your project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `transcriptverify.com`)
4. Follow Vercel's instructions to configure DNS

### 2. Update Environment Variables

1. Update `NEXTAUTH_URL` to your custom domain
2. Update OAuth redirect URIs
3. Update Stripe webhook URL
4. Redeploy

### 3. SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. Your site will be HTTPS by default.

## Monitoring and Maintenance

### 1. View Deployment Logs

Vercel Dashboard → Deployments → [Select Deployment] → Logs

### 2. Monitor Performance

Vercel Dashboard → Analytics (available on Pro plan)

### 3. Set Up Alerts

1. Go to Settings → Integrations
2. Connect Slack, Discord, or email for deployment notifications

### 4. Database Monitoring

Check Supabase Dashboard:
- Database → Logs
- Storage → Usage
- API → Logs

## Automatic Deployments

Vercel automatically deploys when you push to your branch:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin claude/transcript-analysis-platform-011CUuxS2MMyr1mkoyxgvosw

# Vercel automatically deploys!
```

### Preview Deployments

Every push creates a preview deployment with a unique URL for testing.

### Production Deployment

Once ready, merge to your main branch for production deployment:

```bash
# Create PR from your branch
# After review, merge to main
# Vercel deploys to production automatically
```

## Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"
```bash
# Solution: Ensure postinstall script runs
# In package.json, check:
"scripts": {
  "postinstall": "prisma generate"
}
```

**Error**: "Environment variable not found"
- Check all env vars are set in Vercel dashboard
- Redeploy after adding variables

### Database Connection Issues

**Error**: "Connection pool timeout"
- Verify DATABASE_URL has `?pgbouncer=true&connection_limit=1`
- Check Supabase project is running
- Verify password is correct (no special URL encoding needed)

### OAuth Not Working

**Error**: "Redirect URI mismatch"
- Verify redirect URIs match exactly in OAuth provider settings
- Include both http://localhost:3000 (dev) and production URL
- Clear browser cache and try again

### File Upload Fails

**Error**: "Storage bucket not found"
- Verify `transcripts` bucket exists in Supabase
- Check bucket is set to private
- Verify RLS policies are configured

### Stripe Webhook Issues

**Error**: "Webhook signature verification failed"
- Verify webhook secret matches Vercel env var
- Check endpoint URL is correct
- Ensure webhook is sent from same Stripe account

## Performance Optimization

### 1. Enable Edge Caching

Add to `next.config.js`:
```javascript
experimental: {
  optimizeCss: true,
}
```

### 2. Image Optimization

Next.js automatically optimizes images. Use `next/image`:
```jsx
import Image from 'next/image'
```

### 3. Database Connection Pooling

Already configured with Supabase pgbouncer.

### 4. Monitor Bundle Size

```bash
# Analyze bundle
npm run build
# Check .next/analyze output
```

## Security Checklist

Before going live:

- [ ] Generate new NEXTAUTH_SECRET for production
- [ ] Use production Stripe keys (not test keys)
- [ ] Enable Stripe webhook signature verification
- [ ] Set up Supabase Row Level Security policies
- [ ] Review OAuth scopes (request minimum needed)
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Set secure headers in next.config.js
- [ ] Implement rate limiting on sensitive endpoints
- [ ] Review admin dashboard access controls
- [ ] Set up monitoring and alerts

## Cost Estimation

### Vercel
- **Hobby (Free)**: Perfect for starting
  - 100 GB bandwidth/month
  - Serverless function execution
  - Automatic HTTPS
  - Custom domains

- **Pro ($20/month)**: For growth
  - 1 TB bandwidth
  - Analytics
  - Password protection
  - 100 GB-hours

### Supabase
- **Free**: $0/month
  - 500 MB database
  - 1 GB storage
  - Good for ~500-1000 transcripts

- **Pro**: $25/month
  - 8 GB database
  - 100 GB storage
  - Daily backups
  - Good for ~50,000+ transcripts

### Total Starting Cost
**$0-$45/month** depending on tier choices

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Support**: support@vercel.com
- **Vercel Community**: https://github.com/vercel/vercel/discussions

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure environment variables
3. ✅ Set up Stripe webhook
4. ✅ Update OAuth redirect URIs
5. ✅ Test complete user flow
6. 📧 Set up email notifications
7. 📊 Configure monitoring
8. 🚀 Launch!
