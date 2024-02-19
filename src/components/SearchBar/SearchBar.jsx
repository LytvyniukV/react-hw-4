import { IoSearch } from 'react-icons/io5';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const notify = () => toast('Please enter search term!');
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.query.value;
    if (query.trim() === '') {
      notify();
      return;
    }
    onSearch(query);
    form.reset();
  };

  const onChangeSearch = e => {
    const query = e.target.value;
    if (query.trim() !== '') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          onChange={onChangeSearch}
        />
        {isButtonActive && (
          <button type="submit" className={css.btn}>
            <IoSearch size={20} className={css.icon} />
          </button>
        )}
      </form>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: 'coral',
            color: 'white',
          },
          position: 'top-right',
        }}
      />
    </header>
  );
};
