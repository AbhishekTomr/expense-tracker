import { NextResponse } from "next/server";
import { getExpensesByBudget } from "@/actions/expense";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userEmail } = await req.json();

    const allExpenses = await getExpensesByBudget(null, userEmail);
    const prompt = `
      You are a helpful financial assistant.
      Analyze the following expense data and return:
      - total spend
      - top 3 categories
      - spending pattern or suggestion
      Keep the tone friendly and short.
      Data: ${JSON.stringify(
        allExpenses
      )} return response in jsx format use list for every answer to display answer in new line.
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    const insights = await result.text;

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights." },
      { status: 500 }
    );
  }
}
