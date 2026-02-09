import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const status = searchParams.get('status');

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error: any) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Add authentication check here
    // Verify admin token

    const { data, error } = await supabase
      .from('projects')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create project',
      },
      { status: 500 }
    );
  }
}
