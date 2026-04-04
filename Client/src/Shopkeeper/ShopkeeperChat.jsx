import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../Style/chat.css";

function ShopOwnerChat() {
    const { userId, shopId } = useParams();

    const token = localStorage.getItem("ShopOwnertoken");
    const decodedToken = jwtDecode(token);
    const shopOwnerId = decodedToken.id; 

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load chat history
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const chatResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/chat/history/${userId}/${shopOwnerId}`
                );
                const chatData = await chatResponse.json();
                
                if (chatData.success && chatData.messages) {
                    // Format messages from DB
                    const formattedMessages = chatData.messages.map((msg) => ({
                        message: msg.text,
                        sender: msg.senderModel === "User" ? "user" : "owner",
                        userId: msg.sender,
                        shopId,
                        time: new Date(msg.createdAt).toLocaleTimeString(),
                    }));
                    setChat(formattedMessages);
                }
            } catch (error) {
                console.error("Error loading chat history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatHistory();
    }, [userId, shopOwnerId, shopId]);

    // Setup socket connection
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);

        // Join room for this user-shop conversation
        newSocket.emit("join_room", { 
            userId, 
            shopId, 
            shopOwnerId, 
            userType: "owner" 
        });

        newSocket.on("receive_message", (data) => {
            // Add received message
            setChat((prev) => [...prev, data]);
        });

        return () => {
            newSocket.off("receive_message");
            newSocket.disconnect();
        };
    }, [userId, shopId, shopOwnerId]);

    const sendMessage = () => {
        if (!message.trim() || !socket) return;

        const msgData = {
            message,
            sender: "owner",
            userId,
            shopId,
            shopOwnerId,
            time: new Date().toLocaleTimeString()
        };

        // Add message locally (sent)
        setChat((prev) => [...prev, msgData]);
        
        // Send to server with room info
        socket.emit("send_message", msgData);
        setMessage("");
    };

    if (loading) {
        return <div className="chat-wrapper">Loading chat...</div>;
    }

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
                        <h3>User Support</h3>
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
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>➤</button>
            </div>
        </div>
    );
}

export default ShopOwnerChat;
