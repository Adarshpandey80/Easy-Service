import React, { useState } from "react";
import "../Style/AI.css";

function AI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm Easy-Service AI. How can I help you today?"
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setChat((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I can help with service recommendations, troubleshooting, booking guidance, and repair suggestions."
        }
      ]);
    }, 1000);

    setMessage("");
  };

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>🤖 Easy-Service AI Assistant</h1>
        <p>
          Get instant repair advice, service recommendations,
          and troubleshooting help.
        </p>
      </div>

      <div className="suggestion-container">
        <button>My AC is not cooling</button>
        <button>Recommend a technician</button>
        <button>How much does AC repair cost?</button>
        <button>Temporary fix for water leakage</button>
      </div>

      <div className="chat-container">

        <div className="chat-messages">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask Easy-Service AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default AI;