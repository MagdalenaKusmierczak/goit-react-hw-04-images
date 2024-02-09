import PropTypes from 'prop-types';
import { ModalWrapper,Overlay } from './Modal.styled';
const Modal = ({ largeImageURL, tags, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <img src={largeImageURL} alt={tags} />
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
