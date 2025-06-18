export const APIEndpoints = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROJECTS: '/v1/projects',
  EDIT_PROJECTS: '/v1/projects',
  GET_PROJECTS: '/v1/projects',
  DELETE_PROJECTS: '/v1/projects',
  TASKS: '/v1/tasks',
  EDIT_TASKS: '/v1/tasks',
  GET_TASKS: '/v1/tasks',
  DELETE_TASKS: (id: string) => `/v1/tasks?task_id=${id}`,
};
