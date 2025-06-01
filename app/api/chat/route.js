import { OpenAI } from "openai";

export async function POST(req) {
  const { message } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return Response.json({ reply: "GPT 응답 오류" });
  }
}