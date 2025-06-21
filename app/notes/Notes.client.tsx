'use client';

import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import styles from './NotesPage.module.css';

const queryClient = new QueryClient();

function NotesClientContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <div>
      <div className={styles.toolbar}>
        <h1>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.button}
          >
            Create New Note
          </button>
        </div>
      </div>

      {isLoading ? <p>Loading...</p> : <NoteList notes={notes} />}

      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default function NotesClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesClientContent />
    </QueryClientProvider>
  );
}