import axios from 'axios';
import { getToDos } from './action-todos';

const apiUrl = 'http://localhost:7000';

//action to create a todo
export function createToDo(description, token) {
  return dispatch => {
    return axios
      .post(`${apiUrl}/todos/todo`, { description, UserId: token })
      .then(res => {
        dispatch(
          getToDos(token)
        )
      })
      .catch(err => {
        throw err
      })
  }
}

//action to update a todo
export function updateToDo(id, description, done, token) {
  console.log('datos:',id, description, done, token)
  return dispatch => {
    return axios
      .put(`${apiUrl}/todos/todo`, { id, description, done })
      .then(res => {
        dispatch(
          getToDos(token)
        )
      })
      .catch(err => {
        throw err
      })
  }
}
