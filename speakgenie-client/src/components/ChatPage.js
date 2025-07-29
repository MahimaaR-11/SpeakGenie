import React, { useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        prompt: userMessage.text,
      });

      const botMessage = {
        from: "bot",
        text: res.data.text,
      };

      setChat((prev) => [...prev, botMessage]);

      const audio = new Audio(res.data.audioUrl);
      audio.play();
    } catch (error) {
      const errorMessage = {
        from: "bot",
        text: "⚠️ Genie couldn't respond. Please try again.",
      };
      setChat((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧞 Speak with Genie</h1>
      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? "#dcf8c6" : "#f1f0f0",
            }}
          >
            <strong>{msg.from === "user" ? "You" : "Genie"}:</strong> {msg.text}
          </div>
        ))}
        {loading && <i style={{ padding: 10 }}>Genie is thinking...</i>}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          placeholder="Ask Genie anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#3f51b5",
    marginBottom: 20,
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    minHeight: 300,
    maxHeight: 400,
    overflowY: "auto",
    marginBottom: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  message: {
    padding: 10,
    borderRadius: 10,
    margin: "6px 0",
    maxWidth: "80%",
  },
  inputArea: {
    display: "flex",
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#3f51b5",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default ChatPage;



