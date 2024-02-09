import PropTypes from 'prop-types';
import { Button } from './Button.styled';
const MoreButton = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
};

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default MoreButton;
