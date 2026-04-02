import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../Style/chat.css";

const socket = io(import.meta.env.VITE_API_URL);

function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);


    useEffect(() => {

        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", message);
            setChat((prev) => [...prev, { message, sender: "user", time: new Date().toLocaleTimeString() }]);
            setMessage("");
        }
    };

    return (
        <div className="chat-wrapper">

            {/* Header */}
            <div className="chat-header">
                <div className="chat-user">
                    <img
                       src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                        alt="user"
                        className="chat-avatar"
                    />
                    <div>
                        <h3>Shop Support</h3>
                        <span className="status online">● Online</span>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-box">
                {chat.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.sender === "user" ? "user" : "owner"
                            }`}
                    >
                        <p>{msg.message}</p>
                        <span>{msg.time}</span>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>➤</button>
            </div>

        </div>
    );
}

export default Chat;