import { isAxiosError } from "./typeGuards";
import { logError } from "./logger";

export function handleError(error: unknown, context?: string) {
  const prefix = context ? `[${context}] ` : "";
  if (isAxiosError(error)) {
    logError(`${prefix}Axios error:`, error.response?.data || error.message);
  } else if (error instanceof Error) {
    logError(`${prefix}Error:`, error.message);
  } else {
    logError(`${prefix}An unknown error occurred.`);
  }
}
