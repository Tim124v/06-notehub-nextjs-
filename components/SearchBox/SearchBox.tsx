'use client';

import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (value: string) => void;
}

function SearchBox({ onChange }: SearchBoxProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchBox;