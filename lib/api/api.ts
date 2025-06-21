import axios from "axios";


const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = "https://notehub-public.goit.study/api/notes";


const api = axios.create({ 
  baseURL, 
  headers: { Authorization: `Bearer ${token}` } 
});


export async function fetchNotes() {
  try {
    const response = await api.get("/");
    return response.data.notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Failed to fetch notes');
  }
}


export async function fetchNoteById(id: number) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw new Error('Failed to fetch note');
  }
}


export async function createNote(note: { title: string; content: string; tag: string }) {
  try {
    const response = await api.post("/", note);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw new Error('Failed to create note');
  }
}

export async function updateNote(id: number, note: { title?: string; content?: string; tag?: string }) {
  try {
    const response = await api.put(`/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Failed to update note');
  }
}


export async function deleteNote(id: number) {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw new Error('Failed to delete note');
  }
}
