import NotesClient from "./Notes.client";
import styles from './NotesPage.module.css';

export default async function NotesPage() {
  return (
    <div className={styles.notesPageWrapper}>
      <div className={styles.pageContainer}>
        <NotesClient />
      </div>
    </div>
  );
} 