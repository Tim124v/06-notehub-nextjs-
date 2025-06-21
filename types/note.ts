export interface Note {
  id: number;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tag?: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
} 