'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search, Calendar, User, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  cover_image?: string
  tags: string[]
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    filterBlogs()
  }, [searchTerm, selectedTag, blogs])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      if (data.success) {
        const publishedBlogs = (data.data || []).filter((blog: Blog) => blog.published)
        setBlogs(publishedBlogs)
        setFilteredBlogs(publishedBlogs)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterBlogs = () => {
    let filtered = blogs

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedTag !== 'All') {
      filtered = filtered.filter((blog) => blog.tags.includes(selectedTag))
    }

    setFilteredBlogs(filtered)
  }

  const allTags = ['All', ...Array.from(new Set(blogs.flatMap((blog) => blog.tags)))]

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blogs...</p>
        </div>
      </div>
    )
  }

  const featuredBlog = filteredBlogs[0]
  const otherBlogs = filteredBlogs.slice(1)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Tech Insights & Stories
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore articles, tutorials, and insights from our tech community
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto glass-strong rounded-2xl p-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-bg-card border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-20 bg-background/80 backdrop-blur-lg z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-white shadow-lg shadow-primary/50'
                    : 'bg-bg-card text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-8 text-white">Featured Article</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blogs/${featuredBlog.slug}`}>
                <div className="glass-strong rounded-2xl overflow-hidden card-hover group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="h-80 md:h-auto bg-gradient-to-br from-primary/30 to-secondary/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredBlog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                        {featuredBlog.title}
                      </h3>
                      <p className="text-gray-400 mb-6 line-clamp-3">{featuredBlog.excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {featuredBlog.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {featuredBlog.views} views
                        </div>
                      </div>
                      <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-8 text-white">Latest Articles</h2>
          {otherBlogs.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer h-full flex flex-col">
          {/* Blog Image */}
          <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
          </div>

          {/* Blog Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2 flex-1">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                {blog.author}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {blog.views}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
