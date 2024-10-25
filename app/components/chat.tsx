import { useState, useRef, useEffect } from "react";
import "./chat.css";

export default function Chat() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [chatInput, setChatInput] = useState<string>(''); // Input field for chat
    const [messages, setMessages] = useState<string[]>([]); // Messages sent in the chat
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true); // Track if auto-scroll is enabled
    const messageContainerRef = useRef<HTMLUListElement>(null);

    function constructSocket() {
        const newSocket = new WebSocket("ws://localhost:8080/ws");

        newSocket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.dataType == "NAME") {
                    console.log("Username = " + data.data);
                }
            } catch (error) {
                handleExternalMessage(event.data)
            }
        });

        setSocket(newSocket)
    }

    const handleExternalMessage = (new_val:string) => {
        setMessages((prevMessages) => [...prevMessages, new_val]);
    }

    const handleSendMessage = () => {
        // Check if the WebSocket is initialized and open before trying to send
        if (chatInput.trim() !== '') {
            if (socket == null) {
                // TODO if a frontend person could put a popup like "unable to connect to chat" here that would be fantastic
            } else {
                socket.send(chatInput); // Send the message
                setChatInput(''); // Clear the input field after sending
            }
        }
    };

    // Handle Enter key press in the chat input
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer && isAutoScroll) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, [messages, isAutoScroll]);

    const handleScroll = () => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            const isAtBottom = messageContainer.scrollHeight - messageContainer.scrollTop === messageContainer.clientHeight;
            setIsAutoScroll(isAtBottom);
        }
    };


    return (
        <div className="chat">
            <ul className="messageContainer" ref={messageContainerRef} onScroll={handleScroll}>
                {/* Display chat messages */}
                {messages.map((message, index) => (
                    <li key={index} className="messageList">
                        <span className="message">
                            {message}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Input field to type chat messages */}
            <div className="inputContainer">
                <input
                    type="text"
                    className="chatInput"
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress} // Add key press event
                />
                <button
                    className="sendButton"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
