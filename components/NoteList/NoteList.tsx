'use client';

import css from './NoteList.module.css';
import { Note } from '../../types/note';
import Link from 'next/link';

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  isDeletePending: boolean;
}


const getTagClassName = (tag: Note['tag']) => {
  const tagKey = tag.toLowerCase() as keyof typeof css;
  if (css[tagKey]) {
    return `${css.tag} ${css[tagKey]}`;
  }
  return css.tag;
};

function NoteList({ notes, onDelete, isDeletePending }: NoteListProps) {
  if (!notes.length) {
    return <p>No notes found.</p>;
  }
  
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={getTagClassName(note.tag)}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button 
              className={css.button} 
              onClick={() => onDelete(note.id)}
              disabled={isDeletePending}
            >
              {isDeletePending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList; 