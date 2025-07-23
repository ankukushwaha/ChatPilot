// App.jsx
import { useState,useEffect } from 'react';
import VisitorsList from './components/VisitorsList';
import ChatWindow from './components/ChatWindow';
import VisitorProfile from './components/VisitorProfile';
import Header from './Header';
import { useTheme } from './Context/UseTheme';
import { visitors } from './data/mockData';

export default function App() {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const { theme } = useTheme();

  const [selectedVisitor, setSelectedVisitor] = useState(() => {
    const saved = localStorage.getItem('selected-visitor');
      return saved ? JSON.parse(saved) : visitors[0]; // fallback to first visitor
  });

  const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : {};
  }); // All messages globally

  const [unreadCounts, setUnreadCounts] = useState(() => {
  const saved = localStorage.getItem('chat-unread-counts');
    return saved ? JSON.parse(saved) : {};
  });

  const handleSendMessage = (msg) => {
  // Always update messages per visitor
  setMessages(prev => ({
    ...prev,
    [msg.visitorId]: [...(prev[msg.visitorId] || []), msg]
  }));

  // Handle unread count only for visitor messages and unselected visitor
  if (msg.visitorId !== selectedVisitor?.id) {
    setUnreadCounts(prev => ({
      ...prev,
      [msg.visitorId]: (prev[msg.visitorId] || 0) + 1
    }));
  }
};

useEffect(() => {
  if (selectedVisitor) {
    localStorage.setItem('selected-visitor', JSON.stringify(selectedVisitor));
  }
}, [selectedVisitor]);


useEffect(() => {
  localStorage.setItem('chat-messages', JSON.stringify(messages));
}, [messages]);

useEffect(() => {
  localStorage.setItem('chat-unread-counts', JSON.stringify(unreadCounts));
}, [unreadCounts]);

  return (
    <div className={`app-wrapper d-flex flex-column ${theme}`}>
      <Header />

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Left Panel */}
        {!isLeftCollapsed ? (
          <div className="left-panel border-end position-relative">
            <VisitorsList
              selectedVisitor={selectedVisitor}
              setSelectedVisitor={setSelectedVisitor}
              unreadCounts={unreadCounts} setUnreadCounts={setUnreadCounts}
            />
            <button
              className="btn collapse-btn position-absolute top-50 end-0 translate-middle-y"
              onClick={() => setIsLeftCollapsed(true)}
            >
              ❮
            </button>
          </div>
        ) : (
          <div className="collapse-toggle position-relative">
            <button
              className="btn collapse-btn m-2"
              onClick={() => setIsLeftCollapsed(false)}
            >
              ❯
            </button>
          </div>
        )}

        {/* Chat Panel */}
        <div
          className={`chat-panel d-flex flex-column  ${
            isLeftCollapsed && isRightCollapsed ? 'flex-grow-1' : 'col-6'
          }`}
        >
          <ChatWindow
            selectedVisitor={selectedVisitor}  
            messages={messages[selectedVisitor?.id] || []}
            onSend={handleSendMessage}
          />
        </div>

        {/* Right Panel */}
        {!isRightCollapsed ? (
          <div className="right-panel border-start position-relative">
            <VisitorProfile selectedVisitor={selectedVisitor} messages={messages} />
            <button
              className="btn collapse-btn position-absolute top-50 start-0 translate-middle-y"
              onClick={() => setIsRightCollapsed(true)}
            >
              ❯
            </button>
          </div>
        ) : (
          <div className="collapse-toggle position-relative">
            <button
              className="btn collapse-btn m-2"
              onClick={() => setIsRightCollapsed(false)}
            >
              ❮
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
