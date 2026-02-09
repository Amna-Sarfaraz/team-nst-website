# TEAM NST Website - Project Structure

## 📁 Complete Directory Structure

```
team-nst-website/
│
├── app/                                    # Next.js 14 App Directory
│   ├── layout.tsx                         # Root layout with Navigation & Footer
│   ├── page.tsx                           # Homepage with hero & animations
│   ├── globals.css                        # Global styles & Tailwind
│   │
│   ├── about/                             # About Team page
│   │   └── page.tsx                       # Team structure, values, mentors
│   │
│   ├── projects/                          # Projects section
│   │   ├── page.tsx                       # Projects listing with filters
│   │   └── [id]/                          # Dynamic project detail pages
│   │       └── page.tsx                   # Individual project page
│   │
│   ├── competitions/                      # Competitions section
│   │   ├── page.tsx                       # Competitions listing
│   │   └── [id]/                          # Competition detail pages
│   │       └── page.tsx
│   │
│   ├── events/                            # Events section
│   │   ├── page.tsx                       # Events with calendar view
│   │   └── [id]/
│   │       └── page.tsx                   # Event details & registration
│   │
│   ├── achievements/                      # Achievements gallery
│   │   └── page.tsx                       # Awards & recognitions
│   │
│   ├── blogs/                             # Blog section
│   │   ├── page.tsx                       # Blog listing
│   │   └── [slug]/                        # Blog post pages
│   │       └── page.tsx                   # Individual blog post
│   │
│   ├── reviews/                           # Testimonials/Reviews
│   │   └── page.tsx                       # Member testimonials
│   │
│   ├── join/                              # Join/Contact page
│   │   └── page.tsx                       # Application form & contact info
│   │
│   ├── admin/                             # Admin Dashboard (Protected)
│   │   ├── layout.tsx                     # Admin layout with sidebar
│   │   ├── page.tsx                       # Dashboard overview
│   │   ├── login/
│   │   │   └── page.tsx                   # Admin login
│   │   ├── projects/
│   │   │   └── page.tsx                   # Manage projects
│   │   ├── events/
│   │   │   └── page.tsx                   # Manage events
│   │   ├── competitions/
│   │   │   └── page.tsx                   # Manage competitions
│   │   ├── blogs/
│   │   │   └── page.tsx                   # Manage blogs
│   │   ├── team/
│   │   │   └── page.tsx                   # Manage team members
│   │   ├── applications/
│   │   │   └── page.tsx                   # Review applications
│   │   └── settings/
│   │       └── page.tsx                   # Admin settings
│   │
│   └── api/                               # API Routes
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts               # POST: Admin login
│       │   └── logout/
│       │       └── route.ts               # POST: Logout
│       │
│       ├── projects/
│       │   ├── route.ts                   # GET, POST: Projects
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE: Single project
│       │
│       ├── competitions/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       ├── events/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       ├── blogs/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       ├── testimonials/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       ├── team-members/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       ├── achievements/
│       │   ├── route.ts                   # GET, POST
│       │   └── [id]/
│       │       └── route.ts               # GET, PUT, DELETE
│       │
│       └── applications/
│           ├── route.ts                   # GET, POST: Join applications
│           └── [id]/
│               └── route.ts               # GET, PUT: Review application
│
├── components/                            # Reusable React Components
│   ├── Navigation.tsx                     # Main navigation bar
│   ├── Footer.tsx                         # Footer component
│   ├── AnimatedBackground.tsx             # Particle animation canvas
│   ├── ChatBot.tsx                        # AI chatbot widget
│   ├── StatsSection.tsx                   # Animated statistics
│   ├── FeaturedProjects.tsx               # Project showcase
│   ├── LatestUpdates.tsx                  # Updates section
│   │
│   ├── admin/                             # Admin-specific components
│   │   ├── AdminNav.tsx                   # Admin sidebar navigation
│   │   ├── DataTable.tsx                  # Reusable data table
│   │   ├── FormModal.tsx                  # Modal for forms
│   │   └── StatsCard.tsx                  # Dashboard stat card
│   │
│   └── ui/                                # UI components
│       ├── Button.tsx                     # Button component
│       ├── Input.tsx                      # Input component
│       ├── Card.tsx                       # Card component
│       └── Modal.tsx                      # Modal component
│
├── lib/                                   # Utility Functions & Libraries
│   ├── supabase.ts                        # Supabase client & types
│   ├── auth.ts                            # Authentication utilities
│   ├── utils.ts                           # General utilities
│   └── hooks/                             # Custom React hooks
│       ├── useAuth.ts                     # Authentication hook
│       ├── useProjects.ts                 # Projects data hook
│       └── useEvents.ts                   # Events data hook
│
├── supabase/                              # Database Related
│   ├── schema.sql                         # Complete database schema
│   ├── migrations/                        # Database migrations
│   └── seed.sql                           # Sample data (optional)
│
├── public/                                # Static Assets
│   ├── images/
│   │   ├── logo-nst.png                   # TEAM NST logo
│   │   ├── logo-ned.png                   # NED University logo
│   │   └── ...                            # Other images
│   ├── icons/
│   │   └── ...                            # Icon files
│   └── fonts/                             # Custom fonts (if any)
│
├── types/                                 # TypeScript Type Definitions
│   ├── index.ts                           # Main types export
│   ├── database.ts                        # Database types
│   └── api.ts                             # API response types
│
├── .env.example                           # Environment variables template
├── .env.local                             # Local environment (not in git)
├── .gitignore                             # Git ignore rules
├── next.config.js                         # Next.js configuration
├── tailwind.config.js                     # Tailwind CSS configuration
├── postcss.config.js                      # PostCSS configuration
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Dependencies & scripts
├── README.md                              # Project overview
├── SETUP_GUIDE.md                         # Detailed setup instructions
└── PROJECT_STRUCTURE.md                   # This file
```

