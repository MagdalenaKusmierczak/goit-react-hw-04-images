import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInput = evt => {
    setSearch(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const trimInput = evt.target.elements.inputValue.value.trim();
    onSubmit(trimInput);
    evt.target.reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          name="inputValue"
          id="search"
          placeholder="Search images and photos"
          value={search}
          onChange={handleInput}
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
