"use client";
import React, { useState } from 'react';
import { Note, CreateNoteRequest } from '@/types/note';
import css from './NoteForm.module.css';

export interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (data: CreateNoteRequest) => void;
  isPending: boolean;
}

const initialValues = {
  title: '',
  content: '',
  tag: 'Todo' as Note['tag'],
};

function NoteForm({ onCancel, onSubmit, isPending }: NoteFormProps) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (formData.content.length > 500) {
      newErrors.content = 'Content must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        content: formData.content,
        tag: formData.tag,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
          </div>
      
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
          </div>
      
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
        >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
        </select>
          </div>
      
          <div className={css.actions}>
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={onCancel}
          disabled={isPending}
        >
              Cancel
            </button>
        <button 
          type="submit" 
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
    </form>
  );
}

export default NoteForm; 