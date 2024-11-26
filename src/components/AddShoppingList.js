import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShoppingList } from './actions/shoppingListActions';

const AddShoppingList = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShoppingList = {
      userId,
      name,
      items: [{ name, quantity, notes, category, image, dateAdded: new Date() }],
      dateAdded: new Date()
    };
    dispatch(addShoppingList(newShoppingList));
    // Reset the form
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input type="text" placeholder="List Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Quantity" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="text" placeholder="Notes" className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <input type="text" placeholder="Category" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" className="btn btn-primary">Add List</button>
    </form>
  );
};

export default AddShoppingList;
