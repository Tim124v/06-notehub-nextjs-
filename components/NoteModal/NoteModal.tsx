"use client";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';
import { CreateNoteRequest } from '@/types/note';

interface NoteModalProps {
  onClose: () => void;
  onSubmit: (data: CreateNoteRequest) => void;
  isPending: boolean;
}

function NoteModal({ onClose, onSubmit, isPending }: NoteModalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <NoteForm 
          onCancel={onClose} 
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>
    </div>,
    document.body
  );
}

export default NoteModal; 