'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { deleteNote } from '@/lib/api';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const getTagClassName = (tag: Note['tag']) => {
  switch (tag) {
    case 'Todo':
      return `${css.tag} ${css.todo}`;
    case 'Work':
      return `${css.tag} ${css.work}`;
    case 'Personal':
      return `${css.tag} ${css.personal}`;
    case 'Meeting':
      return `${css.tag} ${css.meeting}`;
    case 'Shopping':
      return `${css.tag} ${css.shopping}`;
    default:
      return css.tag;
  }
};

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

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
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList; 