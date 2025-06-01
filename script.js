document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const message = input.value;
  input.value = "";
  appendMessage("user", message);
  appendMessage("bot", "GPT 응답 중...");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  document.querySelectorAll(".bot").slice(-1)[0].textContent = data.answer;
});

function appendMessage(role, text) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = role;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
