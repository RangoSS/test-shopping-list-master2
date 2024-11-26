import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingLists } from './actions/shoppingListActions';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector(state => state.shoppingLists.shoppingLists);
  const userId = useSelector(state => state.auth.user.id);

  useEffect(() => {
    dispatch(getShoppingLists(userId));
  }, [dispatch, userId]);

  return (
    <div className="shopping-lists">
      {shoppingLists.map(list => (
        <div key={list.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{list.name}</h5>
            {list.items.map(item => (
              <ShoppingListItem key={item.id} item={item} listId={list.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
