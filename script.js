async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const userBubble = document.createElement("div");
  userBubble.className = "message user";
  userBubble.innerText = userMessage;
  chatBox.appendChild(userBubble);

  input.value = "";

  const botBubble = document.createElement("div");
  botBubble.className = "message bot";
  botBubble.innerText = "GPT 응답 중...";
  chatBox.appendChild(botBubble);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    botBubble.innerText = data.reply;
  } catch (error) {
    botBubble.innerText = "GPT 응답 오류";
  }
}