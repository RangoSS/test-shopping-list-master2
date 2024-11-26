import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addShoppingList } from './actions/shoppingListActions';

const AddShoppingList = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  // Get user from localStorage and extract userId
  const user = JSON.parse(localStorage.getItem('user')); // Get the user object from localStorage
  const userId = user ? user.id : null; // Extract userId (if available)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User not logged in or userId not found.");
      return; // Prevent submission if no userId is available
    }

    const newShoppingList = {
      userId,
      name,
      items: [{ name, quantity, notes, category, dateAdded: new Date() }],
      dateAdded: new Date(),
    };

    // Dispatch action to add shopping list
    dispatch(addShoppingList(newShoppingList));

    // Reset the form after submission
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input
        type="text"
        placeholder="List Name"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        className="form-control"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Notes"
        className="form-control"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="form-control"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Add List
      </button>
    </form>
  );
};

export default AddShoppingList;
