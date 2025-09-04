import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="rounded-2xl p-px bg-animated-border shadow-2xl shadow-stone-800/20 w-full max-w-sm transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scale-in 0.3s forwards' }}
      >
        <div className="bg-stone-900/80 backdrop-blur-xl rounded-[15px] p-6 text-white">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;