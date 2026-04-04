import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../Style/chat.css";

function Chat() {
    const navigate = useNavigate();
    const { id } = useParams();
    const shopId = id;

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);
    const [shopOwnerId, setShopOwnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    // Validate and decode user token
    useEffect(() => {
        try {
            const token = localStorage.getItem("Usertoken");
            if (!token) {
                setError("No authentication token found. Please login.");
                navigate("/user-login");
                return;
            }
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        } catch (err) {
            console.error("Token decode error:", err);
            setError("Invalid token. Please login again.");
            navigate("/user-login");
        }
    }, [navigate]);

    // Load shop owner ID and chat history
    useEffect(() => {
        if (!userId) return;

        const fetchShopData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/shops/shopowner/${shopId}`);
                const shopData = await response.json();
                
                if (shopData && shopData._id) {
                    const shopOwnerId = shopData._id;
                    setShopOwnerId(shopOwnerId);
                    
                    // Load chat history
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
                }
            } catch (error) {
                console.error("Error loading shop or chat history:", error);
                setError("Failed to load chat history");
            } finally {
                setLoading(false);
            }
        };

        fetchShopData();
    }, [userId, shopId]);

    // Setup socket connection
    useEffect(() => {
        if (!shopOwnerId) return;

        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);

        // Join room for this user-shop conversation
        newSocket.emit("join_room", { 
            userId, 
            shopId, 
            shopOwnerId, 
            userType: "user" 
        });

        newSocket.on("receive_message", (data) => {
            // Add received message
            console.log("User received message:", data);
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
            sender: "user",
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

    if (loading || !userId) {
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
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>➤</button>
            </div>
        </div>
    );
}

export default Chat;