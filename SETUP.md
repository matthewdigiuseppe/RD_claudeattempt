# Quick Setup Guide

## Initial Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Edit `.env` with minimum required variables for local development:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/transcript_platform"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="get-from-google-cloud-console"
GOOGLE_CLIENT_SECRET="get-from-google-cloud-console"
STRIPE_SECRET_KEY="sk_test_get-from-stripe"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_get-from-stripe"
```

### 3. Set Up Database

Ensure PostgreSQL is running, then:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Getting OAuth Credentials

### Google OAuth (Required)

1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URI:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy Client ID and Client Secret to `.env`

### Apple OAuth (Optional)

1. Go to https://developer.apple.com/account/
2. Certificates, Identifiers & Profiles > Identifiers
3. Click + and select "Services IDs"
4. Register a new Services ID
5. Enable "Sign in with Apple"
6. Configure:
   - Domain: `yourdomain.com`
   - Return URL: `https://yourdomain.com/api/auth/callback/apple`
7. Create a private key and download
8. Add credentials to `.env`

**Note**: Apple Sign In requires HTTPS and won't work on localhost

## Getting Stripe Keys

1. Go to https://stripe.com/ and create account
2. Go to Developers > API keys
3. Copy "Publishable key" and "Secret key" (use test mode)
4. Add to `.env`:
   - `STRIPE_SECRET_KEY` = Secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Publishable key

### Stripe Webhook Setup (For production)

1. Go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret to `.env` as `STRIPE_WEBHOOK_SECRET`

### Stripe CLI for Local Testing

```bash
# Install Stripe CLI
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Database Management

### View Database
```bash
npx prisma studio
```

### Reset Database (WARNING: Deletes all data)
```bash
npx prisma db push --force-reset
```

### Generate Prisma Client (after schema changes)
```bash
npx prisma generate
```

## Testing

### Test User Flow

1. Visit http://localhost:3000
2. Click "Get Started"
3. Sign in with Google
4. Fill out form
5. Use test card: `4242 4242 4242 4242`
6. Upload a test PDF transcript
7. Check confirmation page

### Test Admin Dashboard

1. Visit http://localhost:3000/admin
2. Sign in (currently no auth - TODO)
3. View submissions
4. Download transcripts
5. Mark as complete

### Test Employer Verification

1. Get verification code from submission
2. Visit http://localhost:3000/verify
3. Enter code
4. View verified information

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
brew services list  # macOS
sudo service postgresql status  # Linux

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start  # Linux
```

### Prisma Client Not Generated
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Production Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all these are set:
- `DATABASE_URL` - Production PostgreSQL URL
- `NEXTAUTH_URL` - Your domain (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET` - Generate new secret for production
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `APPLE_*` credentials (if using Apple Sign In)
- `STRIPE_SECRET_KEY` - Production secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Production publishable key
- `STRIPE_WEBHOOK_SECRET` - Production webhook secret

### Post-Deployment

1. Set up Stripe webhook with production URL
2. Update OAuth redirect URIs to production domain
3. Test payment flow with test mode
4. Switch Stripe to live mode when ready

## Next Steps

1. **Configure Email Notifications**: Set up nodemailer or email service
2. **Admin Authentication**: Add proper admin login system
3. **File Storage**: Migrate to AWS S3 for production
4. **Monitoring**: Add error tracking (Sentry, etc.)
5. **Analytics**: Add user analytics
6. **Testing**: Add automated tests

## Support

- Documentation: See README.md
- Email: support@transcriptverify.com
