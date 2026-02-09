import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.fullName || !body.email || !body.department || !body.year || !body.whyJoin) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert application
    const { data: application, error } = await supabase
      .from('join_applications')
      .insert([{
        full_name: body.fullName,
        email: body.email,
        phone: body.phone || null,
        department: body.department,
        year: body.year,
        skills: body.skills || [],
        why_join: body.whyJoin,
        portfolio_url: body.portfolioUrl || null,
        github_url: body.githubUrl || null,
        linkedin_url: body.linkedinUrl || null,
        status: 'Pending',
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      data: application 
    }, { status: 201 })
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('join_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data: applications, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: applications })
  } catch (error) {
    console.error('Applications fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
