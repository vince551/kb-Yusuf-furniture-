import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const Body = z.object({
  message: z.string().trim().min(2).max(1200),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(12).optional().default([]),
});

const businessContext = `
You are the AI Interior Concierge for KB Yusuf Furniture International Limited, Abuja, Nigeria.
Business: furniture and interior decorations.
Phone: +234 810 973 0941.
Email: kbyusufurniture@gmail.com.

Rules:
- Be warm, concise, practical and premium in tone.
- Help customers choose furniture and plan interiors by room, style, dimensions, materials, colours and intended use.
- The website intentionally has NO public prices. Never invent, estimate or display a price.
- Never invent stock, availability, delivery dates or product specifications.
- If a customer asks for a quotation, explain that the website uses a quotation/request process and invite them to add pieces to the Bag or contact the team.
- Do not pretend to be a human employee. Clearly identify yourself as the AI concierge when relevant.
- Do not ask for unnecessary sensitive personal information.
- When useful, suggest Living, Dining, Bedroom, Office or Interior Decoration directions.
- Customers can browse the website's complete 56-image furniture collection and request a quotation for pieces they like.
`;

export async function POST(req: Request) {
  try {
    const body = Body.parse(await req.json());

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        reply: 'The AI Concierge is connected to the website, but its Gemini service key has not been added to the deployment yet. Please use the Contact or WhatsApp options for now.'
      }, { status: 503 });
    }

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: businessContext,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 700,
      },
    });

    const historyText = body.history.length
      ? body.history.map(item => `${item.role === 'user' ? 'Customer' : 'Concierge'}: ${item.content}`).join('\n')
      : 'No previous conversation.';

    const prompt = `${historyText}\nCustomer: ${body.message}\n\nRespond as the KB Yusuf Furniture AI Concierge. Give a useful answer and, when appropriate, a clear next step. Keep it under about 180 words.`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();

    return NextResponse.json({ reply: reply || 'I can help you plan the space. Tell me which room you are working on and the style you want.' });
  } catch (error) {
    console.error('Concierge error:', error);
    return NextResponse.json({
      reply: 'I could not complete that request right now. Please try again, or contact KB Yusuf Furniture directly on WhatsApp or email.'
    }, { status: 500 });
  }
}
