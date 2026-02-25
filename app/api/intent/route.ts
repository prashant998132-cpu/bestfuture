// app/api/intent/route.ts
// ============================================================
// JARVIS - Gemini Intent Detection API
// Security: API key NEVER exposed to frontend
// Free tier: 15 req/min, 1500 req/day - Gemini 1.5 Flash
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are JARVIS - an AI tool selector assistant. 
Analyze the user's request and return ONLY a JSON object.

Categories available: image, video, writing, code, audio, chat, design, 3d, search, productivity, avatar

Return this exact format:
{
  "intent": "brief-intent-description",
  "category": "one-of-the-categories-above",
  "confidence": 0.0-1.0,
  "keywords": ["key1", "key2"]
}

Rules:
- confidence 0.9+ = very clear request
- confidence 0.7-0.9 = probably clear
- confidence below 0.7 = use "chat" category
- Support Hindi/Hinglish input
- Return ONLY JSON, no explanation`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use Flash model - free tier, very fast
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser request: "${input}"` }],
        },
      ],
      generationConfig: {
        temperature: 0.1,       // Low temp for consistent JSON
        maxOutputTokens: 200,   // Small - we only need a JSON object
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.response.text();

    // Parse and validate JSON
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Try to extract JSON from response
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Invalid JSON response');
    }

    // Validate fields
    const validCategories = ['image', 'video', 'writing', 'code', 'audio', 'chat', 'design', '3d', 'search', 'productivity', 'avatar'];
    if (!validCategories.includes(parsed.category)) {
      parsed.category = 'chat';
      parsed.confidence = 0.5;
    }

    return NextResponse.json({
      intent: parsed.intent || `${parsed.category}-task`,
      category: parsed.category,
      confidence: parsed.confidence || 0.7,
      keywords: parsed.keywords || [],
    });

  } catch (error) {
    console.error('[JARVIS Intent API] Error:', error);

    // Return graceful error - frontend will use keyword fallback
    return NextResponse.json(
      { error: 'Intent detection failed', useKeywordFallback: true },
      { status: 500 }
    );
  }
}

// Rate limiting headers
export const config = {
  runtime: 'edge',  // Faster, runs on Vercel Edge
};
