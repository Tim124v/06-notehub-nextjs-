'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import styles from './NotesPage.module.css';

const NoteModal = dynamic(() => import('@/components/NoteModal/NoteModal'), { ssr: false });

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
}

function NotesClientContent({ initialNotes }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    retry: false,
  });

  const filteredNotes = useMemo(() => {
    const notes = data?.notes || [];
    if (!searchQuery) {
      return notes;
    }
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data?.notes, searchQuery]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <h1>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.button}
          >
            Create New Note
          </button>
        </div>
      </div>

      {isLoading ? <p>Loading...</p> : <NoteList notes={filteredNotes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
        />
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default function NotesClient({ initialNotes }: NotesClientProps) {
  return <NotesClientContent initialNotes={initialNotes} />;
}

