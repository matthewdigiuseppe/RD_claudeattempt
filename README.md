# Transcript Verification Platform

A web application that allows college graduates to verify the integrity of their degrees by uploading transcripts for analysis. The platform assesses how vulnerable their courses were to AI dishonesty by cross-referencing against public syllabi.

## Features

- **Authentication**: Sign in with Google or Apple
- **Payment Integration**: Stripe checkout for $29.99 per analysis
- **File Upload**: Support for PDF transcripts up to 25MB
- **Admin Dashboard**: View and manage all submissions
- **Employer Verification Portal**: Verify reports using unique codes
- **Responsive Design**: Mobile-first design with clean UI

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google & Apple OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe
- **File Storage**: Local filesystem (configurable for AWS S3)

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- Google OAuth credentials
- Apple OAuth credentials (optional)
- Stripe account

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example`):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/transcript_platform"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Apple OAuth
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_TEAM_ID="your-apple-team-id"
APPLE_KEY_ID="your-apple-key-id"
APPLE_PRIVATE_KEY="your-apple-private-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Admin
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"

# Email (optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="noreply@transcriptplatform.com"
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RD_claudeattempt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **Users**: Store authenticated users
- **Accounts**: NextAuth account linking
- **Sessions**: NextAuth session management
- **Submissions**: Transcript submissions and analysis status
- **Admin**: Admin user credentials

### Running Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio
```

## OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### Apple OAuth

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a Service ID
3. Configure Sign in with Apple
4. Generate a private key
5. Add credentials to `.env`

## Stripe Setup

1. Create a [Stripe account](https://stripe.com/)
2. Get your API keys from the dashboard
3. Set up webhook endpoint: `https://yourdomain.com/api/stripe-webhook`
4. Add webhook secret to `.env`
5. Test with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── admin/        # Admin endpoints
│   │   ├── create-checkout-session/
│   │   ├── upload-transcript/
│   │   ├── verify-report/
│   │   └── stripe-webhook/
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Authentication pages
│   ├── upload/           # Upload flow
│   ├── verify/           # Employer verification
│   ├── confirmation/     # Confirmation page
│   └── page.tsx          # Landing page
├── components/
│   ├── Providers.tsx     # Session provider
│   └── ui/               # Reusable components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── types/
│   └── next-auth.d.ts    # Type declarations
└── uploads/              # File storage
```

## API Endpoints

### Public Endpoints

- `POST /api/auth/signin` - User authentication
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/upload-transcript` - Upload transcript file
- `POST /api/verify-report` - Verify report by code
- `POST /api/stripe-webhook` - Stripe webhook handler

### Admin Endpoints

- `GET /api/admin/submissions` - Get all submissions
- `GET /api/admin/download/[id]` - Download transcript
- `POST /api/admin/mark-complete` - Mark analysis complete

## User Flow

1. User visits landing page
2. User signs in with Google or Apple
3. User fills out information form
4. User proceeds to Stripe payment ($29.99)
5. After successful payment, user uploads transcript
6. User receives confirmation
7. Admin downloads transcript and analyzes
8. Admin marks analysis as complete
9. User receives verification report via email
10. Employers can verify report using QR code

## Admin Dashboard

Access the admin dashboard at `/admin`. Features include:

- View all submissions
- Filter by status (pending/completed)
- Search by student name, email, or university
- Download transcript PDFs
- Mark submissions as complete
- View payment status

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## File Storage

Currently uses local filesystem storage in `/uploads` directory. For production:

1. Consider using AWS S3, Google Cloud Storage, or similar
2. Update upload API endpoints to use cloud storage
3. Configure appropriate permissions and access controls

## Security Considerations

- All environment variables must be kept secure
- HTTPS required for production
- File uploads are validated server-side
- Payment processing handled by Stripe
- Sessions are encrypted
- Rate limiting recommended for production

## Testing

### Test Payment Flow

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Test File Upload

- Test with various PDF sizes (1MB, 10MB, 25MB)
- Test with non-PDF files (should reject)
- Test with oversized files (should reject)

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql -h localhost -U youruser -d transcript_platform
```

### Prisma Issues

```bash
# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- [ ] Automated email notifications
- [ ] Support for multiple universities
- [ ] Automated transcript parsing
- [ ] User dashboard for tracking status
- [ ] Support for JPEG/PNG transcripts
- [ ] AWS S3 integration for file storage
- [ ] Admin authentication system
- [ ] Analytics dashboard

## Support

For issues or questions:
- Email: support@transcriptverify.com
- GitHub Issues: [Create an issue]

## License

Copyright © 2025 TranscriptVerify. All rights reserved.
