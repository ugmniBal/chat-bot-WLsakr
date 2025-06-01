'use client'
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages([...newMessages, { type: 'bot', text: data.reply }]);
    } catch {
      setMessages([...newMessages, { type: 'bot', text: 'GPT 응답 오류' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff6f2'
    }}>
      <div style={{
        width: 360,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0 0 15px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#60a5fa', fontWeight: 'bold', fontSize: 24 }}>REVO 챗봇</h1>
        <div style={{
          backgroundColor: '#f0faff',
          borderRadius: 12,
          padding: 10,
          height: 300,
          overflowY: 'auto',
          marginTop: 16,
          marginBottom: 10
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              margin: '4px 0',
              padding: '6px 12px',
              borderRadius: 20,
              backgroundColor: m.type === 'user' ? '#ffe4e6' : '#ccfbf1',
              alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              display: 'inline-block'
            }}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div style={{
              backgroundColor: '#ccfbf1',
              padding: '6px 12px',
              borderRadius: 20,
              display: 'inline-block',
              maxWidth: '80%'
            }}>
              GPT 응답 중...
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="text"
            placeholder="무엇이 궁금한가요?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '6px 12px',
              borderRadius: 20,
              border: '1px solid #ccc'
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button onClick={handleSend} style={{
            width: 36,
            height: 36,
            backgroundColor: '#7dd3fc',
            borderRadius: '50%',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>▶</button>
        </div>
      </div>
    </main>
  );
}