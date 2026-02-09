-- TEAM NST Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins table for authentication
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'Planning' CHECK (status IN ('Planning', 'In Progress', 'Completed', 'On Hold')),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  image_url VARCHAR(500),
  team_members TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255),
  category VARCHAR(100),
  result VARCHAR(255),
  team_members TEXT[] DEFAULT '{}',
  image_url VARCHAR(500),
  is_upcoming BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50),
  location VARCHAR(255),
  event_type VARCHAR(50) CHECK (event_type IN ('Workshop', 'Seminar', 'Hackathon', 'Meetup', 'Other')),
  max_participants INTEGER,
  registered_count INTEGER DEFAULT 0,
  image_url VARCHAR(500),
  is_upcoming BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_id UUID,
  cover_image VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  year VARCHAR(50),
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  image_url VARCHAR(500),
  is_alumni BOOLEAN DEFAULT false,
  joined_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(500),
  certificate_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Join Applications table
CREATE TABLE IF NOT EXISTS join_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  department VARCHAR(255),
  year VARCHAR(50),
  skills TEXT[] DEFAULT '{}',
  why_join TEXT,
  portfolio_url VARCHAR(500),
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Accepted', 'Rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_competitions_date ON competitions(date DESC);
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_is_alumni ON team_members(is_alumni);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view published content" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view competitions" ON competitions FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view published blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public can view achievements" ON achievements FOR SELECT USING (true);

-- Admin policies (authenticated users with admin role can do everything)
-- Note: You'll need to set up proper authentication in Supabase
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage competitions" ON competitions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage team members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage achievements" ON achievements FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can submit join applications
CREATE POLICY "Anyone can submit applications" ON join_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all applications" ON join_applications FOR SELECT USING (auth.role() = 'authenticated');

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash generated with bcrypt for 'admin123'
INSERT INTO admins (email, password_hash, role, name)
VALUES ('admin@teamnst.com', '$2a$10$rOKvVJpbYcFl8W6Y5P5LqOxKxWqLXxZJxLqFqLqLqLqLqLqLqLqLq', 'admin', 'Admin User')
ON CONFLICT (email) DO NOTHING;
