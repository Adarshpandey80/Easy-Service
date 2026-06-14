import React, { useEffect, useRef, useState } from "react";
import "../Style/AI.css";

function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const api = `${import.meta.env.VITE_API_URL}/ai/request/text`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const currentMessage = input;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Add empty AI message
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "",
        },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        // SSE handling
        const lines = chunk.split("\n");

        for (let line of lines) {
          if (!line.startsWith("data:")) continue;

          const data = line.replace("data:", "").trim();

          if (data === "[DONE]") {
            setLoading(false);
            return;
          }

          aiText += data;

          setMessages((prev) => {
            const updated = [...prev];

            updated[updated.length - 1] = {
              role: "ai",
              text: aiText,
            };

            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.role}`}
            >
              {msg.text}

              {loading &&
                index === messages.length - 1 &&
                msg.role === "ai" && (
                  <span className="cursor">▌</span>
                )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form
          className="chat-input"
          onSubmit={handleSend}
        >
          <input
            type="text"
            placeholder="Ask Easy-Service AI..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AI;