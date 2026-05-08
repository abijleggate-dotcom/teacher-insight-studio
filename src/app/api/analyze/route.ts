import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildAnalysisPrompt, parseAnalysisResponse } from "@/lib/analysisUtils";
import type { AnalysisRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: AnalysisRequest = await req.json();

    if (!body.studentData || !body.gradeLevel || !body.concept) {
      return NextResponse.json({ error: "Missing required fields: studentData, gradeLevel, concept" }, { status: 400 });
    }

    if (body.studentData.length > 20000) {
      return NextResponse.json({ error: "Student data too large. Please limit to 20,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = buildAnalysisPrompt(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in math education, formative assessment, and instructional design. You help teachers understand student thinking and plan next steps. You always respond with valid JSON only, no markdown, no explanations outside the JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const rawResponse = completion.choices[0]?.message?.content;
    if (!rawResponse) {
      return NextResponse.json({ error: "No response from AI. Please try again." }, { status: 500 });
    }

    const result = parseAnalysisResponse(rawResponse, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis API error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "AI returned invalid data. Please try again." }, { status: 500 });
    }

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json({ error: "Invalid OpenAI API key. Please check your configuration." }, { status: 401 });
      }
      if (error.status === 429) {
        return NextResponse.json({ error: "API rate limit reached. Please wait a moment and try again." }, { status: 429 });
      }
      return NextResponse.json({ error: `OpenAI API error: ${error.message}` }, { status: error.status ?? 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
