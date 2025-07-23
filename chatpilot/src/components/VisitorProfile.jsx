import { useState } from 'react';
import Modal from './Modal';
import { Eye, FileText } from 'lucide-react';

export default function VisitorProfile({ selectedVisitor, messages }) {
  const [modalData, setModalData] = useState({ isOpen: false, type: '', content: '' });

  const openModal = (type, content) => {
    setModalData({ isOpen: true, type, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', content: '' });
  };

  if (!selectedVisitor) return <div className="p-3">No visitor selected</div>;

  const visitorMessages = messages[selectedVisitor.id] || [];
  const lastChats = visitorMessages.slice(-5); // last 5 messages

function generateChatSummary(chats) {
  if (!chats || chats.length === 0) return "No chats to summarize.";

  const visitorMessages = chats.filter(msg => msg.sender === 'visitor').map(msg => msg.text.toLowerCase());
  const userMessages = chats.filter(msg => msg.sender === 'user').map(msg => msg.text.toLowerCase());

  const topics = [];

  if (visitorMessages.some(text => text.includes("price") || text.includes("cost") || text.includes("plan"))) {
    topics.push("pricing");
  }
  if (visitorMessages.some(text => text.includes("login") || text.includes("password") || text.includes("account"))) {
    topics.push("login issues");
  }
  if (visitorMessages.some(text => text.includes("order") || text.includes("refund") || text.includes("cancel"))) {
    topics.push("order/refund");
  }
  if (visitorMessages.some(text => text.includes("delay") || text.includes("late") || text.includes("delivery"))) {
    topics.push("delivery concerns");
  }

  const tone = visitorMessages.some(text => text.includes("angry") || text.includes("bad service") || text.includes("upset"))
    ? "frustrated"
    : "neutral";

  const lastUserResponse = userMessages.length
    ? `The support team replied: "${userMessages[userMessages.length - 1]}"`
    : "No response from the support team yet.";

  const summary = `
  The visitor asked about ${topics.length ? topics.join(", ") : "general queries"}.
  ${lastUserResponse}
  The visitor's tone appears to be ${tone}.
  `;

  return summary.trim();
}



  return (
    <div className="p-3">
      <h5 className="text-primary mb-3">Visitor Profile</h5>
      <p><strong>Name:</strong> {selectedVisitor.name}</p>
      <p><strong>Email:</strong> {selectedVisitor.email}</p>
      <p><strong>Phone:</strong> {selectedVisitor.phone}</p>

      {lastChats.length > 0 ? (
        <>
          <h6 className="mt-4">
            Last {lastChats.length} Chat{lastChats.length > 1 ? 's' : ''}
          </h6>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {lastChats.map((msg, idx) => (
                  <div key={idx} className="mb-1">• {msg.text}</div>
                ))}
              </span>
              <div className="d-flex flex-column gap-2">
                <Eye
                  size={18}
                  role="button"
                  title="View Full Chat"
                  onClick={() =>
                    openModal('Chat Details', lastChats)
                  }
                />
                <FileText
                  size={18}
                  role="button"
                  onClick={() => {
                    const summary = generateChatSummary(lastChats);
                    openModal('Chat Summary', summary);
                  }}
                />

              </div>
            </li>
          </ul>
        </>
      ) : (
        <p className="mt-4">No chats to show.</p>
      )}

      {modalData.isOpen && (
        <Modal
          type={modalData.type}
          content={modalData.content}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
