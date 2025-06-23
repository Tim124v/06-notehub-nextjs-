import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import styles from './NotesPage.module.css';

export default async function NotesPage() {
  const initialNotes = await fetchNotes(1);
  
  return (
    <div className={styles.notesPageWrapper}>
      <div className={styles.pageContainer}>
        <NotesClient initialNotes={initialNotes}/>
      </div>
    </div>
  );
} 