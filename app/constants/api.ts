export const APIEndpoints = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  REFRESH_TOKEN: '/refresh-token',
  TODOS: '/v1/todos',
  EDIT_TODOS: '/v1/editTodo',
  DELETE_TODOS: (todo_id: number) => `/v1/todos?todo_id=${todo_id}`,
};
