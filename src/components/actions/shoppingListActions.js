import axios from 'axios';

// Get all shopping lists for the logged-in user
export const getShoppingLists = (userId) => async (dispatch) => {
  const response = await axios.get(`http://localhost:3001/shoppingLists?userId=${userId}`);
  dispatch({ type: 'GET_SHOPPING_LISTS', payload: response.data });
};

// Add a new shopping list
export const addShoppingList = (shoppingList) => async (dispatch) => {
  const response = await axios.post('http://localhost:3001/shoppingLists', shoppingList);
  dispatch({ type: 'ADD_SHOPPING_LIST', payload: response.data });
};

// Update an existing shopping list
export const updateShoppingList = (shoppingList) => async (dispatch) => {
  const response = await axios.put(`http://localhost:3001/shoppingLists/${shoppingList.id}`, shoppingList);
  dispatch({ type: 'UPDATE_SHOPPING_LIST', payload: response.data });
};

// Delete a shopping list
export const deleteShoppingList = (listId) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/shoppingLists/${listId}`);
  dispatch({ type: 'DELETE_SHOPPING_LIST', payload: listId });
};

// Search for items by name
export const searchShoppingLists = (searchTerm, userId) => async (dispatch) => {
  const response = await axios.get(`http://localhost:3001/shoppingLists?userId=${userId}&q=${searchTerm}`);
  dispatch({ type: 'SEARCH_SHOPPING_LISTS', payload: response.data });
};
