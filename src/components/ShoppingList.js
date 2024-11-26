import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]); // State to hold shopping lists
  const [loading, setLoading] = useState(true); // Loading state to manage loading indicator
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetch shopping lists from the backend
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/shoppingLists');
        setShoppingLists(response.data); // Set the shopping lists to state
      } catch (err) {
        setError('Error fetching shopping lists.'); // Handle any errors
        console.error('Error fetching shopping lists:', err);
      } finally {
        setLoading(false); // Hide loading indicator once data is fetched
      }
    };

    fetchShoppingLists(); // Call the fetch function on mount
  }, []); // Empty dependency array means this runs once after the component mounts

  // Check if data is still loading or if there was an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {shoppingLists.length > 0 ? (
          shoppingLists.map(list => (
            <div key={list.id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{list.name}</h5>
                  <p><strong>Category:</strong> {list.category}</p>
                  <p><strong>Quantity:</strong> {list.quantity}</p>
                  <p><strong>Notes:</strong> {list.notes}</p>
                  <p><strong>Date:</strong> {list.dateAdded}</p>
                  
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
