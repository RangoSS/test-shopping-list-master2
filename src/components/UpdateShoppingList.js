import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShoppingList } from './actions/shoppingListActions';


const UpdateShoppingList = ({ match }) => {
  const listId = match.params.id;
  const dispatch = useDispatch();
  const shoppingLists = useSelector(state => state.shoppingLists.shoppingLists);
  const list = shoppingLists.find(list => list.id === parseInt(listId));

  const [name, setName] = useState(list.name);
  const [quantity, setQuantity] = useState(list.items[0].quantity);
  const [notes, setNotes] = useState(list.items[0].notes);
  const [category, setCategory] = useState(list.items[0].category);
  const [image, setImage] = useState(list.items[0].image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = {
      ...list,
      name,
      items: [{ name: list.items[0].name, quantity, notes, category, image }]
    };
    dispatch(updateShoppingList(updatedList));
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input type="text" placeholder="List Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Quantity" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input type="text" placeholder="Notes" className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <input type="text" placeholder="Category" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" className="btn btn-primary">Update List</button>
    </form>
  );
};

export default UpdateShoppingList;
