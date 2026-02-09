import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data: achievements, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch achievements' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: achievements })
  } catch (error) {
    console.error('Achievements fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.description || !body.date || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: achievement, error } = await supabase
      .from('achievements')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create achievement' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: achievement }, { status: 201 })
  } catch (error) {
    console.error('Achievement creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
