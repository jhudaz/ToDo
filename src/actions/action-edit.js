import axios from 'axios';
import { getToDos } from './action-todos';

const apiUrl = 'http://localhost:7000';

export function createToDo(description, token) {
  console.log(description, token)
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