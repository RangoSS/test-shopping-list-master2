import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]); // State to hold shopping lists
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editingList, setEditingList] = useState(null); // State to track the list being edited
  const [updatedName, setUpdatedName] = useState(''); // Updated name for editing
  const [updatedQuantity, setUpdatedQuantity] = useState(''); // Updated quantity for editing
  const [updatedCategory, setUpdatedCategory] = useState(''); // Updated category for editing
  const [updatedNotes, setUpdatedNotes] = useState(''); // Updated notes for editing

  useEffect(() => {
    // Fetch shopping lists from the backend
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/shoppingLists');
        setShoppingLists(response.data);
      } catch (err) {
        setError('Error fetching shopping lists.');
        console.error('Error fetching shopping lists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  // Delete a shopping list
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
      setShoppingLists(shoppingLists.filter((list) => list.id !== id)); // Remove the list from state
    } catch (err) {
      setError('Error deleting shopping list.');
      console.error('Error deleting shopping list:', err);
    }
  };

  // Update a shopping list
  const handleUpdate = async (id) => {
    try {
      const updatedList = {
        name: updatedName,
        quantity: updatedQuantity,
        category: updatedCategory,
        notes: updatedNotes,
        dateAdded: new Date().toISOString(), // Update with the current date
      };
      const response = await axios.put(`http://localhost:3001/shoppingLists/${id}`, updatedList);
      setShoppingLists(
        shoppingLists.map((list) =>
          list.id === id ? response.data : list // Replace the updated list in the state
        )
      );
      setEditingList(null); // Close the editing form
    } catch (err) {
      setError('Error updating shopping list.');
      console.error('Error updating shopping list:', err);
    }
  };

  // Check if data is still loading or if there was an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {shoppingLists.length > 0 ? (
          shoppingLists.map((list) => (
            <div key={list.id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  {editingList === list.id ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedName}
                        placeholder="Name"
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={updatedQuantity}
                        placeholder="Quantity"
                        onChange={(e) => setUpdatedQuantity(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedCategory}
                        placeholder="Category"
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedNotes}
                        placeholder="Notes"
                        onChange={(e) => setUpdatedNotes(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdate(list.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingList(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{list.name}</h5>
                      <p><strong>Category:</strong> {list.category}</p>
                      <p><strong>Quantity:</strong> {list.quantity}</p>
                      <p><strong>Notes:</strong> {list.notes}</p>
                      <p><strong>Date:</strong> {new Date(list.dateAdded).toLocaleString()}</p>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setEditingList(list.id);
                          setUpdatedName(list.name);
                          setUpdatedQuantity(list.quantity);
                          setUpdatedCategory(list.category);
                          setUpdatedNotes(list.notes);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(list.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No shopping lists available.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
