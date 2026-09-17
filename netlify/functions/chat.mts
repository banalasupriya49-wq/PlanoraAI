import type { Context } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3-flash-preview';

type ChatRequest = {
  message?: string;
  profile?: {
    name?: string;
    techSkills?: string[];
    softSkills?: string[];
    interests?: string[];
    selectedCareerId?: string;
    skillLevel?: string;
    goals?: string[];
  };
  language?: string;
};

const buildSystemInstruction = (profile: ChatRequest['profile'], language: string) => {
  const p = profile ?? {};
  return [
    'You are Planora AI, a friendly, accurate and encouraging student career counselor.',
    'Give concrete, actionable next steps. Keep answers under 150 words unless asked for more.',
    '',
    'Student context:',
    `Name: ${p.name || 'a student'}`,
    `Technical skills: ${(p.techSkills || []).join(', ') || 'not specified'}`,
    `Soft skills: ${(p.softSkills || []).join(', ') || 'not specified'}`,
    `Interests: ${(p.interests || []).join(', ') || 'not specified'}`,
    `Career goal: ${p.selectedCareerId || 'not specified'}`,
    `Goals: ${(p.goals || []).join(', ') || 'not specified'}`,
    `Skill level: ${p.skillLevel || 'not specified'}`,
    `Reply in this language code: ${language || 'en'}`,
  ].join('\n');
};

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const message = (body.message || '').trim();
  if (!message) {
    return Response.json({ error: 'A "message" field is required' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message,
      config: {
        systemInstruction: buildSystemInstruction(body.profile, body.language || 'en'),
        maxOutputTokens: 800,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      return Response.json({ error: 'Empty response from model' }, { status: 502 });
    }

    return Response.json({ reply });
  } catch (error) {
    console.error('Planora chat failed', error);
    return Response.json({ error: 'The AI assistant is unavailable right now' }, { status: 502 });
  }
};

export const config = {
  path: '/api/chat',
};
