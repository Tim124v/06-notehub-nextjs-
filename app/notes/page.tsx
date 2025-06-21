import NotesClient from "./Notes.client";
import styles from './NotesPage.module.css';

export default function NotesPage() {
  return (
    <div className={styles.notesPageWrapper}>
      <div className={styles.pageContainer}>
        <NotesClient />
      </div>
    </div>
  );
} 