
async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value;
  if (!userMessage) return;

  chatBox.innerHTML += `<div class="user-message">${userMessage}</div>`;
  input.value = '';
  chatBox.innerHTML += `<div class="bot-message">GPT 응답 중...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  const messages = document.getElementsByClassName('bot-message');
  messages[messages.length - 1].textContent = data.reply;
}
