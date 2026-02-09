// Database Types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'public';
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  name: string;
  position?: string;
  role?: string;
  bio?: string;
  image_url?: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  is_mentor: boolean;
  is_alumni: boolean;
  join_date?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailed_description?: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  category?: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  start_date?: string;
  end_date?: string;
  is_featured: boolean;
  technologies: string[];
  created_at: string;
  updated_at: string;
  members?: Member[];
}

export interface Competition {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizer?: string;
  location?: string;
  start_date: string;
  end_date?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  result?: string;
  position?: string;
  image_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
  participants?: Member[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailed_description?: string;
  event_type: string;
  location?: string;
  start_date: string;
  end_date?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image_url?: string;
  registration_url?: string;
  max_participants?: number;
  current_participants: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category?: string;
  date: string;
  image_url?: string;
  certificate_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id?: string;
  author?: Member;
  cover_image_url?: string;
  category?: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  image_url?: string;
  is_member: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface JoinRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roll_number?: string;
  department?: string;
  year_of_study?: string;
  skills: string[];
  interests?: string;
  why_join: string;
  portfolio_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Statistics
export interface Stats {
  members: number;
  projects: number;
  competitions: number;
  achievements: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface JoinForm {
  name: string;
  email: string;
  phone?: string;
  roll_number?: string;
  department?: string;
  year_of_study?: string;
  skills: string[];
  interests?: string;
  why_join: string;
  portfolio_url?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
