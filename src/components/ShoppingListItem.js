import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteShoppingList } from './actions/shoppingListActions';

const ShoppingListItem = ({ item, listId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteShoppingList(listId));
  };

  return (
    <div className="shopping-list-item">
      <p>{item.name} (x{item.quantity}) - {item.category}</p>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
};

export default ShoppingListItem;
