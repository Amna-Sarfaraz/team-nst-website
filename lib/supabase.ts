import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Database types
export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  tech_stack: string[]
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold'
  github_url?: string
  demo_url?: string
  image_url?: string
  team_members: string[]
  created_at: string
  updated_at: string
}

export interface Competition {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
  result?: string
  team_members: string[]
  image_url?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  event_type: 'Workshop' | 'Seminar' | 'Hackathon' | 'Meetup' | 'Other'
  max_participants?: number
  registered_count: number
  image_url?: string
  is_upcoming: boolean
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  author_id?: string
  cover_image?: string
  tags: string[]
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image_url?: string
  is_featured: boolean
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  year: string
  bio?: string
  skills: string[]
  linkedin_url?: string
  github_url?: string
  image_url?: string
  is_alumni: boolean
  joined_at: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
  image_url?: string
  certificate_url?: string
  created_at: string
}
