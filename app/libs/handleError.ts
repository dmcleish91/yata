import { isAxiosError } from './typeGuards';

export function handleError(error: unknown) {
  if (isAxiosError(error)) {
    console.error('Axios error:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('An unknown error occurred.');
  }
}
