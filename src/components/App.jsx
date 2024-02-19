import { useEffect, useState } from 'react';
import { getImages } from '../JS/request';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

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
  //налаштовує сторінку для пагінації
  const setCurrentPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  //виконує запит при зміні фільтру або сторінки
  useEffect(() => {
    if (!filter) return;
    //функція запиту
    const handleSearch = async () => {
      try {
        setLoading(true);
        const { results, total_pages } = await getImages({
          page: page,
          query: filter,
          per_page: 30,
        });
        setImages(prevImages => {
          return [...prevImages, ...results];
        });
        setTotalPages(total_pages);
        if (page === total_pages) toast('There are no images left');
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [filter, page]);

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
      {page !== totalPages && <LoadMoreBtn onLoad={setCurrentPage} />}
      <ImageModal
        handleCloseModal={handleCloseModal}
        imgUrl={bigImage}
        imgDescription={imageDescription}
        showModal={isModalOpen}
      />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
          position: 'top-right',
        }}
      />
    </>
  );
}

export default App;
