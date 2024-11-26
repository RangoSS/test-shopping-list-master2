import React from 'react';
import { useDispatch } from 'react-redux';

const SortFilter = () => {
  const dispatch = useDispatch();

  const handleSort = (sortBy) => {
    dispatch({ type: 'SORT_SHOPPING_LISTS', payload: sortBy });
  };

  return (
    <div className="sort-filter">
      <label>Sort by:</label>
      <select onChange={(e) => handleSort(e.target.value)} className="form-control">
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="dateAdded">Date Added</option>
      </select>
    </div>
  );
};

export default SortFilter;
