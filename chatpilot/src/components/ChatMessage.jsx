export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`chat-bubble-wrapper ${isUser ? 'agent' : 'visitor'}`}>
        <div className="chat-bubble">
          <div className="message-text">{message.text}</div>
          <div className="message-time">
            {typeof message.timestamp === 'string'
              ? message.timestamp
              : message.timestamp.toLocaleTimeString()}
          </div>

        </div>
      </div>
    </div>
  );
}
