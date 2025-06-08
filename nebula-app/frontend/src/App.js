import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    setChatLog([...chatLog, { user: true, text: prompt }]);
    setPrompt("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setChatLog((oldLog) => [...oldLog, { user: false, text: data.response }]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Nébula - Asistente Virtual</h1>
      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 10, borderRadius: 5, marginBottom: 10 }}>
        {chatLog.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.user ? "right" : "left", margin: "10px 0" }}>
            <span style={{
              display: "inline-block",
              padding: 10,
              borderRadius: 10,
              backgroundColor: msg.user ? "#4a90e2" : "#e2e2e2",
              color: msg.user ? "white" : "black",
              maxWidth: "80%"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Escribe tu mensaje aquí..."
        style={{ width: "80%", padding: 10, fontSize: 16, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: 10, fontSize: 16, borderRadius: 5 }}>
        Enviar
      </button>
    </div>
  );
}

export default App;
