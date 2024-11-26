import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]); // State to hold all shopping lists
  const [filteredLists, setFilteredLists] = useState([]); // State to hold filtered lists
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filterName, setFilterName] = useState(''); // Filter by name
  const [filterCategory, setFilterCategory] = useState(''); // Filter by category
  const [editingId, setEditingId] = useState(null); // ID of the shopping list being edited
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    notes: '',
  }); // Form data for editing

  useEffect(() => {
    // Fetch shopping lists from the backend
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/shoppingLists');
        setShoppingLists(response.data);
        setFilteredLists(response.data); // Initialize filtered lists with all data
      } catch (err) {
        setError('Error fetching shopping lists.');
        console.error('Error fetching shopping lists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  // Filter shopping lists by name or category
  useEffect(() => {
    const filtered = shoppingLists.filter((list) => {
      const matchesName = list.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesCategory = list.category
        ? list.category.toLowerCase().includes(filterCategory.toLowerCase())
        : true; // Match all if category is not defined
      return matchesName && matchesCategory;
    });
    setFilteredLists(filtered);
  }, [filterName, filterCategory, shoppingLists]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
      setShoppingLists((prev) => prev.filter((list) => list.id !== id)); // Update state
    } catch (err) {
      console.error('Error deleting shopping list:', err);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (list) => {
    setEditingId(list.id); // Set the ID of the list being edited
    setEditFormData({
      name: list.name,
      category: list.category,
      quantity: list.quantity,
      notes: list.notes,
    }); // Populate the form with existing data
  };

  // Handle Edit Form Change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Form Submit
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/shoppingLists/${editingId}`,
        editFormData
      );
      setShoppingLists((prev) =>
        prev.map((list) => (list.id === editingId ? { ...list, ...response.data } : list))
      ); // Update the state with the new data
      setEditingId(null); // Exit edit mode
    } catch (err) {
      console.error('Error updating shopping list:', err);
    }
  };

  // Check if data is still loading or if there was an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      {/* Filters */}
      <div className="mb-3 row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Shopping List Cards */}
      <div className="row">
        {filteredLists.length > 0 ? (
          filteredLists.map((list) =>
            editingId === list.id ? (
              // Edit Form
              <div key={list.id} className="col-md-4">
                <form onSubmit={handleEditFormSubmit} className="card p-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    className="form-control mb-2"
                    placeholder="Category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                    required
                  />
                  <input
                    type="number"
                    name="quantity"
                    className="form-control mb-2"
                    placeholder="Quantity"
                    value={editFormData.quantity}
                    onChange={handleEditFormChange}
                    required
                  />
                  <input
                    type="text"
                    name="notes"
                    className="form-control mb-2"
                    placeholder="Notes"
                    value={editFormData.notes}
                    onChange={handleEditFormChange}
                  />
                  <button type="submit" className="btn btn-success btn-sm me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            ) : (
              // Card View
              <div key={list.id} className="col-md-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{list.name}</h5>
                    <p><strong>Category:</strong> {list.category}</p>
                    <p><strong>Quantity:</strong> {list.quantity}</p>
                    <p><strong>Notes:</strong> {list.notes}</p>
                    <p><strong>Date:</strong> {new Date(list.dateAdded).toLocaleString()}</p>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditClick(list)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(list.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p>No shopping lists found matching the filters.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
