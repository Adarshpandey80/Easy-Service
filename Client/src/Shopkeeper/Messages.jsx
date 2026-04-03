import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import "../Style/ShopOwner/Messages.css";

const Messages = () => {
  const token = localStorage.getItem("shopowner");
  const decodedToken = jwtDecode(token);
  const shopOwnerId = decodedToken.id;
  const shopId = decodedToken.shopId;

  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL);
    setSocket(newSocket);

    newSocket.emit("join_room", { shopOwnerId, shopId, userType: "shopowner" });

    newSocket.on("receive_message", (data) => {
      setThreads((prevThreads) => {
        const existingThread = prevThreads.find(t => t.userId === data.userId);
        
        if (existingThread) {
          return prevThreads.map(t => 
            t.userId === data.userId 
              ? { ...t, messages: [...t.messages, { type: "received", text: data.message, time: data.time }] }
              : t
          );
        } else {
          return [...prevThreads, { userId: data.userId, sender: `User ${data.userId}`, messages: [{ type: "received", text: data.message, time: data.time }] }];
        }
      });
    });

    return () => {
      newSocket.off("receive_message");
      newSocket.disconnect();
    };
  }, [shopOwnerId, shopId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !activeThread) return;

    const msgData = {
      message: newMessage,
      sender: "owner",
      userId: activeThread.userId,
      shopId,
      shopOwnerId,
      time: new Date().toLocaleTimeString()
    };

    const updatedThread = {
      ...activeThread,
      messages: [...activeThread.messages, { type: "sent", text: newMessage, time: msgData.time }],
    };

    setActiveThread(updatedThread);
    setThreads(threads.map(t => (t.userId === updatedThread.userId ? updatedThread : t)));
    
    socket.emit("send_message", msgData);
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
              key={thread.userId}
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
