import css from './ImageGallery.module.css';
import { ImageCard } from '../ImageCard/ImageCard';
export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.list}>
      {images.map(({ id, description, urls: { small, regular } }) => {
        return (
          <li
            key={id}
            className={css.item}
            onClick={() => onImageClick(regular, description)}
          >
            <ImageCard imgDescription={description} imgUrl={small} />
          </li>
        );
      })}
    </ul>
  );
};
