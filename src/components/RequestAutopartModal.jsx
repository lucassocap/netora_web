import RequestAutopartForm from './RequestAutopartForm';

export default function RequestAutopartModal({ open, onClose }) {
  if (!open) return null;
  // Close modal if click outside content
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(20,20,30,0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
        backdropFilter: 'blur(2px)',
      }}
      onClick={handleBackdrop}
    >
      <div
        className="modal-content"
        style={{
          background: 'rgba(24,24,40,0.98)',
          padding: 0,
          borderRadius: 18,
          position: 'relative',
          maxWidth: 540,
          width: '100%',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 18,
            fontSize: 28,
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 2,
            lineHeight: 1,
            padding: 0,
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <div style={{padding: 36}}>
          <RequestAutopartForm onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}
