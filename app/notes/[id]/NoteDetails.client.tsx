'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetails({ noteId }: NoteDetailsProps) {

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(Number(noteId)),
  });


  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const createdDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {createdDate}</p>
      </div>
    </div>
  );
}