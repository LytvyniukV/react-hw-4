import { useEffect, useState } from 'react';
import { getImages } from '../JS/request';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './ImageModal/ImageModal';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  //налаштовує стейти при новому пошуку
  const onChangeSearch = query => {
    setPage(1);
    setImages([]);
    setFilter(query);
    setTotalPages(1);
    setError(false);
  };

  //виконує запит при зміні фільтру
  useEffect(() => {
    if (!filter) return;
    handleSearch();
  }, [filter]);

  //функція запиту
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { results, total_pages } = await getImages({
        page: page,
        query: filter,
        per_page: 30,
      });

      setImages([...images, ...results]);
      setPage(page + 1);
      setTotalPages(total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onImageClick = (imgUrl, imgDescription) => {
    setBigImage(imgUrl);
    setImageDescription(imgDescription);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBigImage('');
    setImageDescription('');
  };
  return (
    <>
      <SearchBar onSearch={onChangeSearch} />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {totalPages > page && <LoadMoreBtn onLoad={handleSearch} />}

      <ImageModal
        handleCloseModal={handleCloseModal}
        imgUrl={bigImage}
        imgDescription={imageDescription}
        showModal={isModalOpen}
      />
    </>
  );
}

export default App;
