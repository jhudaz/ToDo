function getInitialState() {
  return {
    todos: [],
    token: '',
    user: {
      id: '',
      name: '',
      email: ''
    },
    success: false,
  }
}
export default function (state = getInitialState(), action) {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        token: action.payload.token,
        success: action.payload.success
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload
      }
    case "GET_TO_DOS":
      return {
        ...state,
        todos: action.payload
      }
    case "LOG_OUT":
      return getInitialState();
    default:
      return state;
  }
}