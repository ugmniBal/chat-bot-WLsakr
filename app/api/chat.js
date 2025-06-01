export async function POST(req) {
  const { message } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });
  const data = await res.json();
  return Response.json({ response: data.choices?.[0]?.message?.content || "응답 오류" });
}