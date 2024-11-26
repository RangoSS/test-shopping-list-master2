import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchShoppingLists } from './actions/shoppingListActions';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchShoppingLists(searchTerm));
  };

  return (
    <form onSubmit={handleSearch} className="form-inline">
      <input type="text" placeholder="Search" className="form-control mr-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button type="submit" className="btn btn-secondary">Search</button>
    </form>
  );
};

export default SearchBar;
