import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
  const response = await axios.get('http://localhost:3001/users');
  const user = response.data.find(u => u.email === email && u.password === password);
  if (user) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } else {
    dispatch({ type: 'LOGIN_FAIL' });
  }
};
