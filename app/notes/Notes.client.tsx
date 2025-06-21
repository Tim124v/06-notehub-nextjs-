'use client';

import { useState } from 'react';
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/NoteModal/NoteModal";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '@/lib/api';
import { Note, CreateNoteRequest } from '@/types/note';
import styles from './NotesPage.module.css';

export default function NotesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleCreateNote = (noteData: CreateNoteRequest) => {
    createMutation.mutate(noteData);
  };

  const filteredNotes = notes.filter((note: Note) => {
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <div>
      <div className={styles.toolbar}>
        <h1>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox 
            value={searchQuery}
            onChange={handleSearch}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className={styles.button}
          >
            Create New Note
          </button>
        </div>
      </div>
      
      <NoteList 
        notes={filteredNotes}
        onDelete={handleDelete}
        isDeletePending={deleteMutation.isPending}
      />
      
      {isModalOpen && (
        <NoteModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateNote}
          isPending={createMutation.isPending}
        />
      )}
    </div>
  );
} 