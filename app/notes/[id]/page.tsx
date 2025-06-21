import NoteDetails from "./NoteDetails.client";
import styles from './NoteDetails.module.css';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NoteDetailsPage(props: PageProps) {
  const { params } = props;
  const { id } = await params;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <NoteDetails noteId={id} />
      </div>
    </div>
  );
} 