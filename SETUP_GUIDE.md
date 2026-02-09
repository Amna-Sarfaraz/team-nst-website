# TEAM NST Website - Complete Setup & Deployment Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Admin Setup](#admin-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager (comes with Node.js)
- **Git**: Version control ([Download](https://git-scm.com/))
- **Supabase Account**: Free tier available at [supabase.com](https://supabase.com)
- **Code Editor**: VS Code recommended

### Verify Installation

```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
git --version   # Should show 2.x or higher
```

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/team-nst-website.git

# Navigate to project directory
cd team-nst-website
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Tailwind CSS, Framer Motion
- Supabase client
- And all other dependencies

**Expected time**: 2-5 minutes depending on your internet speed

---

## Database Configuration

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: team-nst-website
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

### Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (starts with eyJ)
   - **service_role key**: `eyJhbGc...` (KEEP THIS SECRET!)

### Step 3: Set Up Database Schema

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "New Query"
3. Open `supabase/schema.sql` from this project
4. Copy the ENTIRE contents
5. Paste into Supabase SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

This creates:
- 8 tables (projects, events, blogs, etc.)
- Indexes for performance
- Row Level Security policies
- Sample admin user

### Step 4: Verify Tables Created

1. Click **Table Editor** in Supabase dashboard
2. You should see these tables:
   - admins
   - projects
   - competitions
   - events
   - blogs
   - testimonials
   - team_members
   - achievements
   - join_applications

---

## Environment Variables

### Step 1: Create Environment File

```bash
# Copy the example file
cp .env.example .env.local
```

### Step 2: Fill in Values

Open `.env.local` in your editor and update:

```env
# From Supabase Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate a random 32+ character string
JWT_SECRET=your_super_secret_random_string_here_minimum_32_chars

# Admin credentials
ADMIN_EMAIL=admin@teamnst.com
ADMIN_PASSWORD_HASH=see_below

# App URL (change in production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Generate JWT Secret

**Option 1** - Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2** - Using OpenSSL:
```bash
openssl rand -hex 32
```

Copy the output and paste it as `JWT_SECRET`

### Step 4: Generate Admin Password Hash

Choose a strong password for admin access, then run:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD_HERE', 10));"
```

Replace `YOUR_PASSWORD_HERE` with your actual password.

Example:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('SuperSecure123!', 10));"
```

Copy the output hash (starts with `$2a$10$...`) and paste it as `ADMIN_PASSWORD_HASH`

**IMPORTANT**: 
- Don't use the example password!
- Keep your password secure
- The hash is safe to store in `.env.local`

---

## Running the Application

### Development Mode

```bash
npm run dev
# OR
yarn dev
```

The site will be available at: **http://localhost:3000**

You should see:
- ✓ Compiled successfully
- ✓ Ready in X ms
- ○ Local: http://localhost:3000

### Build for Production

Test production build locally:

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Lint Code

```bash
npm run lint
```

---

## Production Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/your-username/team-nst-website.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Add Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `NEXT_PUBLIC_APP_URL` (use your vercel domain)

3. Click "Save"

#### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Visit your live site!

Your site will be at: `https://your-project.vercel.app`

### Custom Domain (Optional)

In Vercel:
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Admin Setup

### Access Admin Dashboard

1. Go to `/admin/login` on your site
2. Use credentials:
   - **Email**: Value from `ADMIN_EMAIL`
   - **Password**: The password you used to generate the hash

### Create First Admin User in Database

If you need additional admin users:

1. Generate password hash (see above)
2. In Supabase, go to **Table Editor** → **admins**
3. Click "Insert" → "Insert row"
4. Fill in:
   - email: new_admin@example.com
   - password_hash: (generated hash)
   - role: admin
   - name: Admin Name
5. Click "Save"

---

## Troubleshooting

### Build Errors

**Error**: `Module not found`
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: TypeScript errors
```bash
# Run type checking
npm run build
# Fix reported errors in code
```

### Database Connection Issues

**Error**: "Failed to fetch projects"

1. Check Supabase is running (not paused due to inactivity)
2. Verify environment variables are correct
3. Check Supabase project URL doesn't have trailing slash
4. Ensure tables exist in Supabase Table Editor

**Error**: "Invalid API key"

1. Regenerate keys in Supabase Settings → API
2. Update `.env.local` or Vercel environment variables
3. Restart development server or redeploy

### Authentication Issues

**Error**: "Invalid credentials"

1. Verify admin user exists in `admins` table
2. Check email matches exactly
3. Regenerate password hash if needed
4. Ensure JWT_SECRET is the same everywhere

### Styling Not Working

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Performance Issues

1. Check Supabase is not on free tier limit
2. Optimize images (use Next.js Image component)
3. Enable caching in Supabase
4. Consider upgrading Supabase plan

### Production vs Development Differences

If it works locally but not in production:

1. Check all environment variables are set in Vercel
2. Ensure `NEXT_PUBLIC_APP_URL` is correct
3. Check browser console for errors
4. Verify Supabase allows connections from Vercel IPs

---

## Security Checklist

Before going live:

- [ ] Changed default admin password
- [ ] Using strong JWT secret (32+ characters)
- [ ] Service role key is not exposed in frontend code
- [ ] Environment variables are not committed to Git
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Supabase RLS policies are enabled
- [ ] Regular database backups configured in Supabase
- [ ] Error messages don't expose sensitive info

---

## Next Steps

After successful deployment:

1. **Test all pages**: Verify every route works
2. **Add content**: Use admin dashboard to add projects, events, blogs
3. **Configure email**: Set up email notifications for applications
4. **Add analytics**: Google Analytics or Vercel Analytics
5. **Set up monitoring**: Error tracking with Sentry
6. **Enable backups**: Configure Supabase backup schedule
7. **Customize branding**: Add your logos and colors

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

For TEAM NST specific issues:
- Email: info@teamnst.com
- GitHub Issues: [Create an issue](https://github.com/your-org/team-nst-website/issues)

---

**Congratulations!** 🎉 Your TEAM NST website is now live!
