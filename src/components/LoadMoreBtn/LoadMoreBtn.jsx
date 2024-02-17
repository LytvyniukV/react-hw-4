import css from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ onLoad }) => {
  return (
    <button className={css.btn} onClick={onLoad} type="button">
      Load More
    </button>
  );
};
