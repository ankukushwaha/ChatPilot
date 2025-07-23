export default function Modal({ type, content, onClose }) {
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{type}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {Array.isArray(content) ? (
              content.map((msg, index) => (
                <div key={index} className={`mb-2 text-${msg.from === 'visitor' ? 'start' : 'end'}`}>
                  <span
                    className={`d-inline-block p-2 rounded ${msg.from === 'visitor' ? 'bg-light text-dark' : 'bg-primary text-white'}`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
