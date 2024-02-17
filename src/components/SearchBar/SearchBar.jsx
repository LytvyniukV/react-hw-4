import { IoSearch } from 'react-icons/io5';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

export const SearchBar = ({ onSearch }) => {
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
        />
        <button type="submit" className={css.btn}>
          <IoSearch size={20} className={css.icon} />
        </button>
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
