import { useState } from 'react';
import { getImages } from '../JS/request';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  const handleSearch = async query => {
    try {
      setLoading(true);
      const { results, total_pages } = await getImages({
        page: page,
        query: query,
        per_page: 30,
      });
      if (total_pages <= page) setPage(1);
      setImages([...images, ...results]);
      if (filter !== query) setImages([...results]);
      setPage(page + 1);
      setTotalPages(total_pages);
      setFilter(query);
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
      {totalPages > page && <LoadMoreBtn onLoad={() => handleSearch(filter)} />}
    </>
  );
}

export default App;
