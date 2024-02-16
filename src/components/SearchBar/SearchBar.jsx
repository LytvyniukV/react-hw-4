import { IoSearch } from 'react-icons/io5';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.query.value;
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
    </header>
  );
};
