import React, { useState } from "react";
import "../Style/ShopOwner/Messages.css";

const initialThreads = [
  {
    id: 1,
    sender: "John Doe",
    messages: [
      { type: "received", text: "Hi, I need help with my service...", time: "2:30 PM" },
      { type: "sent", text: "Hello John, how can I assist you?", time: "2:35 PM" },
    ],
  },
  {
    id: 2,
    sender: "System",
    messages: [
      { type: "received", text: "Payment received for Order #1234", time: "1d ago" },
    ],
  },
];

const Messages = () => {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThread, setActiveThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    const updatedThread = {
      ...activeThread,
      messages: [...activeThread.messages, { type: "sent", text: newMessage, time: currentTime }],
    };

    setActiveThread(updatedThread);
    setThreads(threads.map(t => (t.id === updatedThread.id ? updatedThread : t)));
    setNewMessage("");
  };

  const filteredThreads = threads.filter(thread => {
    const senderMatch = thread.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const messagesMatch = thread.messages.some(msg =>
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return senderMatch || messagesMatch;
  });

  return (
    <div className="messages-dashboard">
      {/* Sidebar / Sender List */}
      <div className={`messages-sidebar ${activeThread ? "hide-on-mobile" : ""}`}>
        <input
          type="text"
          placeholder="Search messages..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="thread-list">
          {filteredThreads.map(thread => (
            <li
              key={thread.id}
              className="thread-item"
              onClick={() => setActiveThread(thread)}
            >
              <div className="thread-sender">{thread.sender}</div>
              <div className="thread-snippet">
                {thread.messages[thread.messages.length - 1].text}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      {activeThread && (
        <div className="messages-chat">
          <div className="chat-header">
            <button className="back-btn" onClick={() => setActiveThread(null)}>
              &#8592; Back
            </button>
            <h3>{activeThread.sender}</h3>
          </div>
          <div className="chat-messages">
            {activeThread.messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <span>{msg.text}</span>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
