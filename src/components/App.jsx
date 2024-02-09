import { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import MoreButton from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppWrapper } from './App.styled.jsx';
export const App = () => {
  //Declaration
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTags, setModalTags] = useState('');

  //Load more button
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  //Submit search
  const handleSubmit = input => {
    setInputValue(input);
    setImages([]);
    setCurrentPage(1);
  };

  //Update state
  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    //API call
    const fetchImages = async (inputValue, currentPage) => {
      const API_KEY = '35262306-2ee6f92f6616bfcf6c7291f6d';
      axios.defaults.baseURL = 'https://pixabay.com/api/';
      const perPage = 12;
      const response = await axios.get(
        `?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
      );
      return response.data;
    };
    //Destructuring image data
    const imagesData = responseData =>
      responseData.map(({ id, tags, webformatURL, largeImageURL }) => {
        return { id, tags, webformatURL, largeImageURL };
      });
    //Generates gallery
    const addImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(inputValue, currentPage);
        if (data.hits.length === 0) {
          return alert('Image not found');
        }
        const normalizedImages = imagesData(data.hits);
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
        setIsLoading(false);
      } catch (error) {
        console.log(`Something went wrong! ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    addImages();
  }, [inputValue, currentPage]);

  //Modal
  const handleClose = () => {
    setIsModalOpen(false);
    setModalImage('');
    setModalTags('');
  };
  const onClose = evt => {
    if (evt.target === evt.currentTarget) {
      handleClose();
    }
  };
  const handleClick = evt => {
    setIsModalOpen(true);
    setModalImage(evt.target.name);
    setModalTags(evt.target.alt);
  };
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      handleClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  });
  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery imageClick={handleClick} images={images} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && (
        <MoreButton onClick={loadMore} />
      )}
      {isModalOpen ? (
        <Modal largeImageURL={modalImage} tags={modalTags} onClose={onClose} />
      ) : null}
    </AppWrapper>
  );
};
