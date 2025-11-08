# Production Deployment Checklist

Use this checklist before deploying to production to ensure everything is properly configured.

## Pre-Deployment

### Environment Setup

- [ ] **Supabase Project Created**
  - Database configured and accessible
  - Storage bucket `transcripts` created (private)
  - RLS policies set up
  - Connection strings copied

- [ ] **Environment Variables Prepared**
  - [ ] `DATABASE_URL` (with pgbouncer)
  - [ ] `DIRECT_URL` (without pgbouncer)
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXTAUTH_URL` (production URL)
  - [ ] `NEXTAUTH_SECRET` (NEW, generated for production)
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `STRIPE_SECRET_KEY` (test mode initially)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`

- [ ] **Google OAuth Configured**
  - OAuth client created
  - Production redirect URI added
  - Credentials ready

- [ ] **Stripe Account Ready**
  - Account created
  - Test mode keys ready
  - Webhook endpoint will be configured post-deployment

### Code Review

- [ ] **Security Review**
  - No API keys hardcoded
  - All secrets in environment variables
  - Input validation in place
  - File upload validation working

- [ ] **Database Schema**
  - Schema is finalized
  - Ready to run migrations
  - Backup plan in place

- [ ] **Testing Completed**
  - User registration works
  - Payment flow tested (Stripe test mode)
  - File upload tested locally
  - Admin dashboard functional
  - Verification portal tested

## Deployment Steps

### 1. Vercel Setup

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Build settings configured (default Next.js)

### 2. Environment Variables in Vercel

- [ ] All environment variables added to Vercel
- [ ] Variables set for "Production" environment
- [ ] Secrets properly marked as sensitive
- [ ] `NEXTAUTH_SECRET` regenerated for production

### 3. Initial Deployment

- [ ] First deployment triggered
- [ ] Build completed successfully
- [ ] Site accessible at Vercel URL
- [ ] No build errors in logs

### 4. Database Migration

- [ ] Prisma schema pushed to Supabase
  ```bash
  npx prisma db push
  ```
- [ ] Tables created successfully
- [ ] Can view tables in Supabase dashboard

### 5. Storage Configuration

- [ ] Supabase storage bucket verified
- [ ] RLS policies applied:
  ```sql
  -- Service role can upload
  CREATE POLICY "Service role can upload transcripts"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'transcripts');

  -- Service role can read
  CREATE POLICY "Service role can read transcripts"
  ON storage.objects FOR SELECT
  TO service_role
  USING (bucket_id = 'transcripts');

  -- Service role can delete
  CREATE POLICY "Service role can delete transcripts"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'transcripts');
  ```

## Post-Deployment Configuration

### 1. Stripe Webhook

- [ ] Stripe webhook endpoint added: `https://your-domain.vercel.app/api/stripe-webhook`
- [ ] Events selected:
  - [ ] `checkout.session.completed`
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
- [ ] Webhook signing secret copied
- [ ] `STRIPE_WEBHOOK_SECRET` updated in Vercel
- [ ] Application redeployed

### 2. OAuth Redirect URIs

- [ ] **Google OAuth**:
  - Production URL added: `https://your-domain.vercel.app/api/auth/callback/google`
  - Both dev and prod URLs present
  - Saved in Google Cloud Console

- [ ] **Apple OAuth** (if using):
  - Return URL configured
  - Domain verified
  - Service ID updated

### 3. NextAuth Configuration

- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `NEXTAUTH_SECRET` is production-specific
- [ ] Application redeployed after URL update

## Testing in Production

### Smoke Tests

- [ ] **Landing Page**
  - Loads correctly
  - All links work
  - Images load
  - Styling correct

- [ ] **Authentication**
  - [ ] Google sign-in works
  - [ ] Apple sign-in works (if configured)
  - [ ] Session persists after sign-in
  - [ ] Sign-out works

- [ ] **Upload Flow**
  - [ ] User info form submits
  - [ ] Stripe checkout redirects correctly
  - [ ] Test payment processes (use test card: 4242 4242 4242 4242)
  - [ ] Redirects back after payment
  - [ ] File upload accepts PDF
  - [ ] File validation works (rejects non-PDF)
  - [ ] Success page displays
  - [ ] Confirmation page shows

- [ ] **Database Verification**
  - Check Supabase dashboard
  - [ ] User record created
  - [ ] Submission record created
  - [ ] Payment ID stored

- [ ] **Storage Verification**
  - Check Supabase Storage
  - [ ] File uploaded to transcripts bucket
  - [ ] File path correct: `{userId}/filename.pdf`
  - [ ] File is accessible (not public)

- [ ] **Admin Dashboard**
  - [ ] Can access /admin
  - [ ] Submissions list loads
  - [ ] Can download transcript
  - [ ] Can mark as complete
  - [ ] Search/filter works

- [ ] **Verification Portal**
  - [ ] /verify page loads
  - [ ] Can enter verification code
  - [ ] Shows correct submission details
  - [ ] Displays verified badge

