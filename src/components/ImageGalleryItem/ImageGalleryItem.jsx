import PropTypes from 'prop-types';
import {
  ImageGalleryLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <>
      <ImageGalleryLi id={image.id} onClick={onClick}>
        <ImageGalleryItemImg
          src={image.webformatURL}
          alt={image.tags}
          name={image.largeImageURL}
        />
      </ImageGalleryLi>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
