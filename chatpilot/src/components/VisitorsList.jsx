// VisitorsList.jsx
import { useState, useEffect } from 'react';
import { visitors } from '../data/mockData';

export default function VisitorsList(props) {
  const [selectedId, setSelectedId] = useState(props.selectedVisitor?.id || visitors[0].id);

  useEffect(() => {
    const selected = visitors.find(v => v.id === selectedId);
    props.setSelectedVisitor(selected);
  }, [selectedId]);

  const handleSelectVisitor = (visitor) => {
    setSelectedId(visitor.id);
    props.setSelectedVisitor(visitor);

    // ✅ Clear unread count for this visitor when selected
    props.setUnreadCounts(prev => ({
      ...prev,
      [visitor.id]: 0
    }));
  };

  return (
    <div className="p-3">
      <h4 className="mb-3 text-primary">Visitors</h4>
      <div className="list-group">
        {visitors.map(visitor => {
          const unreadCount = props.unreadCounts?.[visitor.id] || 0;

          return (
            <button
              key={visitor.id}
              className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${
                selectedId === visitor.id ? 'active' : ''
              } ${unreadCount > 0 && selectedId !== visitor.id ? 'bg-warning' : ''}`}
              onClick={() => handleSelectVisitor(visitor)}
            >
              <img
                src={visitor.image}
                alt={visitor.name}
                className="rounded-circle"
                width="40"
                height="40"
              />
              <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                <span>{visitor.name}</span>

                {/* ✅ Show unread counter if > 0 and not selected */}
                {unreadCount > 0 && selectedId !== visitor.id && (
                  <span className="badge bg-danger rounded-pill">
                    {unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
