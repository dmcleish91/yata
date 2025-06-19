import type { APIResponse } from "~/types/auth";
import ax from "./client";

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

export async function fetchData<T>(url: string): Promise<T> {
  const res = await ax.get(url);
  return res.data;
}

export async function createResource<T, R>(
  url: string,
  payload: T,
): Promise<APIResponse<R>> {
  const response = await ax.post<APIResponse<R>>(url, payload);
  return response.data;
}

export async function editResource<T, R>(
  url: string,
  payload: T,
  method: HttpMethod = HttpMethod.POST,
): Promise<APIResponse<R>> {
  let response;
  if (method === HttpMethod.PUT) {
    response = await ax.put<APIResponse<R>>(url, payload);
  } else {
    response = await ax.post<APIResponse<R>>(url, payload);
  }
  return response.data;
}

export async function deleteResource(url: string): Promise<boolean> {
  const response = await ax.delete(url);
  return response.data.rows_affected === 1;
}
