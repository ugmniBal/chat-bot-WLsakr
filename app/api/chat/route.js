import { OpenAI } from "openai";

export async function POST(req) {
  const { message } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });

  return new Response(JSON.stringify({ reply: chat.choices[0].message.content }), {
    headers: { "Content-Type": "application/json" },
  });
}