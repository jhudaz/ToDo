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
      }
    default:
      return state
  }
}