import axios from 'axios';
const apiUrl = 'http://localhost:7000';

export function authenticate(email, password) {
  console.log(email, password)
  return dispatch => {
    return axios
      .post(`${apiUrl}/users/auth`, { email, password })
      .then(res => {
        dispatch({
          type: "AUTH_USER",
          payload: res.data
        })
      })
      .catch(err => {
        throw err
      })
  }
}