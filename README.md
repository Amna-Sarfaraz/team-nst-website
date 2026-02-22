# TEAM NST - Official Website

A modern, full-stack website for TEAM NST (NED Society of Technology) built with Next.js, Tailwind CSS, Framer Motion, and Supabase.

## 🚀 Features

- **Beautiful UI/UX**: Dark-themed professional interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: Admin dashboard for managing all content
- **Authentication**: Secure admin login system
- **Interactive Components**: 
  - Animated hero section with particles
  - Project showcase with filtering
  - Event calendar
  - Blog system
  - Member testimonials
  - AI-powered chatbot
- **Database Integration**: Supabase PostgreSQL backend
- **Performance Optimized**: Built with Next.js 14 for optimal performance

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcrypt
- **ORM**: Supabase Client

### Additional Tools
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Calendar**: React Calendar
- **Markdown**: React Markdown

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or higher
- npm or yarn package manager
- A Supabase account (free tier works)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/team-nst-website.git
cd team-nst-website
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (keep this private!)

### 4. Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase/schema.sql`
3. Paste and run it in the SQL Editor
4. This will create all necessary tables, indexes, and policies

### 5. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your actual values:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Secret (generate a strong random string)
JWT_SECRET=your_very_strong_random_secret_here

# Admin Credentials
ADMIN_EMAIL=admin@teamnst.com
ADMIN_PASSWORD_HASH=your_bcrypt_hash_here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Generate Admin Password Hash

Run this command to generate a password hash:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

Replace `'your_password'` with your desired admin password, then copy the output hash to `ADMIN_PASSWORD_HASH` in `.env.local`.

### 7. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your website!

## 📁 Project Structure

```
team-nst-website/
├── app/                          # Next.js app directory
│   ├── about/                   # About page
│   ├── projects/                # Projects page
│   ├── competitions/            # Competitions page
│   ├── events/                  # Events page
│   ├── achievements/            # Achievements page
│   ├── blogs/                   # Blogs listing and detail
│   ├── reviews/                 # Reviews/Testimonials
│   ├── contact/                 # Contact page
│   ├── join/                    # Join team application
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── projects/           # Projects CRUD
│   │   ├── events/             # Events CRUD
│   │   ├── blogs/              # Blogs CRUD
│   │   └── ...                 # Other endpoints
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── Navigation.tsx          # Main navigation
│   ├── Footer.tsx              # Footer
│   ├── AnimatedBackground.tsx  # Particle animation
│   ├── ChatBot.tsx             # AI chatbot
│   ├── StatsSection.tsx        # Statistics display
│   ├── FeaturedProjects.tsx    # Project showcase
│   └── ...                     # Other components
├── lib/                        # Utility functions
│   ├── supabase.ts            # Supabase client & types
│   └── auth.ts                # Authentication utilities
├── supabase/                   # Database related
│   └── schema.sql             # Database schema
├── public/                     # Static assets
│   └── ...                    # Images, logos, etc.
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── next.config.js             # Next.js config
└── README.md                  # This file
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: '#7C3AED',      // Main purple
  secondary: '#A78BFA',    // Light purple
  background: '#0B0B0F',   // Dark background
  'bg-card': '#1A1A24',   // Card background
}
```

### Fonts

The project uses:
- **Inter** for body text
- **Space Grotesk** for headings

You can change these in `app/layout.tsx`.

### Logo

Replace the logo in `components/Navigation.tsx` and `components/Footer.tsx` with your actual logos.

## 🔐 Admin Dashboard

Access the admin dashboard at `/admin` (create this page following the patterns in other pages).

Default credentials (if using the sample data):
- Email: `admin@teamnst.com`
- Password: (whatever you set when generating the hash)

**IMPORTANT**: Change these credentials immediately in production!

## 📱 Pages Overview

### Public Pages
- **Home** (`/`): Hero, mission/vision, stats, latest updates, featured projects
- **About** (`/about`): Team overview, structure, values, mentors
- **Projects** (`/projects`): All projects with filtering and search
- **Competitions** (`/competitions`): Past and upcoming competitions
- **Events** (`/events`): Event calendar and details
- **Achievements** (`/achievements`): Awards and recognitions
- **Blogs** (`/blogs`): Tech articles and news
- **Reviews** (`/reviews`): Member testimonials
- **Contact** (`/contact`): Contact information and form
- **Join** (`/join`): Membership application form

### Admin Pages
- **Dashboard** (`/admin`): Overview and quick actions
- **Manage Projects** (`/admin/projects`): CRUD operations
- **Manage Events** (`/admin/events`): CRUD operations
- **Manage Blogs** (`/admin/blogs`): CRUD operations
- And more...

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 🔒 Security Notes

1. **Never commit `.env.local`** - it's already in `.gitignore`
2. **Change default admin credentials** immediately
3. **Use strong JWT secret** (at least 32 random characters)
4. **Keep service role key private** - only use it server-side
5. **Enable HTTPS** in production
6. **Set up Supabase RLS policies** properly
7. **Validate all user inputs** before storing in database

## 🐛 Troubleshooting

### Build Errors

If you get TypeScript errors, try:
```bash
npm run build
```

### Database Connection Issues

- Verify your Supabase credentials in `.env.local`
- Check if your IP is allowed in Supabase dashboard
- Ensure database schema is properly set up

### Styling Issues

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email info@teamnst.com or join our Discord community.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Real-time notifications
- [ ] Integration with university systems
- [ ] AI-powered project recommendations
- [ ] Member portfolio generation
- [ ] Automated event reminders
- [ ] Achievement badges system

---

**TEAM NST** - NED Society of Technology
