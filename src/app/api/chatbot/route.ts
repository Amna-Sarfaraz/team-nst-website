import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// Simple FAQ-based chatbot
// For production, integrate with OpenAI or other AI service

const FAQ_RESPONSES: Record<string, string> = {
  join: 'To join TEAM NST, visit our Contact page and fill out the application form. We accept new members at the beginning of each semester. You\'ll need to provide your details, interests, and why you want to join.',
  
  events: 'We organize various events including workshops, hackathons, tech talks, and coding competitions throughout the year. Check our Events page for upcoming activities!',
  
  projects: 'TEAM NST works on diverse projects ranging from web and mobile applications to IoT, AI/ML, and blockchain solutions. Visit our Projects page to see our portfolio.',
  
  requirements: 'No prior experience is required to join TEAM NST! We welcome students of all skill levels. We provide training and mentorship to help you learn and grow.',
  
  contact: 'You can reach us at info@teamnst.com or visit our office at NED University. Follow us on social media for updates: Facebook, Instagram, and LinkedIn.',
  
  membership: 'TEAM NST membership is open to all NED University students. Benefits include hands-on project experience, mentorship, networking opportunities, and participation in competitions.',
  
  default: 'I\'m here to help! You can ask me about joining TEAM NST, our events, projects, membership benefits, or how to contact us. What would you like to know?',
};

function findBestResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('join') || lowerMessage.includes('member')) {
    return FAQ_RESPONSES.join;
  }
  
  if (lowerMessage.includes('event') || lowerMessage.includes('workshop') || lowerMessage.includes('hackathon')) {
    return FAQ_RESPONSES.events;
  }
  
  if (lowerMessage.includes('project')) {
    return FAQ_RESPONSES.projects;
  }
  
  if (lowerMessage.includes('require') || lowerMessage.includes('experience') || lowerMessage.includes('skill')) {
    return FAQ_RESPONSES.requirements;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return FAQ_RESPONSES.contact;
  }
  
  if (lowerMessage.includes('benefit') || lowerMessage.includes('why join') || lowerMessage.includes('advantage')) {
    return FAQ_RESPONSES.membership;
  }
  
  return FAQ_RESPONSES.default;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid message',
        },
        { status: 400 }
      );
    }

    // For production, integrate with AI service:
    // const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'You are a helpful assistant for TEAM NST...'
    //       },
    //       {
    //         role: 'user',
    //         content: message
    //       }
    //     ],
    //   }),
    // });

    // Simple FAQ-based response
    const response = findBestResponse(message);

    return NextResponse.json({
      success: true,
      message: response,
    });
  } catch (error: any) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process message',
        message: FAQ_RESPONSES.default,
      },
      { status: 500 }
    );
  }
}
