import css from './ImageGallery.module.css';
import { ImageCard } from '../ImageCard/ImageCard';
export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.list}>
      {images.map(({ id, description, urls: { small } }) => {
        return (
          <li key={id} className={css.item}>
            <ImageCard imgDescription={description} imgUrl={small} />
          </li>
        );
      })}
    </ul>
  );
};
