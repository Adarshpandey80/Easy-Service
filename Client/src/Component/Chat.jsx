import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../Style/chat.css";

function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);

        newSocket.on("receive_message", (data) => {
            // Add received message from other users
            setChat((prev) => [...prev, data]);
        });

        return () => {
            newSocket.off("receive_message");
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim() || !socket) return;

        const msgData = {
            message,
            sender: "user",
            time: new Date().toLocaleTimeString()
        };

        // Add message locally (sent)
        setChat((prev) => [...prev, msgData]);
        
        // Send to server
        socket.emit("send_message", msgData);
        setMessage("");
    };

    return (
        <div className="chat-wrapper">


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


            <div className="chat-box">
                {chat.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.sender === "user" ? "user" : "owner"}`}
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