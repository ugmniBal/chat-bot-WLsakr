'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setMessages([...newMessages, { type: 'gpt', text: 'GPT 응답 중...' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages([...newMessages, { type: 'gpt', text: data.response }]);
    } catch {
      setMessages([...newMessages, { type: 'gpt', text: 'GPT 응답 오류' }]);
    }
  };

  return (
    <main style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#fff7f3', fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: 'white', padding: '20px', borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '400px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#68aebd' }}>REVO 챗봇</h2>
        <div style={{ minHeight: '200px', padding: '10px', background: '#f0f8ff', borderRadius: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              background: msg.type === 'user' ? '#ffcdd2' : '#c8facc',
              padding: '6px 12px', margin: '4px 0',
              display: 'inline-block', borderRadius: '12px'
            }}>{msg.text}</div>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="무엇이 궁금한가요?"
            style={{ flex: 1, padding: '10px', borderRadius: '12px 0 0 12px', border: '1px solid #ccc' }}
          />
          <button onClick={sendMessage} style={{
            padding: '0 20px', background: '#68aebd', color: 'white',
            border: 'none', borderRadius: '0 12px 12px 0'
          }}>▶</button>
        </div>
      </div>
    </main>
  );
}