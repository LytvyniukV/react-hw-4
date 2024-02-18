import css from './ImageCard.module.css';
export const ImageCard = ({ imgUrl, imgDescription = 'image' }) => {
  return (
    <>
      <img src={imgUrl} alt={imgDescription} className={css.img} width={280} />
    </>
  );
};