## 🎯 Key File Descriptions

### Core Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.js` | Next.js framework configuration |
| `tailwind.config.js` | Tailwind CSS theme customization |
| `.env.example` | Environment variables template |

### Application Files

| Directory | Purpose |
|-----------|---------|
| `app/` | All pages and routes (Next.js App Router) |
| `components/` | Reusable UI components |
| `lib/` | Utilities, helpers, custom hooks |
| `public/` | Static assets (images, fonts, icons) |
| `types/` | TypeScript type definitions |

### Database Files

| File | Purpose |
|------|---------|
| `supabase/schema.sql` | Complete database schema |
| `lib/supabase.ts` | Database client and types |

## 🔄 Data Flow

### Frontend → Backend → Database

```
User Action (Browser)
    ↓
React Component
    ↓
API Route (/app/api/*)
    ↓
Supabase Client (lib/supabase.ts)
    ↓
PostgreSQL Database (Supabase)
    ↓
Response back through chain
    ↓
UI Update
```

## 🎨 Styling System

### Tailwind Classes Used

- **Colors**: `primary`, `secondary`, `background`, `bg-card`
- **Effects**: `glass`, `glass-strong`, `card-hover`, `gradient-text`
- **Animation**: `animate-float`, `animate-pulse-slow`, `animate-glow`

### CSS Structure

```
globals.css
    ├── Tailwind directives (@tailwind)
    ├── Custom utility classes (.glass, .gradient-text)
    ├── Component-specific styles
    └── Animation keyframes
```

## 🔐 Authentication Flow

```
Login Page (/admin/login)
    ↓
POST /api/auth/login
    ↓
Verify credentials (bcrypt)
    ↓
Generate JWT token
    ↓
Store token (localStorage/cookie)
    ↓
Protect admin routes (middleware)
    ↓
Access admin dashboard
```

## 📊 Database Tables

### Main Tables

1. **admins** - Admin user accounts
2. **projects** - Project portfolio
3. **competitions** - Competition records
4. **events** - Event management
5. **blogs** - Blog posts
6. **testimonials** - User reviews
7. **team_members** - Team roster
8. **achievements** - Awards & recognition
9. **join_applications** - Membership applications

### Relationships

```
team_members ←→ projects (many-to-many)
team_members ←→ competitions (many-to-many)
admins → blogs (one-to-many)
```

## 🚀 Build & Deploy Process

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server
```

### Production
```bash
npm run build       # Build for production
npm start          # Start production server
```

### Deployment
```bash
git push            # Push to GitHub
Vercel auto-deploys # Automatic deployment
```

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (e.g., `Navigation.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Utilities**: camelCase (e.g., `supabase.ts`)
- **Types**: PascalCase (e.g., `Project`)

### Variables
- **React Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case

## 🎯 Feature Modules

### Public Features
- Homepage with animations
- Project showcase
- Event calendar
- Blog system
- Application form
- Chatbot

### Admin Features
- Authentication
- Content management (CRUD)
- Application review
- Dashboard analytics

## 🔧 Extending the Project

### Adding a New Page

1. Create `app/your-page/page.tsx`
2. Add navigation link in `components/Navigation.tsx`
3. Create necessary API routes in `app/api/`
4. Add database table if needed in `supabase/schema.sql`

### Adding a New API Endpoint

1. Create `app/api/your-endpoint/route.ts`
2. Implement GET, POST, PUT, DELETE handlers
3. Use Supabase client from `lib/supabase.ts`
4. Add authentication if needed

### Adding a New Component

1. Create component in `components/`
2. Import and use in pages
3. Add to `components/index.ts` for easy imports

---

This structure is designed to be:
- **Scalable**: Easy to add new features
- **Maintainable**: Clear organization
- **Type-safe**: Full TypeScript support
- **Modern**: Next.js 14 App Router
- **Production-ready**: Optimized and secure
