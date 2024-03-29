import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from './search.svg';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  // SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled.jsx';

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
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          name="inputValue"
          id="search"
          placeholder="Search images and photos"
          value={search}
          onChange={handleInput}
        />
        <SearchButton type="submit">
          <SearchIcon width="22" height="22" />
          {/* <SearchButtonLabel>Search</SearchButtonLabel> */}
        </SearchButton>
      </SearchForm>
    </SearchbarHeader>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
