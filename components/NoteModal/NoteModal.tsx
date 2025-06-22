"use client";

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';
import { Note } from '@/types/note';

interface NoteModalProps {
  onClose: () => void;
  note?: Note;
}

function NoteModal({ onClose, note }: NoteModalProps) {
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
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <NoteForm onClose={onClose} note={note} />
      </div>
    </div>,
    document.body
  );
}

export default NoteModal; 