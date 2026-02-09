-- Seed FAQs
INSERT INTO faqs (question, answer, category, order_index) VALUES
('What is TEAM NST?', 'TEAM NST (NED Society of Technology) is the official technology society of NED University. We focus on innovation, learning, and building solutions through technology.', 'General', 1),
('How can I join TEAM NST?', 'You can join by filling out the application form on our Contact page. We accept new members at the beginning of each semester.', 'General', 2),
('What technologies does TEAM NST work with?', 'We work with a wide range of technologies including Web Development, Mobile Apps, AI/ML, IoT, Blockchain, and more.', 'Technical', 3),
('Do I need prior experience to join?', 'No! We welcome students of all skill levels. We provide training and mentorship to help you grow.', 'General', 4),
('What events does TEAM NST organize?', 'We organize workshops, hackathons, tech talks, coding competitions, and various learning sessions throughout the year.', 'Events', 5);

-- Seed sample members (you should replace with actual data)
INSERT INTO members (name, position, role, bio, email, is_mentor, join_date, order_index) VALUES
('Dr. Sample Mentor', 'Faculty Advisor', 'Mentor', 'Experienced faculty member guiding TEAM NST', 'mentor@ned.edu.pk', true, '2020-01-01', 1),
('Muhammad Ali', 'President', 'President', 'Leading TEAM NST with passion for technology and innovation', 'president@teamnst.com', false, '2022-09-01', 2),
('Fatima Khan', 'Vice President', 'Vice President', 'Coordinating activities and driving technical excellence', 'vp@teamnst.com', false, '2022-09-01', 3);

-- Seed sample projects
INSERT INTO projects (title, slug, description, detailed_description, status, category, is_featured, technologies, start_date) VALUES
('Smart Campus System', 'smart-campus-system', 'IoT-based campus management system', 'A comprehensive IoT solution for managing campus facilities, attendance, and resources.', 'in_progress', 'IoT', true, '["React", "Node.js", "Arduino", "MongoDB"]', '2024-01-15'),
('AI Study Assistant', 'ai-study-assistant', 'AI-powered learning companion', 'An intelligent chatbot that helps students with their studies using natural language processing.', 'completed', 'AI/ML', true, '["Python", "TensorFlow", "Flask", "React"]', '2023-09-01'),
('Event Management Platform', 'event-management-platform', 'Platform for managing society events', 'Web application for organizing and managing all TEAM NST events and registrations.', 'completed', 'Web Development', false, '["Next.js", "PostgreSQL", "Tailwind CSS"]', '2023-06-01');

-- Seed sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, is_featured) VALUES
('Ahmed Hassan', 'Software Engineer', 'TechCorp', 'TEAM NST provided me with invaluable experience and networking opportunities. The projects I worked on here helped me land my dream job!', 5, true),
('Sara Ibrahim', 'Data Scientist', 'AI Solutions', 'Being part of TEAM NST was transformative. I learned more in one semester here than in all my courses combined.', 5, true),
('Bilal Ahmed', 'Student', 'NED University', 'The workshops and mentorship at TEAM NST are outstanding. Highly recommend joining if you want to grow your skills.', 5, false);

-- Seed sample achievements
INSERT INTO achievements (title, description, category, date, order_index) VALUES
('1st Place - National Hackathon 2024', 'Won first place at Pakistan''s largest student hackathon with our Smart City solution', 'Competition', '2024-03-15', 1),
('Best Innovation Award', 'Recognized for innovative IoT project at International Tech Conference', 'Award', '2023-11-20', 2),
('100+ Members Milestone', 'Reached 100 active members, making us one of the largest tech societies', 'Milestone', '2023-09-01', 3);

-- Note: Password is 'admin123' - CHANGE THIS IN PRODUCTION
-- You'll need to hash this password using bcrypt before inserting
-- This is just a placeholder comment
-- INSERT INTO users (email, password_hash, role) VALUES
-- ('admin@teamnst.com', '$2a$10$...hashed_password...', 'admin');
