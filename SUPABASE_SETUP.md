# Supabase Setup Guide for TEAM NST Website

## Step-by-Step Setup Instructions

### 1. Create Supabase Account and Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Click "New Project"
5. Fill in:
   - **Name**: team-nst-website
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to Pakistan (Singapore recommended)
   - **Pricing Plan**: Free tier is sufficient to start

### 2. Get Your API Keys

1. Once project is created, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy the following (you'll need these for `.env.local`):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (long string)
   - **service_role** key: `eyJhbGc...` (different long string)

### 3. Run Database Migration

#### Option A: Using Supabase Dashboard (Easiest)

1. In your Supabase project, click **SQL Editor** in the sidebar
2. Click **New query**
3. Open the file `supabase/migrations/20240101000000_initial_schema.sql` from this project
4. Copy ALL the contents
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. You should see "Success. No rows returned"

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 4. Seed Initial Data

1. Go back to **SQL Editor**
2. Click **New query**
3. Open the file `supabase/seed.sql`
4. Copy and paste all contents
5. Click **Run**

This will populate your database with:
- Sample FAQs
- Sample team members
- Sample projects
- Sample testimonials
- Sample achievements

### 5. Create Admin User

You need to create an admin user to access the dashboard.

#### Generate Password Hash

First, generate a bcrypt hash for your password:

```bash
# Option 1: Using Node.js
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourSecurePassword123', 10));"

# Option 2: Using online tool
# Go to: https://bcrypt-generator.com/
# Enter your password
# Rounds: 10
# Copy the hash
```

#### Insert Admin User

1. Go to **SQL Editor**
2. Create a new query
3. Replace `YOUR_BCRYPT_HASH` with your generated hash:

```sql
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@teamnst.com', 'YOUR_BCRYPT_HASH', 'admin');
```

4. Click **Run**

### 6. Configure Row Level Security (RLS)

The migration already set up RLS policies, but verify:

1. Go to **Authentication** > **Policies**
2. You should see policies for each table
3. Public read access is enabled for most tables
4. Admin users have full access

### 7. Set Up Storage (Optional - for file uploads)

1. Go to **Storage** in sidebar
2. Click **New bucket**
3. Create buckets:
   - `project-images` (Public)
   - `member-photos` (Public)
   - `event-images` (Public)
   - `blog-covers` (Public)

4. For each bucket:
   - Click on bucket name
   - Go to **Policies**
   - Add policy: "Public read access"
   ```sql
   CREATE POLICY "Public read" ON storage.objects
   FOR SELECT USING (bucket_id = 'project-images');
   ```

### 8. Configure Environment Variables

Create `.env.local` in your project root:

```env
# Get these from Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Generate a random string (32+ characters)
JWT_SECRET=your_random_jwt_secret_min_32_chars

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin credentials (used for initial login)
ADMIN_EMAIL=admin@teamnst.com
ADMIN_PASSWORD=YourSecurePassword123
```

### 9. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000
3. You should see the homepage without errors
4. Try accessing http://localhost:3000/admin
5. Login with your admin credentials

### 10. Verify Database Connection

Test each table:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check sample data
SELECT * FROM members LIMIT 5;
SELECT * FROM projects LIMIT 5;
SELECT * FROM faqs LIMIT 5;
```

## Common Issues and Solutions

### Issue: "Failed to fetch"
**Solution**: Check your Supabase URL and anon key are correct in `.env.local`

### Issue: "Relation does not exist"
**Solution**: Run the migration SQL again. Make sure all tables were created.

### Issue: "Row Level Security policy violation"
**Solution**: Check that RLS policies are properly set up. Run the RLS policy SQL from migration.

### Issue: "Invalid API key"
**Solution**: Make sure you're using the `anon` key, not `service_role` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Can't login as admin"
**Solution**: Verify the user exists in the `users` table and the password hash is correct.

## Security Checklist

- [ ] Never commit `.env.local` to Git
- [ ] Use strong passwords for admin accounts
- [ ] Keep service_role key secret (never expose to frontend)
- [ ] Enable RLS on all tables
- [ ] Use prepared statements for queries
- [ ] Validate all user inputs
- [ ] Enable 2FA on Supabase account

## Next Steps

1. Customize the seed data with real information
2. Add your actual team members, projects, and events
3. Upload logos to `/public/images/`
4. Configure email templates in Supabase for notifications
5. Set up backups in Supabase dashboard
6. Monitor usage in Supabase dashboard

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard > Logs
2. Check browser console for errors
3. Review Supabase documentation: https://supabase.com/docs
4. Contact TEAM NST tech team

## Resources

- Supabase Docs: https://supabase.com/docs
- Supabase Auth Guide: https://supabase.com/docs/guides/auth
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
- Database Functions: https://supabase.com/docs/guides/database/functions
