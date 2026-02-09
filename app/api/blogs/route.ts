import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const tag = searchParams.get('tag')

    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (published === 'true') {
      query = query.eq('published', true)
    }

    if (tag) {
      query = query.contains('tags', [tag])
    }

    const { data: blogs, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: blogs })
  } catch (error) {
    console.error('Blogs fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert([{ ...body, slug }])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create blog' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error) {
    console.error('Blog creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
