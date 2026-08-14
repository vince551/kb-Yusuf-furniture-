import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const Body=z.object({message:z.string().min(2).max(1000)});

export async function POST(req:Request){
  try{
    const body=Body.parse(await req.json());
    if(!process.env.GEMINI_API_KEY){
      return NextResponse.json({reply:'The KB Yusuf Furniture AI Concierge is being prepared. Please connect GEMINI_API_KEY to activate it.'},{status:200});
    }
    const ai=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model=ai.getGenerativeModel({model:'gemini-2.5-flash'});
    const prompt=`You are the AI furniture and interior-decoration concierge for KB Yusuf Furniture International Limited in Abuja, Nigeria. Be concise, tasteful and helpful. Recommend furniture and interior-decoration ideas by room, style, materials and the customer’s stated needs. Never invent stock, availability or prices. Do not claim a product is available unless the application provides that data. If product data is unavailable, say so. Customer request: ${body.message}`;
    const result=await model.generateContent(prompt);
    return NextResponse.json({reply:result.response.text()});
  }catch{
    return NextResponse.json({reply:'Please try again.'},{status:400});
  }
}