### Error Handling Tests

- [ ] **Invalid file upload**
  - Rejects files > 25MB
  - Rejects non-PDF files
  - Shows error message

- [ ] **Payment failure**
  - Test with card: 4000 0000 0000 0002 (decline)
  - Shows error message
  - Doesn't create submission

- [ ] **Invalid verification code**
  - Shows "not found" message
  - Doesn't expose system errors

## Security Verification

### Environment Security

- [ ] All API keys in environment variables (not in code)
- [ ] `NEXTAUTH_SECRET` is strong (32+ characters)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is not exposed to client
- [ ] Stripe secret keys not in client code

### HTTPS & Headers

- [ ] Site uses HTTPS (Vercel automatic)
- [ ] Security headers set (check vercel.json)
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff

### Access Control

- [ ] Files in Supabase are private
- [ ] RLS policies prevent unauthorized access
- [ ] Admin routes have authentication check
- [ ] User can only see their own data

### Input Validation

- [ ] File uploads validated (type, size)
- [ ] Form inputs sanitized
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevention in place

## Monitoring Setup

### Vercel Monitoring

- [ ] Deployment notifications enabled
- [ ] Error tracking configured
- [ ] Performance monitoring reviewed

### Supabase Monitoring

- [ ] Database alerts set up
- [ ] Storage quota alerts enabled
- [ ] API usage monitoring active

### Stripe Monitoring

- [ ] Webhook monitoring enabled
- [ ] Email notifications for failed payments
- [ ] Dashboard reviewed regularly

## Performance

### Load Time

- [ ] Homepage loads < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] Lighthouse score > 90

### Database

- [ ] Connection pooling enabled (pgbouncer)
- [ ] Queries optimized
- [ ] Indexes in place (Prisma defaults)

### File Uploads

- [ ] Large file uploads work (test 20MB file)
- [ ] Upload progress visible to user
- [ ] Timeout set appropriately (30s)

## Documentation

- [ ] README.md updated with production info
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] API endpoints documented

## Backup & Recovery

### Database Backups

- [ ] Supabase automatic backups enabled
- [ ] Backup retention set (7 days minimum)
- [ ] Recovery process tested

### File Backups

- [ ] Supabase storage includes files in backup
- [ ] Alternative backup strategy considered

## Legal & Compliance

- [ ] Privacy policy added (if required)
- [ ] Terms of service added (if required)
- [ ] Cookie consent (if required in region)
- [ ] Data retention policy defined
- [ ] GDPR compliance reviewed (if applicable)

## Going Live

### Switch to Production Mode

- [ ] **Stripe**: Switch from test to live mode
  - [ ] Update `STRIPE_SECRET_KEY` to live key
  - [ ] Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to live key
  - [ ] Recreate webhook with live mode secret
  - [ ] Update `STRIPE_WEBHOOK_SECRET`
  - [ ] Redeploy application

### Custom Domain (Optional)

- [ ] Custom domain purchased
- [ ] DNS configured in domain registrar
- [ ] Domain added in Vercel
- [ ] SSL certificate verified (automatic)
- [ ] All redirect URIs updated
- [ ] `NEXTAUTH_URL` updated
- [ ] Application redeployed

### Final Checks

- [ ] All tests pass on production domain
- [ ] Real payment processed successfully
- [ ] Confirmation emails sent (if implemented)
- [ ] All team members have access
- [ ] Support email configured

## Launch Day

- [ ] Monitor error logs closely
- [ ] Watch Stripe dashboard for payments
- [ ] Check database connections
- [ ] Monitor file uploads
- [ ] Have rollback plan ready
- [ ] Team available for issues

## Post-Launch (Week 1)

- [ ] Daily error log review
- [ ] Payment reconciliation
- [ ] User feedback collection
- [ ] Performance monitoring
- [ ] Database health check
- [ ] Storage usage check

## Ongoing Maintenance

### Weekly

- [ ] Review error logs
- [ ] Check payment processing
- [ ] Monitor storage usage
- [ ] Review database performance

### Monthly

- [ ] Security updates
- [ ] Dependency updates
- [ ] Backup verification
- [ ] Cost review
- [ ] User metrics review

### Quarterly

- [ ] Full security audit
- [ ] Performance optimization
- [ ] Feature planning
- [ ] Infrastructure scaling review

---

## Quick Reference

### Emergency Contacts

- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Stripe Support: https://support.stripe.com

### Rollback Procedure

If critical issue found:

1. Go to Vercel dashboard
2. Deployments → Previous deployment
3. Click "..." → "Promote to Production"
4. Fix issue in code
5. Redeploy when ready

### Key URLs

- Production site: `https://your-domain.vercel.app`
- Vercel dashboard: `https://vercel.com/dashboard`
- Supabase dashboard: `https://app.supabase.com`
- Stripe dashboard: `https://dashboard.stripe.com`
- Google Console: `https://console.cloud.google.com`

---

**Remember**: It's better to take your time and check everything than to rush and have issues in production!
