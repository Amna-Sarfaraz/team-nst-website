# TEAM NST Website - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd team-nst-website
npm install
```

### 2. Set Up Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy the SQL from `supabase/schema.sql`
4. Run it in Supabase SQL Editor

### 3. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
- Get URL and keys from Supabase Settings → API
- Generate JWT secret: `openssl rand -hex 32`
- Generate password hash: See SETUP_GUIDE.md

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📚 Full Documentation

- **README.md** - Project overview and features
- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_STRUCTURE.md** - Complete file structure

## 🎯 What You Get

✅ Modern Next.js 14 website
✅ Beautiful dark theme with animations
✅ Admin dashboard for content management
✅ Supabase PostgreSQL database
✅ Fully responsive design
✅ Production-ready code
✅ Type-safe with TypeScript

## 🔑 Default Admin Login

After setting up:
- URL: `/admin/login`
- Email: From your .env.local
- Password: What you used to generate the hash

## 📝 Next Steps

1. Customize colors in `tailwind.config.js`
2. Add your logos to `components/Navigation.tsx`
3. Populate database with your content
4. Deploy to Vercel for free

## 💡 Tips

- Read SETUP_GUIDE.md for detailed instructions
- Check PROJECT_STRUCTURE.md to understand the codebase
- All sensitive data goes in .env.local (never commit it!)
- Use the admin dashboard to manage content

## 🆘 Need Help?

- Check SETUP_GUIDE.md troubleshooting section
- Review documentation files
- Contact: info@teamnst.com

---

**Built for TEAM NST - NED Society of Technology**
