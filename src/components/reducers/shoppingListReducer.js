const initialState = {
    shoppingLists: []
  };
  
  export default function shoppingListReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_SHOPPING_LISTS':
        return { ...state, shoppingLists: action.payload };
      case 'ADD_SHOPPING_LIST':
        return { ...state, shoppingLists: [...state.shoppingLists, action.payload] };
      case 'UPDATE_SHOPPING_LIST':
        return {
          ...state,
          shoppingLists: state.shoppingLists.map(list =>
            list.id === action.payload.id ? action.payload : list
          )
        };
      case 'DELETE_SHOPPING_LIST':
        return {
          ...state,
          shoppingLists: state.shoppingLists.filter(list => list.id !== action.payload)
        };
      case 'SEARCH_SHOPPING_LISTS':
        return { ...state, shoppingLists: action.payload };
      default:
        return state;
    }
  }
  