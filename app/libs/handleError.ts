import { isAxiosError } from './typeGuards';

export function handleError(error: unknown, context?: string) {
  const prefix = context ? `[${context}] ` : '';
  if (isAxiosError(error)) {
    console.error(`${prefix}Axios error:`, error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error(`${prefix}Error:`, error.message);
  } else {
    console.error(`${prefix}An unknown error occurred.`);
  }
}
