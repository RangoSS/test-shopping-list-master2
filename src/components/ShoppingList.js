import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingLists } from './actions/shoppingListActions'; // Adjust the path as needed
import ShoppingListItem from './ShoppingListItem'; // Adjust the path as needed

const ShoppingList = () => {
  const dispatch = useDispatch();

  // Get shopping lists from Redux state
  const shoppingLists = useSelector(state => state.shoppingLists.shoppingLists);

  // Get userId from localStorage by parsing the user object
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null; // Safe access to userId

  useEffect(() => {
    if (userId) {
      // Dispatch action to get shopping lists if userId is available
      dispatch(getShoppingLists(userId));
    } else {
      console.error('User ID is not available');
    }
  }, [dispatch, userId]); // Only re-run the effect when userId or dispatch changes

  return (
    <div className="shopping-lists">
      {shoppingLists && shoppingLists.length > 0 ? (
        shoppingLists.map(list => (
          <div key={list.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{list.name}</h5>
              {list.items && list.items.length > 0 ? (
                list.items.map(item => (
                  <ShoppingListItem key={item.id} item={item} listId={list.id} />
                ))
              ) : (
                <p>No items found in this list.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No shopping lists available. Please add some shopping lists.</p>
      )}
    </div>
  );
};

export default ShoppingList;
