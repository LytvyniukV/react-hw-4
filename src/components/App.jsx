import { useState } from 'react';
import { getImages } from '../JS/request';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const handleSearch = async query => {
    try {
      setLoading(true);
      const { results, total_pages } = await getImages({
        page: page,
        query: query,
      });
      setImages([...images, ...results]);
      setTotalPages(total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
}

export default App;
