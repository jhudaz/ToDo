import axios from 'axios';
const apiUrl = 'http://localhost:7000';

//action to get all the to dos from the user
export function getToDos(token) {
  console.log('id del usuario para traer los registros:', token)
  return dispatch => {
    return axios
      .get(`${apiUrl}/todos/todo`, { params: { token } })
      .then(res => {
        dispatch({
          type: "GET_TO_DOS",
          payload: res.data
        })
      })
      .catch(err => {
        throw err
      })
  }
}

//action to get de user who  log in the app
export function getUser(token) {
  console.log('id del usuario:', token)
  return dispatch => {
    return axios
      .get(`${apiUrl}/users/getUser`, { params: { token } })
      .then(res => {
        dispatch({
          type: "GET_USER",
          payload: res.data
        })
      })
      .then(res => {
        dispatch(
          getToDos(token)
        )
      })
      .catch(err => {
        throw err;
      })
  }
}
//action to update the  todo state
export function updateToDoState(id, done, token) {
  return dispatch => {
    return axios
      .put(`${apiUrl}/todos/todoState`, { id, done })
      .then(res =>{
        dispatch(
          getToDos(token)
        )
      })
      .catch(err =>{
        throw err
      })
  }
}

//action to return to the login
export function logOut() {
  return {
    type: "LOG_OUT"
  }
}