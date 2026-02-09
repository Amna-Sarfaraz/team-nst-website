import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming')

    let query = supabase
      .from('competitions')
      .select('*')
      .order('date', { ascending: false })

    if (upcoming === 'true') {
      query = query.eq('is_upcoming', true)
    }

    const { data: competitions, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch competitions' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: competitions })
  } catch (error) {
    console.error('Competitions fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.description || !body.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: competition, error } = await supabase
      .from('competitions')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create competition' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: competition }, { status: 201 })
  } catch (error) {
    console.error('Competition creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
