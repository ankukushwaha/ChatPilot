import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { socket } from '../Sockets/socket';

export default function ChatWindow(props) {
  const [newMessage, setNewMessage] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);
  const [senderType, setSenderType] = useState(() => {
    return localStorage.getItem('chat-sender-type') || 'user';
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chat-sender-type', senderType);
  }, [senderType]);


  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.messages]);

  // Listen for new messages via socket
  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      props.onSend(msg); // Pass message to parent for global handling
    };

    socket.on("new-message", handleIncomingMessage);
    return () => socket.off("new-message", handleIncomingMessage);
  }, [props.onSend]);

  // Send message handler
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      visitorId: props.selectedVisitor.id,
      sender: senderType,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit("send-message", msg); // Only emit, parent handles UI via socket
    setNewMessage('');
  };

  // Toggle user/visitor as sender
  const toggleSender = () => {
    setSenderType((prev) => (prev === 'user' ? 'visitor' : 'user'));
  };

  return (
    <div className="d-flex flex-column h-100 p-3">
      <h5 className="text-primary mb-3">Chat with {props.selectedVisitor.name}</h5>

      <div
        className="chat-messages-container mb-3 d-flex flex-column gap-2 flex-grow-1"
        style={{ overflowY: 'auto' }}
      >
        {props.messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            isHighlighted={highlightedId === i}
            sender={msg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-group">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="form-control"
          placeholder={`Type message as ${senderType}`}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
        <button className="btn btn-secondary" onClick={toggleSender}>
          Switch to {senderType === 'user' ? 'Visitor' : 'User'}
        </button>
      </div>
    </div>
  );
}
