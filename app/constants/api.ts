export const APIEndpoints = {
  TODOS: '/v1/todos',
  LOGIN: '/v1/login',
  REFRESH_TOKEN: '/v1/refresh-token',
  EDIT_TODOS: '/v1/editTodo',
  DELETE_TODOS: (todo_id: number) => `/v1/todos?todo_id=${todo_id}`,
};
