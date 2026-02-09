import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Get member count
    const { count: membersCount } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    // Get project count
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get competition count (won)
    const { count: competitionsCount } = await supabase
      .from('competitions')
      .select('*', { count: 'exact', head: true })
      .not('position', 'is', null);

    // Get achievement count
    const { count: achievementsCount } = await supabase
      .from('achievements')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      data: {
        members: membersCount || 0,
        projects: projectsCount || 0,
        competitions: competitionsCount || 0,
        achievements: achievementsCount || 0,
      },
    });
  } catch (error: any) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch statistics',
      },
      { status: 500 }
    );
  }
}
