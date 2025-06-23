'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
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
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const isInitialMount = useRef(true);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, debouncedSearchQuery),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    retry: false,
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setPage(1);
    }
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
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
      
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.notes !== undefined ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
      
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
} 

export default function NotesClient({ initialNotes }: NotesClientProps) {
  return <NotesClientContent initialNotes={initialNotes} />;
}

