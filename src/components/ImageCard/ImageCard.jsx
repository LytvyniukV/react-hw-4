import css from './ImageCard.module.css';
export const ImageCard = ({ imgUrl, imgDescription }) => {
  return (
    <>
      <img src={imgUrl} alt={imgDescription} className={css.img} width={280} />
    </>
  );
};
