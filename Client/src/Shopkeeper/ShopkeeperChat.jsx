import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../Style/chat.css";

function ShopOwnerChat() {
    const navigate = useNavigate();
    const { userId, shopId } = useParams();

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shopOwnerId, setShopOwnerId] = useState(null);

    // Validate and decode shop owner token
    useEffect(() => {
        try {
            const token = localStorage.getItem("ShopOwnertoken");
            if (!token) {
                setError("No authentication token found. Please login.");
                navigate("/shopowner-login");
                return;
            }
            const decodedToken = jwtDecode(token);
            setShopOwnerId(decodedToken.id);
        } catch (err) {
            console.error("Token decode error:", err);
            setError("Invalid token. Please login again.");
            navigate("/shopowner-login");
        }
    }, [navigate]);

    // Load chat history
    useEffect(() => {
        if (!shopOwnerId) return;

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
                setError("Failed to load chat history");
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
            console.log("Owner received message:", data);
            setChat((prev) => [...prev, data]);
        });

        newSocket.on("error", (error) => {
            console.error("Socket error:", error);
        });

        return () => {
            newSocket.off("receive_message");
            newSocket.off("error");
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
        
        // Send to server - don't add locally, wait for server broadcast
        socket.emit("send_message", msgData);
        setMessage("");
    };

    if (error) {
        return <div className="chat-wrapper" style={{ padding: "20px", color: "red" }}>{error}</div>;
    }

    if (loading || !shopOwnerId) {
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
